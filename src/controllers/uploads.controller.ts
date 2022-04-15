import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import fs from 'fs';
import { actualizarImagen } from '../helpers/actualizar-imagen';
import Usuario from '../models/usuario.model';
const { v4: uuidv4 } = require('uuid');

class UploadsController {
  public async fileUpload(req: Request, res: Response) {
    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo
    const tiposValidos = ['usuarios', 'ministerios', 'carnets'];

    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({
        ok: false,
        msg: 'No es un usuario',
      });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        ok: false,
        msg: 'No hay ningún archivo',
      });
    }
    // Buscar Usuario

    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({
          msg: 'No existe un usuario con el id ' + id,
        });
      }

      const documento = await usuario.get().numero_documento;

      // Procesar la imagen
      const file = req.files.imagen as UploadedFile;

      const nombreCortado = file.name.split('.');
      const extensionArchivo = nombreCortado[nombreCortado.length - 1];

      // Validar extension
      const extensionesValidas = ['png', 'jpg', 'jpeg', 'pdf', 'PDF', 'PNG', 'JPEG', 'JPG'];
      if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
          ok: false,
          msg: 'No es una extensión permitida',
        });
      }

      // Generar el nombre del archivo
      const nombreArchivo = `${documento}.${extensionArchivo}`;

      // Path para guardar la imagen
      const path = `./uploads/${tipo}/${nombreArchivo}`;

      // Mover la imagen
      file.mv(path, (err) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            ok: false,
            msg: 'Error al mover la imagen',
          });
        }
        // Actualizar base de datos
        actualizarImagen.actualizarImagen(id, tipo, nombreArchivo);
        return res.json({ ok: true, msg: 'Archivo subido', nombreArchivo: nombreArchivo, path });
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
        error: error,
      });
    }
  }

  public mostrarFoto(req: Request, res: Response) {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../../../uploads/${tipo}/${foto}`);

    if (fs.existsSync(pathImg)) {
      res.sendFile(pathImg);
    } else {
      const pathImg = path.join(__dirname, `../../../uploads/no-image.jpg`);
      res.sendFile(pathImg);
    }
  }
}

export const uploadsController = new UploadsController();

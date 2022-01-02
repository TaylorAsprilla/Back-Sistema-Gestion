import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import fs from 'fs';
import { actualizarImagen } from '../helpers/actualizar-imagen';
const { v4: uuidv4 } = require('uuid');

class UploadsController {
  public async fileUpload(req: Request, res: Response) {
    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo
    const tiposValidos = ['usuarios'];

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

    // Procesar la imagen
    const file = req.files.imagen as UploadedFile;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
      return res.status(400).json({
        ok: false,
        msg: 'No es una extensión permitida',
      });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

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

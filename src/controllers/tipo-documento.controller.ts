import { Request, Response } from 'express';
import db from '../../database/connection';
import { CustomRequest } from '../middlewares/validar-jwt';

import TipoDocumento from '../models/tipo-documento.model';

class TipoDocumentoController {
  public async listarTipoDocumento(req: Request, res: Response) {
    const tipoDocumento = await TipoDocumento.findAll();

    res.json({ ok: true, tipoDocumento: tipoDocumento });
  }

  public async listarUnTipoDocumento(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const tipoDocumento = await TipoDocumento.findByPk(id);

    if (tipoDocumento) {
      res.json({ ok: true, tipoDocumento: tipoDocumento, id: req.id });
    } else {
      res.status(404).json({
        msg: `No existe el Tipo de Documento con el id ${id}`,
      });
    }
  }

  public async crearTipoDocumento(req: Request, res: Response) {
    const { nombre } = req.body;

    try {
      const existeTipoDocumento = await TipoDocumento.findOne({
        where: { nombre: nombre },
      });

      if (existeTipoDocumento) {
        return res.status(400).json({
          msg: 'Ya existe un Tipo de documento con el nombre: ' + nombre,
        });
      }

      const tipoDocumento = await TipoDocumento.build(req.body);

      // Guardar Tipo de documento
      const tipoDocumentoCreado = await tipoDocumento.save();

      res.json({
        o: true,
        msg: 'Tipo de Documento creado ',
        tipoDocumento: tipoDocumentoCreado,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Hable con el administrador',
      });
    }
  }

  public async actualizarTipoDocumento(req: Request, res: Response) {
    const { id } = req.params;

    const { body } = req;
    const { nombre, ...campos } = body;

    try {
      const tipoDocumento = await TipoDocumento.findByPk(id);
      if (!tipoDocumento) {
        return res.status(404).json({
          msg: 'No existe un tipo de Documento con el id ' + id,
        });
      }

      const getNombre = await tipoDocumento.get().nombre;

      // Actualizaciones
      if (getNombre !== body.nombre) {
        const existeNombre = await TipoDocumento.findOne({
          where: {
            nombre: body.nombre,
          },
        });
        if (existeNombre) {
          return res.status(400).json({
            ok: false,
            msg: 'Ya existe un Tipo de documento con el nombre ' + nombre,
          });
        }
      }

      campos.nombre = nombre;

      // Se actualiza el campo
      const tipoDocumentoActualizado = await tipoDocumento.update(campos, { new: true });

      res.json({ msg: 'Tipo de documento Actualizado ', tipoDocumentoActualizado: tipoDocumentoActualizado });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
      });
    }
  }

  public async eliminarTipoDocumento(req: CustomRequest, res: Response) {
    const { id } = req.params;

    try {
      const tipoDocumento = await TipoDocumento.findByPk(id);
      if (tipoDocumento) {
        const nombre = await tipoDocumento.get().nombre;

        await tipoDocumento.update({ estado: false });

        res.json({
          ok: true,
          msg: 'El tipo de documento ' + nombre + ' se eliminó ',
          id: req.id,
        });
      }

      if (!tipoDocumento) {
        return res.status(404).json({
          msg: 'No existe un tipo de documento con el id ' + id,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Hable con el administrador',
      });
    }
  }
}

export const tipoDocumentoController = new TipoDocumentoController();

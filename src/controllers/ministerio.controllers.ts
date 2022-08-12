import { Request, Response } from 'express';
import db from '../../database/connection';

import { CustomRequest } from '../middlewares/validar-jwt';

import Ministerio from '../models/ministerio.model';

class MinisterioController {
  public async listarMinisterios(req: CustomRequest, res: Response) {
    const ministerio = await Ministerio.findAll({
      order: db.col('nombre'),
    });

    res.json({ ok: true, ministerio, id: req.id });
  }

  public async listarUnMinisterio(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const ministerio = await Ministerio.findByPk(id);

    if (ministerio) {
      res.json({ ok: true, ministerio: ministerio, id: req.id });
    } else {
      res.status(404).json({
        msg: `No existe el ministerio con el id ${id}`,
      });
    }
  }

  public async crearMinisterio(req: Request, res: Response) {
    const { body } = req;
    const { nombre } = req.body;

    try {
      const existeMinisterio = await Ministerio.findOne({
        where: { nombre: nombre },
      });

      if (existeMinisterio) {
        return res.status(400).json({
          msg: 'Ya existe un Ministerio con el nombre: ' + nombre,
        });
      }

      const ministerio = await Ministerio.build(body);

      // Guardar Ministerio
      await ministerio.save();

      res.json({ o: true, msg: 'Ministerio creado ', ministerio });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
        error,
      });
    }
  }

  public async actualizarUsuario(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const { nombre, ...campos } = body;

    try {
      const ministerio = await Ministerio.findByPk(id);
      if (!ministerio) {
        return res.status(404).json({
          msg: 'No existe un ministerio con el id ' + id,
        });
      }

      const getNombre = await ministerio.get().nombre;

      // Actualizaciones
      if (getNombre !== body.nombre) {
        const existeNombre = await Ministerio.findOne({
          where: {
            nombre: body.nombre,
          },
        });
        if (existeNombre) {
          return res.status(400).json({
            ok: false,
            msg: 'Ya existe un Ministerio con ese nombre',
          });
        }
      }

      campos.nombre = nombre;

      const ministerioActualizado = await ministerio.update(campos, { new: true });

      res.json({ msg: 'Ministerio Actualizado ', ministerioActualizado: ministerioActualizado });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
        error,
      });
    }
  }

  public async eliminarMinisterio(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const { body } = req;

    try {
      const ministerio = await Ministerio.findByPk(id);
      if (ministerio) {
        const nombre = await ministerio.get().nombre;

        await ministerio.update({ estado: false });

        res.json({
          ok: true,
          msg: 'El ministerio ' + nombre + 'Se eliminó ',
          id: req.id,
        });
      }

      if (!ministerio) {
        return res.status(404).json({
          msg: 'No existe un ministerio con el id ' + id,
        });
      }
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
        error,
      });
    }
  }
}

export const ministerioController = new MinisterioController();

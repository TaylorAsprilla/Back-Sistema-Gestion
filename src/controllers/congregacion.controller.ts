import { Request, Response } from 'express';
import db from '../../database/connection';

import { CustomRequest } from '../middlewares/validar-jwt';
import Congregacion from '../models/congregacion.model';

class CongregacionController {
  public async listarCongregaciones(req: CustomRequest, res: Response) {
    const congregacion = await Congregacion.findAll({
      order: db.col('nombre'),
    });

    res.json({ ok: true, congregacion: congregacion, id: req.id });
  }

  public async listarUnaCongregacion(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const congregacion = await Congregacion.findByPk(id);

    if (congregacion) {
      res.json({ ok: true, congregacion: congregacion, id: req.id });
    } else {
      res.status(404).json({
        msg: `No existe la Congregacion con el id ${id}`,
      });
    }
  }

  public async crearCongregacion(req: Request, res: Response) {
    const { body } = req;
    const { nombre } = req.body;

    try {
      const existeCongregacion = await Congregacion.findOne({
        where: { nombre: nombre },
      });

      if (existeCongregacion) {
        return res.status(400).json({
          msg: 'Ya existe una Congregacion con el nombre: ' + nombre,
        });
      }

      const congregacion = await Congregacion.build(body);

      // Guardar Congregación
      await congregacion.save();

      res.json({ ok: true, msg: 'Congregación creada ', congregacion: congregacion });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
        error,
      });
    }
  }

  public async actualizarCongregacion(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const { nombre, ...campos } = body;

    try {
      const congregacion = await Congregacion.findByPk(id);
      if (!congregacion) {
        return res.status(404).json({
          msg: 'No existe una Congregación con el id ' + id,
        });
      }

      const getNombre = await congregacion.get().nombre;

      // Actualizaciones
      if (getNombre !== body.nombre) {
        const existeNombre = await Congregacion.findOne({
          where: {
            nombre: body.nombre,
          },
        });
        if (existeNombre) {
          return res.status(400).json({
            ok: false,
            msg: 'Ya existe una Congregación con ese nombre',
          });
        }
      }

      campos.nombre = nombre;

      const congregacionActualizada = await congregacion.update(campos, { new: true });

      res.json({ msg: 'Congregación Actualizada ', congregacionActualizada: congregacionActualizada });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
        error,
      });
    }
  }

  public async eliminarCongregacion(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const { body } = req;

    try {
      const congregacion = await Congregacion.findByPk(id);
      if (congregacion) {
        const nombre = await congregacion.get().nombre;

        await congregacion.update({ estado: false });

        res.json({
          ok: true,
          msg: 'La Congregación ' + nombre + 'Se eliminó ',
          id: req.id,
        });
      }

      if (!congregacion) {
        return res.status(404).json({
          msg: 'No existe una congregacgión con el id ' + id,
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

export const congregacionController = new CongregacionController();

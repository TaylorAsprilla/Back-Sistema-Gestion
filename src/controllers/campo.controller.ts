import { Request, Response } from 'express';
import { Sequelize } from 'sequelize/dist';
import db from '../../database/connection';

import { CustomRequest } from '../middlewares/validar-jwt';
import Campo from '../models/campo.model';

class CampoController {
  public async listarCampos(req: CustomRequest, res: Response) {
    const campo = await Campo.findAll({
      order: db.col('nombre'),
    });

    res.json({ ok: true, campo: campo, id: req.id });
  }

  public async listarUnCampo(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const campo = await Campo.findByPk(id);

    if (campo) {
      res.json({ ok: true, campo: campo, id: req.id });
    } else {
      res.status(404).json({
        msg: `No existe el Campo con el id ${id}`,
      });
    }
  }

  public async crearCampo(req: Request, res: Response) {
    const { nombre, idCongregacion } = req.body;

    try {
      const existeCampo = await Campo.findOne({
        where: { nombre: nombre },
      });

      if (existeCampo) {
        return res.status(400).json({
          msg: 'Ya existe un Campo con el nombre: ' + nombre,
        });
      }

      const campo = await Campo.build(req.body);

      // Guardar Campo
      const campoCreado = await campo.save();

      res.json({ ok: true, msg: 'Campo creado ', campo: campoCreado });
    } catch (error) {
      res.status(500).json({
        msg: 'Hable con el administrador',
        error,
      });
    }
  }

  public async actualizarCampo(req: Request, res: Response) {
    const { id } = req.params;

    const { body } = req;
    const { nombre, idCongregacion, ...campos } = body;

    try {
      const campo = await Campo.findByPk(id);
      if (!campo) {
        return res.status(404).json({
          msg: 'No existe una Congregación con el id ' + id,
        });
      }

      const getNombre = await campo.get().nombre;

      // Actualizaciones
      if (getNombre !== body.nombre) {
        const existeNombre = await Campo.findOne({
          where: {
            nombre: body.nombre,
          },
        });
        if (existeNombre) {
          return res.status(400).json({
            ok: false,
            msg: 'Ya existe un Campo con ese nombre',
          });
        }
      }

      campos.nombre = nombre;
      campos.id_congregacion = idCongregacion;

      // Se actualiza el campo
      const campoActualizado = await campo.update(campos, { new: true });

      res.json({ msg: 'Campo Actualizado ', campoActualizado: campoActualizado });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
        error,
      });
    }
  }

  public async eliminarCampo(req: CustomRequest, res: Response) {
    const { id } = req.params;

    try {
      const campo = await Campo.findByPk(id);
      if (campo) {
        const nombre = await campo.get().nombre;

        await campo.update({ estado: false });

        res.json({
          ok: true,
          msg: 'El campo ' + nombre + ' se eliminó ',
          id: req.id,
        });
      }

      if (!campo) {
        return res.status(404).json({
          msg: 'No existe un campo con el id ' + id,
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

export const campoController = new CampoController();

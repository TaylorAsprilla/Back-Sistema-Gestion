import { Request, Response } from 'express';
import db from '../../database/connection';

import { CustomRequest } from '../middlewares/validar-jwt';
import Permiso from '../models/permiso.model';
import UsuarioPermiso from '../models/usuario-permiso.model';

class PermisoController {
  public async listarPermisos(req: CustomRequest, res: Response) {
    const permiso = await Permiso.findAll({
      order: db.col('nombre'),
    });

    res.json({ ok: true, permiso: permiso, id: req.id });
  }

  public async listarUnPermiso(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const permiso = await Permiso.findByPk(id);

    if (permiso) {
      res.json({ ok: true, permiso: permiso, id: req.id });
    } else {
      res.status(404).json({
        msg: `No existe el permiso con el id ${id}`,
      });
    }
  }

  public async crearPermiso(req: Request, res: Response) {
    const { body } = req;
    const { nombre } = req.body;

    try {
      const existePermiso = await Permiso.findOne({
        where: { nombre: nombre },
      });

      if (existePermiso) {
        return res.status(400).json({
          msg: 'Ya existe el Permiso con el nombre: ' + nombre,
        });
      }

      const permiso = await Permiso.build(body);

      // Guardar Permiso
      await permiso.save();

      res.json({ o: true, msg: 'Permiso creado ', permiso: permiso });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
        error,
      });
    }
  }

  public async actualizarPermiso(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const { nombre, ...campos } = body;

    try {
      const permiso = await Permiso.findByPk(id);
      if (!permiso) {
        return res.status(404).json({
          msg: 'No existe el permiso con el id ' + id,
        });
      }

      const getNombre = await permiso.get().nombre;

      // Actualizaciones
      if (getNombre !== body.nombre) {
        const existeNombre = await Permiso.findOne({
          where: {
            nombre: body.nombre,
          },
        });
        if (existeNombre) {
          return res.status(400).json({
            ok: false,
            msg: 'Ya existe el Permiso con ese nombre',
          });
        }
      }

      campos.nombre = nombre;

      const permisoActualizado = await permiso.update(campos, { new: true });

      res.json({ msg: 'Permiso Actualizado ', permisoActualizado: permisoActualizado });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
        error,
      });
    }
  }

  public async eliminarPermiso(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const { body } = req;

    try {
      const permiso = await Permiso.findByPk(id);
      if (permiso) {
        const nombre = await permiso.get().nombre;

        await permiso.update({ estado: false });

        res.json({
          ok: true,
          msg: 'El permiso ' + nombre + 'Se eliminó ',
          id: req.id,
        });
      }

      if (!permiso) {
        return res.status(404).json({
          msg: 'No existe el permiso con el id ' + id,
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

  public async getPermisoUsuario(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const [permisos, metadata] = await db.query(
        `SELECT up.id_usuario, up.id_permiso, p.nombre, p.estado 
         FROM usuario_permiso up 
         INNER JOIN permiso p ON up.id_permiso = p.id 
         WHERE up.id_usuario = ${id}`
      );

      res.json({
        ok: true,
        permisos,
        id: id,
      });
    } catch (error) {
      res.status(500).json({
        error,
        msg: 'Hable con el administrador',
      });
    }
  }
}

export const permisoController = new PermisoController();

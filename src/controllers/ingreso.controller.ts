import { Request, Response } from 'express';

import { CustomRequest } from '../middlewares/validar-jwt';
import Ingreso from '../models/ingreso.model';
import Usuario from '../models/usuario.model';

class IngresoController {
  public async crearIngreso(req: Request, res: Response) {
    const { body } = req;
    const { id_daIngreso, id_usuario } = req.body;

    try {
      const existeVoluntario = await Usuario.findOne({
        where: { id: id_daIngreso },
      });

      if (!existeVoluntario) {
        return res.status(400).json({
          msg: 'El voluntario no se encuentra registrado: ' + id_daIngreso,
        });
      }

      const existeUsuario = await Usuario.findOne({
        where: { id: id_usuario },
      });

      if (!existeUsuario) {
        return res.status(400).json({
          msg: 'El usuario no se encuentra registrado: ' + id_usuario,
        });
      }

      const nuevoIngreso = await Ingreso.build(body);

      // Guardar Ingreso
      await nuevoIngreso.save();

      res.json({ ok: true, msg: 'Ingreso Existoso ', nuevoIngreso });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Hable con el administrador',
      });
    }
  }

  public async getIngresos(req: CustomRequest, res: Response) {
    const ingresos = await Ingreso.findAll();

    res.json({ ok: true, ingresos, id: req.id });
  }
}

export const ingresoController = new IngresoController();

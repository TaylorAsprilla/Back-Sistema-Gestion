import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { CustomRequest } from '../middlewares/validar-jwt';
import Congregacion from '../models/congregacion.model';
import Ingreso from '../models/ingreso.model';
import Usuario from '../models/usuario.model';

class IngresoController {
  public async crearIngreso(req: Request, res: Response) {
    const { body } = req;
    const { id_daIngreso, id_usuario, fecha_ingreso, id_congregacion } = req.body;

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

      const existeIngreso = await Ingreso.findOne({
        attributes: ['id_usuario', 'fecha_ingreso', 'id_congregacion'],
        where: { [Op.and]: [{ id_usuario }, { id_congregacion }, { fecha_ingreso: fecha_ingreso }] },
      });

      if (existeIngreso) {
        const primerNombreUsuario = (await existeUsuario?.getDataValue('primer_nombre'))
          ? existeUsuario?.getDataValue('primer_nombre')
          : '';
        const segundoNombreUsuario = (await existeUsuario?.getDataValue('segundo_nombre'))
          ? existeUsuario?.getDataValue('segundo_nombre')
          : '';
        const primerApellidoUsuario = (await existeUsuario?.getDataValue('primer_apellido'))
          ? existeUsuario?.getDataValue('primer_apellido')
          : '';
        const segundoApellidoUsuario = (await existeUsuario?.getDataValue('segundo_apellido'))
          ? existeUsuario?.getDataValue('segundo_apellido')
          : '';

        const congregacion = await Congregacion.findOne({
          where: {
            id: id_congregacion,
          },
        });

        const nombrecongregacion = await congregacion?.getDataValue('nombre');

        return res.status(400).json({
          msg: `El usuario <b> ${primerNombreUsuario} ${segundoNombreUsuario} ${primerApellidoUsuario} ${segundoApellidoUsuario} </b>
          ya realizó el ingreso en la congregación de <b>${nombrecongregacion}</b>`,
          id_usuario,
          id_congregacion,
          fecha_ingreso,
        });
      } else {
        const nuevoIngreso = Ingreso.build(body);

        // Guardar Ingreso
        await nuevoIngreso.save();

        res.json({ ok: true, msg: 'Ingreso Existoso ', nuevoIngreso });
      }
    } catch (error) {
      res.status(500).json({
        ok: false,
        noToken: true,
        msg: 'Hable con el administrador',
        error,
      });
    }
  }

  public async getIngresos(req: CustomRequest, res: Response) {
    const ingresos = await Ingreso.findAll();

    res.json({ ok: true, ingresos, id: req.id });
  }
}

export const ingresoController = new IngresoController();

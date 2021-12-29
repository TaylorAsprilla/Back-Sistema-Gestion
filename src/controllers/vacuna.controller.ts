import { Request, Response } from 'express';

import { CustomRequest } from '../middlewares/validar-jwt';
import Vacuna from '../models/vacuna.model';

class VacunaController {
  public async listarVacunas(req: CustomRequest, res: Response) {
    const vacuna = await Vacuna.findAll();

    res.json({ ok: true, vacuna: vacuna, id: req.id });
  }

  public async listarUnVacuna(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const vacuna = await Vacuna.findByPk(id);

    if (vacuna) {
      res.json({ ok: true, vacuna: vacuna, id: req.id });
    } else {
      res.status(404).json({
        msg: `No existe la vacuna con el id ${id}`,
      });
    }
  }

  public async crearVacuna(req: Request, res: Response) {
    const { body } = req;
    const { nombre } = req.body;

    try {
      const existeVacuna = await Vacuna.findOne({
        where: { nombre: nombre },
      });

      if (existeVacuna) {
        return res.status(400).json({
          msg: 'Ya existe una Vacuna con el nombre: ' + nombre,
        });
      }

      const vacuna = await Vacuna.build(body);

      // Guardar Vacuna
      await vacuna.save();

      res.json({ o: true, msg: 'Vacuna creada ', vacuna: vacuna });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Hable con el administrador',
      });
    }
  }

  public async actualizarVacuna(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const { nombre, ...campos } = body;

    try {
      const vacuna = await Vacuna.findByPk(id);
      if (!vacuna) {
        return res.status(404).json({
          msg: 'No existe una vacuna con el id ' + id,
        });
      }

      const getNombre = await vacuna.get().nombre;

      // Actualizaciones
      if (getNombre !== body.nombre) {
        const existeNombre = await Vacuna.findOne({
          where: {
            nombre: body.nombre,
          },
        });
        if (existeNombre) {
          return res.status(400).json({
            ok: false,
            msg: 'Ya existe una Vacuna con ese nombre',
          });
        }
      }

      campos.nombre = nombre;

      const vacunaActualizada = await vacuna.update(campos, { new: true });

      res.json({ msg: 'Vacuna Actualizado ', vacunaActualizada: vacunaActualizada });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
      });
    }
  }

  public async eliminarVacuna(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const { body } = req;

    try {
      const vacuna = await Vacuna.findByPk(id);
      if (vacuna) {
        const nombre = await vacuna.get().nombre;

        await vacuna.update({ estado: false });

        res.json({
          ok: true,
          msg: 'La Vacuna ' + nombre + 'Se eliminó ',
          id: req.id,
        });
      }

      if (!vacuna) {
        return res.status(404).json({
          msg: 'No existe una vacuna con el id ' + id,
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

export const vacunaController = new VacunaController();

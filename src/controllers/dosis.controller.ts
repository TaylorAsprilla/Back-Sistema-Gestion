import { Request, Response } from 'express';

import { CustomRequest } from '../middlewares/validar-jwt';
import Dosis from '../models/dosis.model';

class DosisController {
  public async listarDosis(req: CustomRequest, res: Response) {
    const dosis = await Dosis.findAll();

    res.json({ ok: true, dosis, id: req.id });
  }

  public async crearDosis(req: Request, res: Response) {
    const { body } = req;
    const { dosis } = req.body;

    try {
      const existeDosis = await Dosis.findOne({
        where: { dosis: dosis },
      });

      if (existeDosis) {
        return res.status(400).json({
          msg: 'Ya existe una Dosis con el nombre: ' + dosis,
        });
      }

      const nuevaDosis = await Dosis.build(body);

      // Guardar Dosis
      await nuevaDosis.save();

      res.json({ o: true, msg: 'Dosis creada ', nuevaDosis });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
        error,
      });
    }
  }

  public async eliminarDosis(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const { body } = req;

    try {
      const dosis = await Dosis.findByPk(id);
      if (dosis) {
        const nombre = await dosis.get().dosis;

        await dosis.update({ estado: false });

        res.json({
          ok: true,
          msg: 'La dosis ' + nombre + ' se eliminó ',
          id: req.id,
        });
      }

      if (!dosis) {
        return res.status(404).json({
          msg: 'No existe una dosis con el id ' + id,
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

export const dosisController = new DosisController();

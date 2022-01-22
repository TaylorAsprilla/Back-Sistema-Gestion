import { Request, Response } from 'express';
import db from '../../database/connection';
import Genero from '../models/genero.model';

class GeneroController {
  public async listarGenero(req: Request, res: Response) {
    const genero = await Genero.findAll({
      order: db.col('nombre'),
    });

    res.json({ ok: true, genero: genero });
  }
}

export const generoController = new GeneroController();

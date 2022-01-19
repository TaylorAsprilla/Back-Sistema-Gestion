import { Request, Response } from 'express';
import Genero from '../models/genero.model';

class GeneroController {
  public async listarGenero(req: Request, res: Response) {
    const genero = await Genero.findAll();

    res.json({ ok: true, genero: genero });
  }
}

export const generoController = new GeneroController();

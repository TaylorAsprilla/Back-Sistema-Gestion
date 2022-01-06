import { Request, Response } from 'express';
import db from '../../database/connection';
import Usuario from '../models/usuario.model';

class BusquedasController {
  public async busquedaUsuarios(req: Request, res: Response) {
    const busqueda = req.params.busqueda;

    const [results, metadata] = await db.query(
      `SELECT * FROM usuario WHERE primer_nombre LIKE '%${busqueda}%'
                             or  primer_nombre LIKE '%${busqueda}%' 
                             or segundo_nombre LIKE '%${busqueda}%' 
                             or primer_apellido LIKE '%${busqueda}%' 
                             or segundo_apellido LIKE '%${busqueda}%'
                             or numero_documento LIKE '%${busqueda}%' 
                             or email LIKE '%${busqueda}%'
                             or celular LIKE '%${busqueda}%'
                             or fecha_nacimiento LIKE '%${busqueda}%' 
                             or estado LIKE '%${busqueda}%' 
                             or login LIKE '%${busqueda}%';`
    );

    res.json({ ok: true, busqueda: results });
  }

  public async busquedaMinisterios(req: Request, res: Response) {
    const busqueda = req.params.busqueda;

    const [results, metadata] = await db.query(
      `SELECT * FROM ministerio WHERE nombre LIKE '%${busqueda}%'
                             or  descripcion LIKE '%${busqueda}%';`
    );

    res.json({ ok: true, busqueda: results });
  }
}

export const busquedaController = new BusquedasController();

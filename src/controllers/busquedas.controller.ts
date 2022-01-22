import { Request, Response } from 'express';
import { Op } from 'sequelize';
import db from '../../database/connection';
import Campo from '../models/campo.model';
import Congregacion from '../models/congregacion.model';
import Ministerio from '../models/ministerio.model';
import Usuario from '../models/usuario.model';

class BusquedasController {
  public async busquedaUsuarios(req: Request, res: Response) {
    const busqueda = req.params.busqueda;

    const resultadoUsuario = await Usuario.findAll({
      where: {
        [Op.or]: [
          { primer_nombre: { [Op.substring]: busqueda } },
          { segundo_nombre: { [Op.substring]: busqueda } },
          { primer_apellido: { [Op.substring]: busqueda } },
          { segundo_apellido: { [Op.substring]: busqueda } },
          { numero_documento: { [Op.substring]: busqueda } },
          { email: { [Op.substring]: busqueda } },
          { celular: { [Op.substring]: busqueda } },
          { fecha_nacimiento: { [Op.substring]: busqueda } },
          { estado: { [Op.substring]: busqueda } },
          { login: { [Op.substring]: busqueda } },
        ],
      },
      order: db.col('primer_nombre'),
    });
    res.json({ ok: true, busqueda: resultadoUsuario });
  }

  public async busquedaMinisterios(req: Request, res: Response) {
    const busqueda = req.params.busqueda;

    const resultadoMinisterio = await Ministerio.findAll({
      where: {
        [Op.or]: [{ nombre: { [Op.substring]: busqueda } }],
      },
      order: db.col('nombre'),
    });

    res.json({ ok: true, busqueda: resultadoMinisterio });
  }

  public async getTodo(req: Request, res: Response) {
    const busqueda = req.params.busqueda;

    const [usuarios, congregaciones, campos, ministerios] = await Promise.all([
      Usuario.findAll({
        where: {
          [Op.or]: [
            { primer_nombre: { [Op.substring]: busqueda } },
            { segundo_nombre: { [Op.substring]: busqueda } },
            { primer_apellido: { [Op.substring]: busqueda } },
            { segundo_apellido: { [Op.substring]: busqueda } },
            { numero_documento: { [Op.substring]: busqueda } },
            { email: { [Op.substring]: busqueda } },
            { celular: { [Op.substring]: busqueda } },
            { fecha_nacimiento: { [Op.substring]: busqueda } },
          ],
        },
        order: db.col('primer_nombre'),
      }),

      Congregacion.findAll({
        where: {
          [Op.or]: [
            { nombre: { [Op.substring]: busqueda } },
            { direccion: { [Op.substring]: busqueda } },
            { telefono: { [Op.substring]: busqueda } },
          ],
        },
        order: db.col('nombre'),
      }),
      Campo.findAll({
        where: {
          [Op.or]: [
            { nombre: { [Op.substring]: busqueda } },
            { direccion: { [Op.substring]: busqueda } },
            { telefono: { [Op.substring]: busqueda } },
          ],
        },
        order: db.col('nombre'),
      }),
      Ministerio.findAll({
        where: { [Op.or]: [{ nombre: { [Op.substring]: busqueda } }, { descripcion: { [Op.substring]: busqueda } }] },
        order: db.col('nombre'),
      }),
    ]);
    res.json({
      ok: true,
      usuarios,
      congregaciones,
      campos,
      ministerios,
    });
  }
}

export const busquedaController = new BusquedasController();

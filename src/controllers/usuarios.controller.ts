import { Request, Response } from 'express';
import { Op } from 'sequelize';
import * as bcrypt from 'bcryptjs';

import { CustomRequest } from '../middlewares/validar-jwt';

import Usuario from '../models/usuario.model';
import { tokenJwt } from '../helpers/tokenJwt';

class UsuarioController {
  public async listarUsuarios(req: CustomRequest, res: Response) {
    const desde = Number(req.query.desde) || 0;

    const [usuarios, totalUsuarios] = await Promise.all([
      Usuario.findAll({ offset: desde, limit: 5 }),

      Usuario.count(),
    ]);

    res.json({ ok: true, usuarios: usuarios, totalUsuarios: totalUsuarios, id: req.id });
  }

  public async listarUnUsuario(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (usuario) {
      res.json({ ok: true, usuario, id: req.id });
    } else {
      res.status(404).json({
        msg: `No existe el usuario con el id ${id}`,
      });
    }
  }

  public async crearUsuario(req: Request, res: Response) {
    const { body } = req;
    const { email, password, numero_documento, celular } = req.body;

    try {
      const existeUsuario = await Usuario.findOne({
        where: {
          [Op.or]: [{ email: email }, { numero_documento: numero_documento }, { celular: celular }],
        },
      });

      if (existeUsuario) {
        return res.status(400).json({
          msg:
            'Ya existe un usuario con esos valores email: ' +
            email +
            ' Número de documento: ' +
            numero_documento +
            ' o celular: ' +
            celular,
        });
      }
      // Encriptar contraseña
      if (password) {
        const salt = bcrypt.genSaltSync();
        body.password = bcrypt.hashSync(password, salt);
      }

      const usuario = await Usuario.build(body);

      // Guardar Usuario
      await usuario.save();

      // Generar Token - JWT
      const token = await tokenJwt.generarJWT(usuario.getDataValue('id'), usuario.getDataValue('login'));

      res.json({ ok: true, msg: 'Usuario creado ', usuario, token });
    } catch (error) {
      console.log('Error', error);
      res.status(500).json({
        msg: 'Hable con el administrador',
        error,
      });
    }
  }

  public async actualizarUsuario(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const { password, email, numero_documento, imagen, ...campos } = body;

    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({
          msg: 'No existe un usuario con el id ' + id,
        });
      }

      const getEmail = await usuario.get().email;
      const getNumeroDocumento = await usuario.get().numero_documento;

      // Actualizaciones

      if (getEmail !== email) {
        const existeEmail = await Usuario.findOne({
          where: {
            email: email,
          },
        });
        if (existeEmail) {
          return res.status(400).json({
            ok: false,
            msg: 'Ya existe un usuario con este email',
          });
        }
      } else if (getNumeroDocumento !== numero_documento) {
        const existeNumeroDocumento = await Usuario.findOne({
          where: {
            numero_documento: numero_documento,
          },
        });
        if (existeNumeroDocumento) {
          return res.status(400).json({
            ok: false,
            msg: 'Ya existe un usuario con este Número de Documento',
          });
        }
      }

      campos.email = await email;
      campos.numero_documento = await numero_documento;

      const usuarioActualizado = await usuario.update(campos, { new: true });

      res.json({ msg: 'Usuario Actualizado ', usuarioActualizado });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
        error: error,
      });
    }
  }

  public async eliminarUsuario(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const { body } = req;

    try {
      const usuario = await Usuario.findByPk(id);
      if (usuario) {
        const nombre = await usuario.get().primer_nombre;
        const apellido = await usuario.get().primer_apellido;
        const numeroDocumento = await usuario.get().numero_documento;

        await usuario.update({ estado: false });

        res.json({
          ok: true,
          msg: 'El usuario ' + nombre + ' ' + apellido + ' con número de documento ' + numeroDocumento + 'Se eliminó ',
          id: req.id,
        });
      }

      if (!usuario) {
        return res.status(404).json({
          msg: 'No existe un usuario con el id ' + id,
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

export const usuarioController = new UsuarioController();

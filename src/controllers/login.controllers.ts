import { Request, Response } from 'express';

import * as bcrypt from 'bcryptjs';
import Usuario from '../models/usuario.model';
import { tokenJwt } from '../helpers/tokenJwt';
import { CustomRequest } from '../middlewares/validar-jwt';

const login = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  try {
    // Verificar Usuario
    const loginUsuario = await Usuario.findOne({
      where: {
        login: login,
      },
    });

    if (!loginUsuario) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no válido',
      });
    }

    // Verificar contraseña

    const validarPassword = bcrypt.compareSync(password, loginUsuario.getDataValue('password'));

    if (!validarPassword) {
      return res.status(404).json({
        ok: false,
        msg: 'Contraseña no válida',
      });
    }

    // Generar Token - JWT
    const token = await tokenJwt.generarJWT(loginUsuario.getDataValue('id'), loginUsuario.getDataValue('login'));

    res.json({
      ok: true,
      token: token,
      usuario: loginUsuario,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
      error: error,
    });
  }
};

const renewToken = async (req: CustomRequest, res: Response) => {
  const idUsaurio = req.id;
  const { body } = req;

  const usuario = await Usuario.build(body);

  // Generar el TOKEN - JWT
  const token = await tokenJwt.generarJWT(idUsaurio, usuario.getDataValue('login'));

  // Obtener el usuario por UID
  const usuarioID = await Usuario.findByPk(idUsaurio);

  res.json({
    ok: true,
    token,
    usuario: usuarioID,
  });
};

module.exports = {
  login,
  renewToken,
};

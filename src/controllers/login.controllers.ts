import { Request, Response } from 'express';

import * as bcrypt from 'bcryptjs';
import Usuario from '../models/usuario.model';
import { tokenJwt } from '../helpers/tokenJwt';

class LoginController {
  public async login(req: Request, res: Response) {
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
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
      });
    }
  }
}

export const loginController = new LoginController();

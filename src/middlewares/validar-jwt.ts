import { NextFunction, Request, Response } from 'express';

const jwt = require('jsonwebtoken');

export interface CustomRequest extends Request {
  id?: number;
}

class ValidarJWT {
  public validarJWT(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.header('x-token');

    if (!token) {
      return res.status(401).json({
        ok: false,
        noToken: true,
        msg: ' No hay token en la petición',
      });
    }

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      req.id = id;

      next();
    } catch (error) {
      return res.status(401).json({
        ok: false,
        msg: 'Token no válido',
      });
    }
  }
}
export const validarJWT = new ValidarJWT();

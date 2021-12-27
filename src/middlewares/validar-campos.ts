import { Request, Response } from 'express';

const { validationResult } = require('express-validator');

class ValidarCampos {
  public validarCampos(req: Request, res: Response, next: any) {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        ok: false,
        errors: errores.mapped(),
      });
    }

    next();
  }
}
export const validarCampos = new ValidarCampos();

import { Router } from 'express';
import { check } from 'express-validator';
import { campoController } from '../controllers/campo.controller';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

class CampoRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    /*
     Rutas: /api/congregacion
    */

    this.router.get('/', validarJWT.validarJWT, campoController.listarCampos);
    this.router.get('/:id', validarJWT.validarJWT, campoController.listarUnCampo);
    this.router.post(
      '/',
      [check('nombre', 'El nombre es obligatorio').not().isEmpty(), validarCampos.validarCampos],
      campoController.crearCampo
    );
    this.router.put(
      '/:id/',
      [check('nombre', 'El nombre es obligatorio ').not().isEmpty(), validarCampos.validarCampos],
      campoController.actualizarCampo
    );
    this.router.delete('/:id', validarJWT.validarJWT, campoController.eliminarCampo);
  }
}

const campoRoutes = new CampoRoutes();
export default campoRoutes.router;

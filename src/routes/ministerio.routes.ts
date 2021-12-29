import { Router } from 'express';
import { check } from 'express-validator';
import { ministerioController } from '../controllers/ministerio.controllers';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

class MinisteriosRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    /*
     Rutas: /api/ministerios
    */

    this.router.get('/', validarJWT.validarJWT, ministerioController.listarMinisterios);
    this.router.get('/:id', validarJWT.validarJWT, ministerioController.listarUnMinisterio);
    this.router.post(
      '/',
      [check('nombre', 'El nombre es obligatorio ').not().isEmpty(), validarCampos.validarCampos],
      ministerioController.crearMinisterio
    );
    this.router.put(
      '/:id',
      [check('nombre', 'El nombre es obligatorio ').not().isEmpty(), validarCampos.validarCampos],
      ministerioController.actualizarUsuario
    );
    this.router.delete('/:id', validarJWT.validarJWT, ministerioController.eliminarMinisterio);
  }
}

const ministeriosRoutes = new MinisteriosRoutes();
export default ministeriosRoutes.router;

import { Router } from 'express';
import { check } from 'express-validator';
import { congregacionController } from '../controllers/congregacion.controller';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

class CongregacionRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    /*
     Rutas: /api/congregacion
    */

    this.router.get('/', congregacionController.listarCongregaciones);
    this.router.get('/:id', validarJWT.validarJWT, congregacionController.listarUnaCongregacion);
    this.router.post(
      '/',
      [check('nombre', 'El nombre es obligatorio ').not().isEmpty(), validarCampos.validarCampos],
      congregacionController.crearCongregacion
    );
    this.router.put(
      '/:id',
      [check('nombre', 'El nombre es obligatorio ').not().isEmpty(), validarCampos.validarCampos],
      congregacionController.actualizarCongregacion
    );
    this.router.delete('/:id', validarJWT.validarJWT, congregacionController.eliminarCongregacion);
  }
}

const congregacionRoutes = new CongregacionRoutes();
export default congregacionRoutes.router;

import { Router } from 'express';
import { check } from 'express-validator';
import { ingresoController } from '../controllers/ingreso.controller';
import { validarCampos } from '../middlewares/validar-campos';

class IngresoRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    /*
     Rutas: /api/ingreso
    */

    check('login', 'El nombre de usuario es obligatorio').not().isEmpty(),
      check('password', 'El password es obligatorio').not().isEmpty(),
      this.router.post(
        '/',
        [
          check('id_daIngreso', 'El Id del voluntario es obligatorio ').not().isEmpty(),
          check('id_usuario', 'El Id del usuario es obligatorio ').not().isEmpty(),
          validarCampos.validarCampos,
        ],
        ingresoController.crearIngreso
      );
  }
}

const ingresoRoutes = new IngresoRoutes();
export default ingresoRoutes.router;

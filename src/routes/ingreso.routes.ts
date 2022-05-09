import { Router } from 'express';
import { check } from 'express-validator';
import { ingresoController } from '../controllers/ingreso.controller';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

class IngresoRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    /*
     Rutas: /api/ingreso
    */

    this.router.post(
      '/',
      validarJWT.validarJWT,
      [
        check('id_daIngreso', 'El Id del voluntario es obligatorio ').not().isEmpty(),
        check('id_usuario', 'El Id del usuario es obligatorio ').not().isEmpty(),
        check('id_congregacion', 'El Id de la congregación es obligatorio ').not().isEmpty(),
        check('fecha_ingreso', 'La fecha del ingreso es obligatorio ').not().isEmpty(),
        validarCampos.validarCampos,
      ],
      ingresoController.crearIngreso
    );
    this.router.get('/', validarJWT.validarJWT, ingresoController.getIngresos);
  }
}

const ingresoRoutes = new IngresoRoutes();
export default ingresoRoutes.router;

import { Router } from 'express';
import { check } from 'express-validator';
import { dosisController } from '../controllers/dosis.controller';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

class DosisRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    /*
     Rutas: /api/dosis
    */

    this.router.get('/', validarJWT.validarJWT, dosisController.listarDosis);
    this.router.post(
      '/',
      [check('dosis', 'El nombre es obligatorio ').not().isEmpty(), validarCampos.validarCampos],
      dosisController.crearDosis
    );
    this.router.delete('/:id', validarJWT.validarJWT, dosisController.eliminarDosis);
  }
}

const dosisRoutes = new DosisRoutes();
export default dosisRoutes.router;

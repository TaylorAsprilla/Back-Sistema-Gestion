import { Router } from 'express';
import { check } from 'express-validator';
import { vacunaController } from '../controllers/vacuna.controller';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

class VacunasRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    /*
     Rutas: /api/vacunas
    */

    this.router.get('/', vacunaController.listarVacunas);
    this.router.get('/:id', validarJWT.validarJWT, vacunaController.listarUnVacuna);
    this.router.post(
      '/',
      [check('nombre', 'El nombre es obligatorio ').not().isEmpty(), validarCampos.validarCampos],
      vacunaController.crearVacuna
    );
    this.router.put(
      '/:id',
      [check('nombre', 'El nombre es obligatorio ').not().isEmpty(), validarCampos.validarCampos],
      vacunaController.actualizarVacuna
    );
    this.router.delete('/:id', validarJWT.validarJWT, vacunaController.eliminarVacuna);
  }
}

const vacunasRoutes = new VacunasRoutes();
export default vacunasRoutes.router;

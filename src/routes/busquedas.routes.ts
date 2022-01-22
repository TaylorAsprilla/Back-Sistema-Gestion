import { Router } from 'express';
import { check } from 'express-validator';
import { busquedaController } from '../controllers/busquedas.controller';

const { login, renewToken } = require('../controllers/login.controllers');
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

/* 
  Path: 'api/login'
*/

class BusquedasRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get('/usuarios/:busqueda', validarJWT.validarJWT, busquedaController.busquedaUsuarios);
    this.router.get('/ministerios/:busqueda', validarJWT.validarJWT, busquedaController.busquedaMinisterios);
    this.router.get('/:busqueda', validarJWT.validarJWT, busquedaController.getTodo);
  }
}

const busqeudasRoutes = new BusquedasRoutes();
export default busqeudasRoutes.router;

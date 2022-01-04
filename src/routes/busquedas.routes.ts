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
    this.router.get('/todo/:busqueda', validarJWT.validarJWT, busquedaController.busquedaTodo);
    this.router.get('/todo/:tabla/:busqueda', validarJWT.validarJWT, busquedaController.busquedaPorTabla);
  }
}

const busqeudasRoutes = new BusquedasRoutes();
export default busqeudasRoutes.router;

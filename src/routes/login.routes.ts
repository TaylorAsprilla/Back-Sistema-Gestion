import { Router } from 'express';
import { check } from 'express-validator';
import { loginController } from '../controllers/login.controllers';
import { usuarioController } from '../controllers/usuarios.controller';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

/* 
  Path: 'api/login'
*/

class LoginRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post(
      '/',
      [
        check('login', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos.validarCampos,
      ],
      loginController.login
    );
    this.router.get('/renew/:id', validarJWT.validarJWT, loginController.renewToken);
  }
}

const loginRoutes = new LoginRoutes();
export default loginRoutes.router;

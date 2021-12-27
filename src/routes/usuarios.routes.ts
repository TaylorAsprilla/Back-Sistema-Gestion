import { Router } from 'express';
import { check } from 'express-validator';
import { usuariosController } from '../controllers/usuarios.controller';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

class UsuariosRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    /*
     Rutas: /api/usuarios
    */

    this.router.get('/', validarJWT.validarJWT, usuariosController.listarUsuarios);
    this.router.get('/:id', validarJWT.validarJWT, usuariosController.listarUnUsuario);
    this.router.post(
      '/',
      [
        check('primer_nombre', 'El nombre es obligatorio ').not().isEmpty(),
        check('primer_apellido', 'El apellido es obligatorio ').not().isEmpty(),
        check('numero_documento', 'El Número del documento es obligatorio ').not().isEmpty(),
        check('email', 'El email es obligatorio ').isEmail(),
        check('fecha_nacimiento', 'La fecha de nacimiento es obligatoria ').not().isEmpty(),
        validarCampos.validarCampos,
      ],
      usuariosController.crearUsuario
    );
    this.router.put(
      '/:id',
      [
        check('primer_nombre', 'El nombre es obligatorio ').not().isEmpty(),
        check('primer_apellido', 'El apellido es obligatorio ').not().isEmpty(),
        check('numero_documento', 'El Número del documento es obligatorio ').not().isEmpty(),
        check('email', 'El email es obligatorio ').isEmail(),
        check('fecha_nacimiento', 'La fecha de nacimiento es obligatoria ').not().isEmpty(),
        validarCampos.validarCampos,
      ],
      usuariosController.actualizarUsuario
    );
    this.router.delete('/:id', validarJWT.validarJWT, usuariosController.eliminarUsuario);
  }
}

const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;

import { Router } from 'express';
import { check } from 'express-validator';
import { usuarioController } from '../controllers/usuarios.controller';
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

    this.router.get('/', validarJWT.validarJWT, usuarioController.listarUsuarios);
    this.router.get('/todos', validarJWT.validarJWT, usuarioController.listarTodosLosUsuarios);
    this.router.get('/:id', validarJWT.validarJWT, usuarioController.listarUnUsuario);

    this.router.post(
      '/',
      [
        check('primer_nombre', 'El nombre es obligatorio ').not().isEmpty(),
        check('primer_apellido', 'El apellido es obligatorio ').not().isEmpty(),
        check('numero_documento', 'El Número del documento es obligatorio ').not().isEmpty(),
        validarCampos.validarCampos,
      ],
      usuarioController.crearUsuario
    );
    this.router.put(
      '/:id',
      [
        check('primer_nombre', 'El nombre es obligatorio ').not().isEmpty(),
        check('primer_apellido', 'El apellido es obligatorio ').not().isEmpty(),
        check('numero_documento', 'El Número del documento es obligatorio ').not().isEmpty(),
        validarCampos.validarCampos,
      ],
      usuarioController.actualizarUsuario
    );
    this.router.delete('/:id', validarJWT.validarJWT, usuarioController.eliminarUsuario);
  }
}

const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;

import { Router } from 'express';
import { check } from 'express-validator';
import { permisoController } from '../controllers/permiso.controller';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

class PermisosRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    /*
     Rutas: /api/permisos
    */

    this.router.get('/', validarJWT.validarJWT, permisoController.listarPermisos);
    this.router.get('/:id', validarJWT.validarJWT, permisoController.listarUnPermiso);
    this.router.post(
      '/',
      [check('nombre', 'El nombre es obligatorio ').not().isEmpty(), validarCampos.validarCampos],
      permisoController.crearPermiso
    );
    this.router.put(
      '/:id',
      [check('nombre', 'El nombre es obligatorio ').not().isEmpty(), validarCampos.validarCampos],
      permisoController.actualizarPermiso
    );
    this.router.delete('/:id', validarJWT.validarJWT, permisoController.eliminarPermiso);
  }
}

const permisosRoutes = new PermisosRoutes();
export default permisosRoutes.router;

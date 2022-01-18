import { Router } from 'express';
import { check } from 'express-validator';
import { tipoDocumentoController } from '../controllers/tipo-documento.controller';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

class TipoDocumentoRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    /*
     Rutas: /api/tipodocumento
    */

    this.router.get('/', tipoDocumentoController.listarTipoDocumento);
    this.router.get('/:id', validarJWT.validarJWT, tipoDocumentoController.listarUnTipoDocumento);
    this.router.post(
      '/',
      [
        check('nombre', 'El nombre es obligatorio ').not().isEmpty(),
        validarCampos.validarCampos,
        validarJWT.validarJWT,
      ],
      tipoDocumentoController.crearTipoDocumento
    );
    this.router.put(
      '/:id',
      [
        check('nombre', 'El nombre es obligatorio ').not().isEmpty(),
        validarCampos.validarCampos,
        validarJWT.validarJWT,
      ],
      tipoDocumentoController.actualizarTipoDocumento
    );
    this.router.delete('/:id', validarJWT.validarJWT, tipoDocumentoController.eliminarTipoDocumento);
  }
}

const congregacionRoutes = new TipoDocumentoRoutes();
export default congregacionRoutes.router;

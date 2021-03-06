import { Router } from 'express';
import fileUpload from 'express-fileupload';

import { uploadsController } from '../controllers/uploads.controller';

import { validarJWT } from '../middlewares/validar-jwt';

class UploadsRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    /*
     Rutas: /api/uploads
    */
    this.router.use(fileUpload());
    this.router.put('/:tipo/:id', uploadsController.fileUpload);
    this.router.get('/:tipo/:foto', uploadsController.mostrarFoto);
  }
}

const vacunasRoutes = new UploadsRoutes();
export default vacunasRoutes.router;

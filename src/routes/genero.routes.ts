import { Router } from 'express';
import { generoController } from '../controllers/genero.controller';

class GeneroRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    /*
     Rutas: /api/genero
    */

    this.router.get('/', generoController.listarGenero);
  }
}

const generoRoutes = new GeneroRoutes();
export default generoRoutes.router;

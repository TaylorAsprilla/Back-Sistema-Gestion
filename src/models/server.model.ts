import express, { Application } from 'express';
import cors from 'cors';
import db from '../../database/connection';
import usuariosRoutes from '../routes/usuarios.routes';
import loginRoutes from '../routes/login.routes';
import ministerioRoutes from '../routes/ministerio.routes';
import vacunaRoutes from '../routes/vacuna.routes';
import permisoRoutes from '../routes/permiso.routes';
import uploadsRoutes from '../routes/uploads.routes';

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    usuarios: '/api/usuarios',
    login: '/api/login',
    ministerios: '/api/ministerios',
    vacunas: '/api/vacunas',
    permisos: '/api/permisos',
    uploads: '/api/uploads',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';

    // Métodos Iniciales
    this.dbConenection();
    this.middlewares();

    // Definir las rutas
    this.routes();
  }

  // Conectar base de datos

  async dbConenection() {
    try {
      await db.authenticate();
      console.log('Base de datos online');
    } catch (error) {
      throw console.log(error);
    }
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    // Lectura del body
    this.app.use(express.json());
    // this.app.use(express.urlencoded({ extended: false }));

    // Carpeta pública
    this.app.use(express.static('public'));
  }

  // Rutas
  routes(): void {
    // this.app.use('/', indexRoutes);
    this.app.use(this.apiPaths.usuarios, usuariosRoutes);
    this.app.use(this.apiPaths.login, loginRoutes);
    this.app.use(this.apiPaths.ministerios, ministerioRoutes);
    this.app.use(this.apiPaths.vacunas, vacunaRoutes);
    this.app.use(this.apiPaths.permisos, permisoRoutes);
    this.app.use(this.apiPaths.uploads, uploadsRoutes);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}

export default Server;

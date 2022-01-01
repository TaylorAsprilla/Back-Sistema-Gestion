import Usuario from '../models/usuario.model';
import fs from 'fs';

const jwt = require('jsonwebtoken');

class ActualizarImagen {
  public async actualizarImagen(documento: string, tipo: string, nombreArchivo: string) {
    let pathViejo = '';

    switch (tipo) {
      case 'usuarios':
        const usuario = await Usuario.findOne({ where: { numero_documento: documento } });
        if (!usuario) {
          console.log('El Usuario no existe');
          return false;
        }

        pathViejo = `./uploads/usuarios/${usuario.getDataValue('imagen')}`;
        this.borrarImagen(pathViejo);

        await usuario.update(
          { imagen: nombreArchivo },
          {
            where: {
              numero_documento: documento,
            },
          }
        );

        return true;
        break;
    }
  }

  borrarImagen(path: string) {
    if (fs.existsSync(path)) {
      // Borrar la imagen anterior
      fs.unlinkSync(path);
    }
  }
}
export const actualizarImagen = new ActualizarImagen();

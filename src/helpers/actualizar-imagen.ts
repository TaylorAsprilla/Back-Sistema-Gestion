import Usuario from '../models/usuario.model';
import fs from 'fs';

const jwt = require('jsonwebtoken');

class ActualizarImagen {
  public async actualizarImagen(id: string, tipo: string, nombreArchivo: string) {
    let pathViejo = '';
    const idUSuario = String(id);
    console.log(id);
    switch (tipo) {
      case 'usuarios':
        const usuario = await Usuario.findOne({ where: { id: idUSuario } });

        if (!usuario) {
          return false;
        }

        pathViejo = `./uploads/usuarios/${usuario.getDataValue('imagen')}`;
        this.borrarImagen(pathViejo);

        await usuario.update(
          { imagen: nombreArchivo },
          {
            where: {
              id: id,
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

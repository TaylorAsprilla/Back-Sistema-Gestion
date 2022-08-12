import Usuario from '../models/usuario.model';
import fs from 'fs';
import Ministerio from '../models/ministerio.model';

const jwt = require('jsonwebtoken');

class ActualizarImagen {
  public async actualizarImagen(id: string, tipo: string, nombreArchivo: string) {
    let pathViejo = '';
    const idImagen = String(id);

    switch (tipo) {
      case 'usuarios':
        const usuario = await Usuario.findOne({ where: { id: idImagen } });

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

      case 'ministerios':
        const ministerio = await Ministerio.findOne({ where: { id: idImagen } });

        if (!ministerio) {
          return false;
        }

        pathViejo = `./uploads/ministerios/${ministerio.getDataValue('imagen')}`;
        this.borrarImagen(pathViejo);

        await ministerio.update(
          { logo: nombreArchivo },
          {
            where: {
              id: idImagen,
            },
          }
        );

        return true;
        break;

      case 'carnets':
        const carnet = await Usuario.findOne({ where: { id: idImagen } });

        if (!carnet) {
          return false;
        }

        pathViejo = `./uploads/carnets/${carnet.getDataValue('imagen')}`;
        this.borrarImagen(pathViejo);

        await carnet.update(
          { carnet: nombreArchivo },
          {
            where: {
              id: idImagen,
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

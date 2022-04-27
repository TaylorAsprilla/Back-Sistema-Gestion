import { DataTypes } from 'sequelize';

import db from '../../database/connection';

const UsuarioRegistro = db.define(
  'usuario_registro',
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_voluntario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default UsuarioRegistro;

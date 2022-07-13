import { DataTypes } from 'sequelize';
import db from '../../database/connection';

const UsuarioPermiso = db.define(
  'usuario_permiso',
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_permiso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
export default UsuarioPermiso;

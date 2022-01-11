import { DataTypes } from 'sequelize';

import db from '../../database/connection';

const Ministerio = db.define(
  'ministerio',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    logo: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Ministerio;

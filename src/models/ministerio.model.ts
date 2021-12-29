import { DataTypes } from 'sequelize';

import db from '../../database/connection';

const Ministerio = db.define(
  'Ministerio',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
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

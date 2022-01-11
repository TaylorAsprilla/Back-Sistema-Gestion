import { DataTypes } from 'sequelize';

import db from '../../database/connection';

const Permiso = db.define(
  'permiso',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Permiso;

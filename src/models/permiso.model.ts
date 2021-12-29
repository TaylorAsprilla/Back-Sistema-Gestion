import { DataTypes } from 'sequelize';

import db from '../../database/connection';

const Permiso = db.define(
  'Permiso',
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

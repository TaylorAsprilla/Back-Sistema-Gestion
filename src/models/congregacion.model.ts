import { DataTypes } from 'sequelize';

import db from '../../database/connection';

const Congregacion = db.define(
  'congregacion',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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

export default Congregacion;

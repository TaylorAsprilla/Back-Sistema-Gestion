import { DataTypes } from 'sequelize';

import db from '../../database/connection';

const Genero = db.define(
  'genero',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default Genero;

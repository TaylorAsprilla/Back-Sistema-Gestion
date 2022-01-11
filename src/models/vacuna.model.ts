import { DataTypes } from 'sequelize';

import db from '../../database/connection';

const Vacuna = db.define(
  'vacuna',
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

export default Vacuna;

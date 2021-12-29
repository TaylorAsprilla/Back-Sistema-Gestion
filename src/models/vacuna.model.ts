import { DataTypes } from 'sequelize';

import db from '../../database/connection';

const Vacuna = db.define(
  'Vacuna',
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

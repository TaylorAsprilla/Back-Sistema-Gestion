import { DataTypes } from 'sequelize';

import db from '../../database/connection';

const Ingreso = db.define(
  'ingreso',
  {
    id_daIngreso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Ingreso;

import { DataTypes } from 'sequelize';

import db from '../../database/connection';

const Dosis = db.define(
  'dosis',
  {
    dosis: {
      type: DataTypes.STRING,
      allowNull: false,
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

export default Dosis;

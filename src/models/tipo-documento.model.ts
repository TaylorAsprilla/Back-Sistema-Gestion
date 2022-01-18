import { DataTypes } from 'sequelize';

import db from '../../database/connection';

const TipoDocumento = db.define(
  'tipo_documento',
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

export default TipoDocumento;

import { DataTypes } from 'sequelize';

import db from '../../database/connection';

const Usuario = db.define(
  'usuario',
  {
    primer_nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    segundo_nombre: {
      type: DataTypes.STRING,
    },
    primer_apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    segundo_apellido: {
      type: DataTypes.STRING,
    },
    numero_documento: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    documentoTutor: {
      type: DataTypes.STRING,
    },
    id_congregacion: {
      type: DataTypes.INTEGER,
    },
    id_tipoDocumento: {
      type: DataTypes.INTEGER,
    },
    id_genero: {
      type: DataTypes.INTEGER,
    },
    id_vacuna: {
      type: DataTypes.INTEGER,
    },
    id_dosis: {
      type: DataTypes.INTEGER,
    },
    login: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    imagen: {
      type: DataTypes.STRING,
    },
    carnet: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Usuario;

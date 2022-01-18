import { Sequelize } from 'sequelize';
require('dotenv').config();

//database wide options
var opts = {
  define: {
    //prevent sequelize from pluralizing table names
    freezeTableName: true,
  },
};

const db = new Sequelize('sistemagestion', 'root', '', {
  host: process.env.HOST,
  dialect: 'mysql',
  // logging: false,
});

export default db;

import { Dialect, Sequelize } from 'sequelize';

// import { database } from '../config';

//database wide options
var opts = {
  define: {
    //prevent sequelize from pluralizing table names
    freezeTableName: true,
  },
};

const db = new Sequelize('sistemagestion', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  // logging: false,
});

export default db;

import { Sequelize } from 'sequelize';

const { database } = require('../config');

//database wide options
var opts = {
  define: {
    //prevent sequelize from pluralizing table names
    freezeTableName: true,
  },
};

const db = new Sequelize(database.database, database.username, database.password, {
  host: database.host,
  dialect: 'mysql',
  // logging: false,
});

export default db;

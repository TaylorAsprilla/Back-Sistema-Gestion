import { Sequelize } from 'sequelize';
require('dotenv').config();

//database wide options
var opts = {
  define: {
    //prevent sequelize from pluralizing table names
    freezeTableName: true,
  },
};

const db = new Sequelize('congrega_sistema_gestion', 'congrega_tasprilla', 'v^jfq=R(^q+%', {
  host: 'congregacionmitacol.org',
  dialect: 'mysql',
  // logging: false,
});

export default db;

const { Sequelize } = require('sequelize');
//importanto variables de entorno 
require('dotenv').config({ path: 'variables.env'})


// Option 3: Passing parameters separately (other dialects)
const db = new Sequelize(process.env.BD_NAME,process.env.BD_USER, process.env.BD_PASS, {
  host: process.env.BD_HOST,
  dialect:'mysql',
  define:{
      timestamps:false
  }

});

module.exports = db;

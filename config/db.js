const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const db = new Sequelize('uptasknode', 'root', '', {
  host: 'localhost',
  dialect:'mysql',
  define:{
      timestamps:false
  }

});

module.exports = db;

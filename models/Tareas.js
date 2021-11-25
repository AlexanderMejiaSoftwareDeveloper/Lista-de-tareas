const Sequelize = require('sequelize')
const db = require('../config/db')
//Importamos modelo de proyectos para hacer la relacion
const Proyectos = require('./Proyectos')


const Tareas = db.define('tareas', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    tarea: Sequelize.STRING(100),
    estado: Sequelize.INTEGER(1)
})
//Con belongsTo  decimos que que cada que creemos una tarea , cada tarea pertenece a un Proyecto 
Tareas.belongsTo(Proyectos)
//Tambine existe  hasMany que es alrevez osea una tarea pernece a un priyecto, esta iria en el otro modelo para una relacion correcta
module.exports = Tareas;
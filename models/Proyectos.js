const Sequelize = require('sequelize')
const db = require('../config/db')
const slug = require('slug') // Utilizamos slug para crear la url 
const shortid = require('shortid'); //utlizamos short id para crear un id unico y juntarolo con la url para que asi no se repitan las url

const Proyectos = db.define('proyectos',{
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },

    nombre: Sequelize.STRING(100),
    
    url: Sequelize.STRING(100)
},{
    //los hooks corren un funcion en determinaod tiempo
    hooks:{
        //este hoock se ejecutrara anter de que se realize in insert a la base de datos
        //mas hooks en en la documentacion de sequelize 
        beforeCreate(proyecto){
            const url = slug(proyecto.nombre).toLowerCase()
            proyecto.url = `${url}-${shortid.generate()}`
        }
    }
})

module.exports = Proyectos;
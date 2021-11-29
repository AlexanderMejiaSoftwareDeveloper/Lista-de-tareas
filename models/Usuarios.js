const Sequelize = require('sequelize')
const db = require('../config/db')
const Proyectos = require('../models/Proyectos')
//libreria para  encriptar contraseña
const bcrypt = require('bcrypt-nodejs')

const Usuarios = db.define("usuarios", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(80),
        allowNull: false, //No aceptar campos vacios
        validate:{
            isEmail:{
                msg:"Agrega un email valido"
            },  
            notEmpty:{
                msg: 'El email no puede ir vacio'
            } 
        },
        unique:{
            args: true,
            msg:"Usuario ya registrado"
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate:{
            notEmpty: {
                msg: 'La contraseña no puede ir vacia'
            }
        }
    }
}, {
    hooks: {
        //este hoock se ejecutrara anter de que se realize in insert a la base de datos
        //mas hooks en en la documentacion de sequelize 
        beforeCreate(usuario) {
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }

});

Usuarios.hasMany(Proyectos)//Relacion la tabla de proyectos

module.exports = Usuarios;
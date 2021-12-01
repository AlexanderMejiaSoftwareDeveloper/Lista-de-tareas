const Usuarios = require('../models/Usuarios')

exports.formCrearCuenta = (req,res) => {
    res.render('crearCuenta', {
        nombrePagina:'Crear cuenta en upTask'
    })
}

exports.formIniciarSesion = (req,res) => {
    const {error} =  res.locals.mensajes;
    res.render('iniciar-sesion', {
        nombrePagina:'Iniciar Sesion en upTask',
        error,
    })
}

exports.crearCuenta = async (req,res) => {
    //leer datos 
    const {email, password} = req.body;

    try {
        
        //crear usuario
        await  Usuarios.create({
            email,
            password
        })

    } catch (error) {
        //usando flash para mostrar errores
        req.flash('error',error.errors.map(error => error.message));
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina:'Crear cuenta en upTask',
            email,
            password
        })
    }

   
 
}
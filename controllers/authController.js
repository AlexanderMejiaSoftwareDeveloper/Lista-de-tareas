const passport = require('passport')
const Usuarios = require('../models/Usuarios')
const crypto = require('crypto');
//importamos op de sequalize para poder usar operadores
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const bcrypt = require('bcrypt-nodejs')
const enviarEmail = require('../handlers/email')


exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/', //Si las credenciales estan correctas las mandara aca 
    failureRedirect: '/iniciar-sesion', //Si las credenciaes son incorrectas los mandara aca
    failureFlash: true, //activamo flash para mostarr errores
    badRequestMessage: "Ambos campos son obligatorios" // Cambiams el mensaje por defecto que tiene cuando no ingresamos datos

});

//Funcion para ver si el usuario esta logeado o no 
exports.usuarioAutenticado = (req, res, next) => {
    //si el user esta autenticado 
    if (req.isAuthenticated()) {
        return next()
    }
    //si no redirigir el formulario 
    return res.redirect('/iniciar-sesion')
}

//Funcion para cerrar sesion 
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion') //nos lleva a iniciar sesion
    })
}

//funcion para enviar token para recuperar contraseña 
exports.enviarToken = async(req, res) => {
    //verificar que el usuario exista
    const usuario = await Usuarios.findOne({ where: { email: req.body.email } })

    //si no existe el usuario 
    if (!usuario) {
        req.flash('error', 'No existe esa cuenta')
        res.redirect('/reestablecer')
    }

    //si el usuario existe, generamos  un token 
    usuario.token = crypto.randomBytes(20).toString('hex'); //generemaos el token
    usuario.expiracion = Date.now() + 3600000 //tiempo de expiracion, aqui equivale a una hora

    //guardamos estos campos en la base de datos
    await usuario.save()

    //url de reset
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}` //req.header.host nos devuelve el dominio actual

    //enviar el correo con el token 

    await enviarEmail.enviar({
        usuario,
        subject: 'Reestablecer contraseña',
        resetUrl,
        archivo: 'reestablecerClave'
    })

    //terminamos ejecucuon de envio de correo
    req.flash('correcto', 'Se envio el correo correctaente, visita tu caja de emails')
    res.redirect('/iniciar-sesion')


}

exports.validarToken = async(req, res) => {
    const usuario = await Usuarios.findOne({
        where: { token: req.params.token }
    });

    //si no encuenttra el user
    if (!usuario) {
        req.flash('error', 'No valido')
        res.redirect('/reestablecer')

    }

    //formulario para generar nueva contraseña 
    res.render('resetPassword', {
        nombrePagina: 'Reestablece tu contraseña'
    })
}

//Actualizar la contraseña cuando lo olvido por uno nuevo 
exports.actualizarPassword = async(req, res) => {

    //verifica si el token y fecha de expiracion son validos
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte]: Date.now() // Aqui especificamos un opereamor mayor o igual con la la ayuda de Op de sequelize
            }
        }
    });


    //si token o expiracion es invalido
    if (!usuario) {
        req.flash('error', 'No valido');
        res.redirect('/reestablecer')
    }
    //encriptamos nuevo password y removemos los campos de token y expiracion
    usuario.token = null;
    usuario.expiracion = null;
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    //gaurdamos la nueva password'
    await usuario.save();


    req.flash('correcto', 'Tu contraseña a sido actualizada correctamente')
    res.redirect('/iniciar-sesion')

}
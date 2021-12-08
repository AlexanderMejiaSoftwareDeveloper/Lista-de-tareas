const Usuarios = require('../models/Usuarios')
const enviarEmail = require('../handlers/email')


exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en upTask'
    })
}

exports.formIniciarSesion = (req, res) => {
    const { error } = res.locals.mensajes;
    res.render('iniciar-sesion', {
        nombrePagina: 'Iniciar Sesion en upTask',
        error,
    })
}

exports.crearCuenta = async(req, res) => {
    //leer datos 
    const { email, password } = req.body;

    try {

        //crear usuario
        await Usuarios.create({
            email,
            password
        })

        //Crear url de confirmar 
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}` //req.header.host nos devuelve el dominio actual

        //Crear objero de usuario
        const usuario = {
                email
            }
            //enviar email
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirma tu cuenta Up Task',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        })

        //Redirigir al usuarip
        req.flash('correcto', 'Enviamos un correo porfavor confirma tu cuenta')
        res.redirect('/iniciar-sesion')

    } catch (error) {
        //usando flash para mostrar errores
        req.flash('error', error.errors.map(error => error.message));
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina: 'Crear cuenta en upTask',
            email,
            password
        })
    }



}


exports.reestablecerClave = (req, res) => {
    res.render('reestablecer', {
        nombrePagina: "Reestrablecer contraseña"
    })
}

//Cambiando el estadoo a verificado de una cuenta
exports.confirmaCuenta = async(req, res) => {
    const usuario = await Usuarios.findOne({ where: { email: req.params.correo } })

    if (!usuario) {
        req.flash('error', 'no valido')
        res.redirect('/crear-cuenta')
    }

    usuario.activo = 1;

    usuario.save()

    req.flash('correcto', 'Has activado tu cuenta correctamente')
    res.redirect('/iniciar-sesion')


}
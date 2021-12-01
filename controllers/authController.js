const passport = require('passport')

exports.autenticarUsuario =  passport.authenticate('local',{
    successRedirect: '/', //Si las credenciales estan correctas las mandara aca 
    failureRedirect: '/iniciar-sesion', //Si las credenciaes son incorrectas los mandara aca
    failureFlash:true, //activamo flash para mostarr errores
    badRequestMessage: "Ambos campos son obligatorios" // Cambiams el mensaje por defecto que tiene cuando no ingresamos datos
    
});

//Funcion para ver si el usuario esta logeado o no 
exports.usuarioAutenticado = (req, res, next) =>{
    //si el user esta autenticado 
    if (req.isAuthenticated()) {
        return next()
    }
    //si no redirigir el formulario 
    return res.redirect('/iniciar-sesion')
}

//Funcion para cerrar sesion 
exports.cerrarSesion =(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/iniciar-sesion') //nos lleva a iniciar sesion
    })
}
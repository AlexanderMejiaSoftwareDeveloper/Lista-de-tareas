const passport = require('passport')
const localStraty = require('passport-local').Strategy;

//Referencia al modelo donde vamos a autentificar
const Usuarios = require('../models/Usuarios')

//local stratety - Login con credenciales propias (usuario y clave)
passport.use(
    new localStraty(
        //por default passport espera un usuario y password, por eso aqui reescribimos ppara que use email y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async(email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                        where: {
                            email,
                            activo: 1
                        }
                    })
                    //Usuario existe pero clave incorrecta
                if (!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'Password incorrecto '
                    })
                }
                //El email existe y la clave
                return done(null, usuario)


            } catch (error) {
                //Ese usuario no existe
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                })
            }
        }
    )
);
//serializar el usuario 
passport.serializeUser((usuario, callback) => {
    callback(null, usuario)
})

//deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario)
})

//exportar
module.exports = passport
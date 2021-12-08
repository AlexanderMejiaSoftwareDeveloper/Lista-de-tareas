const express = require('express');
//con router podemos utilizar las rutas de express
const router = express.Router();
//importamos controlador 
const proyectoController = require('../controllers/proyectoController')
const tareasController = require('../controllers/tareasController')
const usuariosController = require('../controllers/usuariosController')
const authController = require('../controllers/authController')
    //importado express validator para validacion
const { body } = require('express-validator')


module.exports = () => {
    router.get('/',
        authController.usuarioAutenticado, //Con esto verificamos que el usuario autenticado
        proyectoController.proyectosHome)
    router.get('/nuevo-proyecto',
        authController.usuarioAutenticado,
        proyectoController.formularioProyecto)

    router.post('/nuevo-proyecto',
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(), //con estas funciones de express validator asemos que se sanitize la informacion 
        proyectoController.nuevoProyecto)

    //listar proyecot 
    router.get('/proyectos/:url',
        authController.usuarioAutenticado,
        proyectoController.proyectoPorUrl)

    //Actualizar proyecto
    router.get('/proyecto/editar/:id',
        authController.usuarioAutenticado,
        proyectoController.fomularioEditar)

    router.post('/nuevo-proyecto/:id',
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(), //con estas funciones de express validator asemos que se sanitize la informacion 
        proyectoController.actualizarProyecto)


    //Eliminar proyectos
    router.delete('/proyectos/:url',
        authController.usuarioAutenticado,
        proyectoController.eliminarProyecto)

    //Tareas
    router.post('/proyectos/:url',
            authController.usuarioAutenticado,
            tareasController.agregarTarea)
        //patch cambia solo un parte mientras que update reescribe todo el elemento
    router.patch('/tareas/:id',
        authController.usuarioAutenticado,
        tareasController.cambiarEstadoTarea)
    router.delete('/tareas/:id', tareasController.eliminarTarea)

    //Crear nueva cuenta 
    router.get('/crear-cuenta', usuariosController.formCrearCuenta)
    router.post('/crear-cuenta', usuariosController.crearCuenta)
    router.get('/confirmar/:correo', usuariosController.confirmaCuenta)

    //Iniciar sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion)
    router.post('/iniciar-sesion', authController.autenticarUsuario)

    //cerrar sesion
    router.get('/cerrar-sesion', authController.cerrarSesion)

    //restablecer clave
    router.get('/reestablecer', usuariosController.reestablecerClave)
    router.post('/reestablecer', authController.enviarToken)
        //ruta para reestablecer con token 
    router.get('/reestablecer/:token', authController.validarToken)

    //ruta para reestablecer con token 
    router.post('/reestablecer/:token', authController.actualizarPassword)




    return router;
}
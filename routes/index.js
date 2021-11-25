const express = require('express');
//con router podemos utilizar las rutas de express
const router = express.Router();
//importamos controlador 
const proyectoController = require('../controllers/proyectoController')
const tareasController = require('../controllers/tareasController')
//importado express validator para validacion
const { body } = require('express-validator')


module.exports = () => {
    router.get('/', proyectoController.proyectosHome)
    router.get('/nuevo-proyecto', proyectoController.formularioProyecto)

    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),//con estas funciones de express validator asemos que se sanitize la informacion 
        proyectoController.nuevoProyecto)

    //listar proyecot 
    router.get('/proyectos/:url', proyectoController.proyectoPorUrl)

    //Actualizar proyecto
    router.get('/proyecto/editar/:id', proyectoController.fomularioEditar)
    router.post('/nuevo-proyecto/:id',
        body('nombre').not().isEmpty().trim().escape(),//con estas funciones de express validator asemos que se sanitize la informacion 
        proyectoController.actualizarProyecto)


    //Eliminar proyectos
    router.delete('/proyectos/:url', proyectoController.eliminarProyecto)

    //Tareas
    router.post('/proyectos/:url', tareasController.agregarTarea)
    //patch cambia solo un parte mientras que update reescribe todo el elemento
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea)

    return router;
}
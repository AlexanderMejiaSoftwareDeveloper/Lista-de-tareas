//insportando modelo para trabjar con base de datos
const Proyectos = require('../models/Proyectos')
const Tareas = require('../models/Tareas')

//importamos slug para crear urls
const slug = require('slug')

//con exports podemos varios de los mismo
exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll()

    //rebder nos permite mandar una vista // json un objeto y send igual
    res.render('index', {
        nombrePagina: "Proyectos",
        proyectos
    })
};

exports.formularioProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll()

    res.render('nuevoProyecto', {
        nombrePagina: "Nuevo Proyecto",
        proyectos
    })
};

exports.nuevoProyecto = async (req, res) => {
    //validando campos 
    const { nombre } = req.body

    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nombre al proyecto' })
    }

    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: "Nuevo Proyecto",
            errores
        })

    } else {
        //no hay errores
        //insertar datos

        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/')

    }

}

exports.proyectoPorUrl = async (req, res, next) => {
    //pasamos proyectoss
    const proyectosPromise = Proyectos.findAll()

    //res.send(req.params.url)//asi accedemos al comidin que designamos en el router
    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    // Cuando una consulta no depende la otro es mejor usar promesas 

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);
   
    //Consultar tareas del proyecto actual
    const tareas = await Tareas.findAll(({
        where:{
            proyectoId: proyecto.id
        },
        // Este include seria el igual a un join en sql, solo pasariamos el modelo
        // include: [
        //     { model: Proyectos }
        // ]
    }))


    //next() para la ejecucion del codigo
    if (!proyecto) return next();



    //pasar vistas o render
    res.render('tareas', {
        tareas,
        nombrePagina: 'Tareas del proyecto',
        proyecto,
        proyectos

    })
}

exports.fomularioEditar = async (req, res) => {

    //pasamos proyectoss
    const proyectosPromise = Proyectos.findAll()

    //consolta del proyecto para autollenar campos 

    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id
        }
    })

    // Cuando una consulta no depende la otro es mejor usar promesas 

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    res.render('nuevoProyecto', {
        proyectos,
        proyecto,
        nombrePagina: "Editar Proyecto"
    })
}

exports.actualizarProyecto = async (req, res) => {
    //validando campos 
    const { nombre } = req.body

    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nombre al proyecto' })
    }

    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: "Nuevo Proyecto",
            errores
        })

    } else {
        //no hay errores
        //insertar datos

        await Proyectos.update(
            { nombre: nombre },
            { where: {id:req.params.id} }
            );
        res.redirect('/')

    }

}

exports.eliminarProyecto = async (req,res, next) => {
   //req: tiene la informacion y s piuede optener cpn params o query
    console.log(req.query)
    const {urlProyecto} = req.query;

    const resultado =  await Proyectos.destroy({where: {url: urlProyecto}})
    
    //manejando posible error de caida de servidor o base de datos
    if(!resultado){
        return next();
    }
    
    res.send('Proyecto Eliminado Correctamente')
}


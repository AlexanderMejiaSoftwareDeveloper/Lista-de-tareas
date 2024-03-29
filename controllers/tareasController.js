//Agrgando modelo de tareas
const Proyectos = require('../models/Proyectos')
const Tareas = require('../models/Tareas')
exports.agregarTarea = async (req,res,next) => {
    //Obtenemos el proyecto actual 
    const proyecto = await Proyectos.findOne({where: {url: req.params.url}});
    
    //Leer datos del input
    const {tarea} = req.body
    const estado = 0; //Estado = incompleto 
    const proyectoId = proyecto.id //Id del proycto

    const resultado = await Tareas.create({tarea,estado,proyectoId});

    if (!resultado) {
        return next()
    }else{
        //redireccionar
        res.redirect(`/proyectos/${req.params.url}`)
    }


}

exports.cambiarEstadoTarea = async (req,res, next) =>{
    const {id} = req.params;
    const tarea = await Tareas.findOne({where:{id}})
    
    //Camiamos estato
    let estado = 0;
    if (tarea.estado === estado) {
        estado = 1
    }
    tarea.estado = estado

    const resultado = await tarea.save();
   
    if (!resultado) {
        return next()
    }
    
    res.status(200).send("Actualizado")
    
}

exports.eliminarTarea = async (req,res,next) =>{
    const {id} = req.params;
    const resultado = await Tareas.destroy({where:{id}})
    
    if (!resultado) {
        return next();
    }

    res.status(200).send('Tarea Eliminada')
}
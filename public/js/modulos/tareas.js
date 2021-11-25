import axios from "axios";

const tareas = document.querySelector('.listado-pendientes');

if (tareas) {

    //con este avento accedemos a todos los elementos que se envientran dentro de la clase de listado de pendientes
    tareas.addEventListener('click',(e)=>{
    console.log(e.target.classList)

    //con este if nos damos cuenta a que damos click  mediante el icono// por eso usamos contains
    if (e.target.classList.contains('fa-check-circle')) {
        //aqui extraeremos le id de la tarea que definimos en data-tarea en el pug
        const icono = e.target;
        //usamos parentElement para sebir un niel en el html hasta y despues dataset para acceder al valor de data-tarea, en este caso el id
        const idTarea = icono.parentElement.dataset.tarea
        //console.log(idTarea)
    
        //request hacia /tareas/:id
        const url = `${location.origin}/tareas/${idTarea}`
        
        axios.patch(url,{ idTarea })
            .then((respuesta)=>{
                console.log(respuesta)
                //Pasamos una Clase ppara que se cambie el color del icono
                if(respuesta.status === 200) {
                    icono.classList.toggle('completo');//con toggle ponemos un clase 
                }
            })
    }
    
        
    })
    
}

export default tareas;
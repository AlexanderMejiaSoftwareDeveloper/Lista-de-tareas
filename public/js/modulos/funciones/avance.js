import Swal from "sweetalert2"
export const actualizarAvance = () => {
    //selecionar las tareas existentes 
    const tareas = document.querySelectorAll('li.tarea')
   
    if (tareas.length) {
        //seleccionar las tareas completas
        const tareasCompletadas = document.querySelectorAll('i.completo')
        //calcular el avance 
        const avance =  Math.round((tareasCompletadas.length / tareas.length) * 100)
        //mostrar el avance
        const porcetaje = document.querySelector('#porcentaje');
        porcetaje.style.width = avance+'%'

        if (avance ===100) {
            Swal.fire(
                'Buen Trabajo!',
                'Completaste el proyecto!',
                'success'
              )
            
        }
    }

}
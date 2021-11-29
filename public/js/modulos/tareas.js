import axios from "axios";
import Swal from "sweetalert2";
const tareas = document.querySelector('.listado-pendientes');
import {actualizarAvance} from '../modulos/funciones/avance'


if (tareas) {

    //con este avento accedemos a todos los elementos que se envientran dentro de la clase de listado de pendientes
    tareas.addEventListener('click', (e) => {
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

            axios.patch(url, { idTarea })
                .then((respuesta) => {
                    console.log(respuesta)
                    //Pasamos una Clase ppara que se cambie el color del icono
                    if (respuesta.status === 200) {
                        icono.classList.toggle('completo');//con toggle ponemos un clase 
                        actualizarAvance()
                    }
                })
        }

        if (e.target.classList.contains('fa-trash')) {

            const tareaHTML = e.target.parentElement,
                idTarea = tareaHTML.dataset.tarea

            Swal.fire({
                title: 'Deseas borrar este proyecto?',
                text: "Un proyecto eliminado no se puede recuperar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar',
                cancelButtonText: "No, Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    //enviar peticion con axios
                    const url = `${location.origin}/tareas/${idTarea} `;
                    axios.delete(url, { params: { idTarea } })
                        .then((respuesta) => {
                            console.log(respuesta)
                            if(respuesta.status ===200) {
                                //Eliminado tarea del html
                               tareaHTML.parentElement.removeChild(tareaHTML); 
                               actualizarAvance()
                            }
                            Swal.fire(
                                'Tarea Eliminada!',
                                respuesta.data,
                                'success'
                            );

                           
                        }).catch(() => {
                            Swal.fire({
                                type: 'error',
                                title: 'Hubo un error',
                                text: 'No se pudo eliminar el proyecto'
                            })
                        })

                }
            })
        }


    })

}

export default tareas;
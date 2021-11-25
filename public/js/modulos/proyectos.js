import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector("#eliminar-proyecto");

if(btnEliminar){
    btnEliminar.addEventListener('click', (e) => {
        const urlProyecto = e.target.dataset.proyectoUrl //de esta forma accedemos al valor que definimos con la etiqueta especial de html 5 data 
        //console.log(urlProyecto)
                
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
                const url = `${location.origin}/proyectos/${urlProyecto} `;
                axios.delete(url,{params: {urlProyecto}})
                    .then((respuesta) => {
                        console.log(respuesta)
                        Swal.fire(
                            'Proyecto Eliminado!',
                            respuesta.data,
                            'success'
                        );
            
                        //redireccionar al inicio
                        setTimeout(() => {
                            window.location.href = '/';
                        }, 3000);
                    }).catch(()=>{
                        Swal.fire({
                            type: 'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el proyecto'
                        })
                    })
               
            }
        })
    })
}

export default btnEliminar;
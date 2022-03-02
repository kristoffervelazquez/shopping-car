// Variables
const formulario = document.querySelector('#formulario');
const listaTareas = document.querySelector('#lista-tweets');
let tareas = [];



// Event listeners
eventListeners();

function eventListeners(){
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTarea);

    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', ()=>{
        tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        crearHTML();
    })
}



//Funciones
function agregarTarea(evt){
    evt.preventDefault();
    // Text area donde el usuario escribe
    const tarea = document.querySelector('#tweet').value;

    // Validacion...
    if(tarea === ''){
        mostrarError('La tarea no puede ir vacia');
        return;
    }

    // Generar un objeto para cada tarea
    const tareaObj = {
        id: Date.now(),
        tarea
    }

    //Añadir al arreglo de tareas
    tareas = [ ...tareas, tareaObj];

    // Una vez agregado crear el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}




// Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');


    //Insertarlo en el contenido

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() =>{
        mensajeError.remove();
    }, 3000)
}


// Funcion que muestra el listado de las tareas en el documento
function crearHTML(){
    limpiarHTML();
    if(tareas.length > 0){
            tareas.forEach((tarea) => {
                // Agregar un boton de eliminar
                const btnEliminar = document.createElement('a');
                btnEliminar.classList.add('borrar-tweet')
                btnEliminar.innerText = 'X';
                //  Añadir la funcion de eleminar
                btnEliminar.onclick = () => {
                    borrarTarea(tarea.id);
                }


                // Crear el HTML
                const li = document.createElement('li');

                // añadir el texto
                li.innerText = tarea.tarea;

                // Añadir el boton
                li.appendChild(btnEliminar);

                // insertarlo en el HTML
                listaTareas.appendChild(li);
            })
    }
    sincronizarStorage();
}
function sincronizarStorage(){
    localStorage.setItem('tareas', JSON.stringify(tareas));
}   

// Elimina una tarea
function borrarTarea(id){
    tareas = tareas.filter( tarea => tarea.id !== id);
    crearHTML();
}

function limpiarHTML(){
    while(listaTareas.firstChild){
        listaTareas.removeChild(listaTareas.firstChild);
    }
}


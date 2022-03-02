// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();

function cargarEventListeners() {
    // Agregas un curso cuando presionas "Agrega al carrito"
    listaCursos.addEventListener('click', agregarCurso)
    // Eliminas un curso cuando presionas X
    carrito.addEventListener('click', eliminarCurso)
    // Boton de vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        limpiarHTML();
        articulosCarrito = [];
    });

}


// Funciones 
function agregarCurso(evt) {
    evt.preventDefault();

    if (evt.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = evt.target.parentElement.parentElement;
        leeDatosCurso(cursoSeleccionado);
    }

}

function eliminarCurso(evt){
    if(evt.target.classList.contains('borrar-curso')){
        const cursoId = evt.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}


// Lee el contenido del HTML al que le dimos click y extrae la información del curso
function leeDatosCurso(curso) {
    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Comprobar si un elemento ya existe en el carrito 
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    console.log(existe);

    if (existe) {
        // Actualizamos cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++
                return curso; // Retorna el objeto actualizado
            }else{
                return curso; // Retorna los objetos que no son actualizados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agrega elementos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
        // console.log(articulosCarrito)
    }


    carritoHTML();
}


// Muestra el carrito de compras en HTML

function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y agrega el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, cantidad, id, precio } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width=100></td>
            <td>${titulo}</td>
            <td>${cantidad} </td>
            <td>${precio}</td>
            <td>
                <a href="#" class = "borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
        //Agrega el html del carrito en el body
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos del tbody
function limpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    
}

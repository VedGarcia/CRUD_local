
let listaEmpleados = [];

const objEmpleado = {
  id: "",
  nombre: "",
  puesto: ""
}

let editando = false;

const formulario = document.querySelector('#form');
const nombreInput = document.querySelector("#name");
const puestoInput = document.querySelector("#puesto");
const btnAgregar = document.querySelector("#btn_plus");

formulario.addEventListener('submit', validarForm);

function validarForm(e) {
  e.preventDefault();

  if (nombreInput.value === "" || puestoInput.value === "") {
    alert('Todos los campos son obligatorios.');
    return;
  }
  if (editando) {
    editarEmpleado();
    editando = false;
  } else {
    objEmpleado.id = Date.now();
    objEmpleado.nombre = nombreInput.value;
    objEmpleado.puesto = puestoInput.value;

    agregarEmpleado();
}
}

function agregarEmpleado() {
  listaEmpleados.push({...objEmpleado});

  mostrarEmpleado();

  formulario.reset();

  limpiarObjeto();
}

function limpiarObjeto() {
  objEmpleado.id = "";
  objEmpleado.nombre = "";
  objEmpleado.puesto = "";
}

function mostrarEmpleado() {

  limpiarHTML()

  const divEmpleados = document.querySelector('.list_stafy');

  listaEmpleados.forEach(empleado => {
    const {id, nombre, puesto} = empleado;
    
    const parrafo = document.createElement("p");
    parrafo.textContent = `${id} - ${nombre} - ${puesto} - `;
    parrafo.dataset.id = id;

    const editarBoton = document.createElement("button");
    editarBoton.onclick = () => cargarEmpleado(empleado);
    editarBoton.textContent = "editar";
    editarBoton.classList.add("btn", "btn_edit");
    parrafo.append(editarBoton);

    const eliminarBoton = document.createElement("button");
    eliminarBoton.onclick = () => eliminarEmpleado(id)
    eliminarBoton.textContent = "X";
    eliminarBoton.classList.add("btn", "btn_close");
    parrafo.append(eliminarBoton);

    const hr = document.createElement("hr");

    divEmpleados.appendChild(parrafo);
    divEmpleados.appendChild(hr);
  })
}

function cargarEmpleado(empleado) {
  const {id, nombre, puesto} = empleado;

  nombreInput.value = nombre;
  puestoInput.value = puesto;

  objEmpleado.id = id;

  formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

  editando = true;
}

function editarEmpleado() {
  objEmpleado.nombre = nombreInput.value;
  objEmpleado.puesto = puestoInput.value;

  listaEmpleados.map( empleado => {
    if (empleado.id === objEmpleado.id) {
    empleado.nombre = objEmpleado.nombre;
    empleado.puesto = objEmpleado.puesto;
    }
  });
  limpiarHTML();
  mostrarEmpleado();
  
  formulario.reset();

  formulario.querySelector('button[type="submit"]').textContent = "Agregar";

  editando = false;
}

function eliminarEmpleado(id) {
  listaEmpleados = listaEmpleados.filter( empleado => empleado.id !== id);

  limpiarHTML();
  mostrarEmpleado();
}

function limpiarHTML(){
  const divEmplados = document.querySelector(".list_staff");
  while(divEmplados.firstChild) {
    divEmplados.removeChild(divEmplados.firstChild);
  }
}
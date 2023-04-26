let staffList = [];

const objStaff = {
  id: "",
  name: "",
  puesto: "",
};

let editing = false; // para saber cuando debe agregar o editar informacion

const formulary = document.querySelector("#form");
const nameInput = document.querySelector("#name");
const puestoInput = document.querySelector("#puesto");
const btnPlus = document.querySelector("#btn_plus");

formulary.addEventListener("submit", validForm);

// Para validar que el formulario este lleno antes de hacer submit
function validForm(e) {
  // se previene la accion de submit para no recargar la pagina
  e.preventDefault();
 // se valida que ambos input esten llenos
  if (nameInput.value === "" || puestoInput.value === "") {
    alert("Todos los campos son obligatorios");
    return;
  } 
  // para editar los empleados que se cargaron
  if(editing) {
    editStaff()
    editing = false;
  } else {
    objStaff.id = Date.now();
    objStaff.name = nameInput.value;
    objStaff.puesto = puestoInput.value;
    addStaff();
  }
}
// para agregar personal nuevo
function addStaff() {
  staffList.push({...objStaff});

  showStaff();

  formulary.reset();

  objClean();
}

function objClean() {
  // esto sirve para limpiar el objeto de empleados luego de agregar uno.
  objStaff.id = '';
  objStaff.name = '';
  objStaff.puesto = '';

}

function showStaff() { // para imprimir en "lista de empleados"
  
  cleanHTML();

  const listStaffShow = document.querySelector(".list_stafy");

  staffList.forEach((staffy) => {
    const { id, name, puesto } = staffy;

    const pSingles = document.createElement("p");
    pSingles.textContent = `${id} - ${name} - ${puesto} - `;
    pSingles.dataset.id = id;

    const btnEdit = document.createElement("button");
    btnEdit.onclick = () => chargeStaff(staffy);
    btnEdit.textContent = "Editar";
    btnEdit.classList.add("btn", "btn_edit");
    pSingles.append(btnEdit);

    const btnClose = document.createElement("button");
    btnClose.onclick = () => closeSingle(id);
    btnClose.textContent = "x";
    btnClose.classList.add("btn", "btn_close");
    pSingles.append(btnClose);

    const hr = document.createElement("hr");

    listStaffShow.appendChild(pSingles);
    listStaffShow.appendChild(hr);
  });
}

function chargeStaff(staff){ // para cargar la info en los input
  const {id, name, puesto} = staff;

  nameInput.value = name;
  puestoInput.value = puesto;

  objStaff.id = id;

  formulary.querySelector('button[type="submit"]').textContent = "Actualizar";

  editing = true;
}

function editStaff() { // para guardar los cambios hechos
  objStaff.name = nameInput.value;
  objStaff.puesto = puestoInput.value;

  staffList.map( staff => {
    if (staff.id === objStaff.id) {
      staff.name = objStaff.name;
      staff.puesto = objStaff.puesto;
    }
  });
  cleanHTML();
  showStaff();

  formulary.reset();

  formulary.querySelector('button[type="submit"]').textContent = "Agregar";

  editing = false;
}

function closeSingle(id){ // para eliminar un trabajador
  if (editing){
    alert("Necesitas finalizar la edición para poder eliminar");
    return;
  }
  staffList = staffList.filter(staff => staff.id !== id);

  cleanHTML();
  showStaff();
}

function cleanHTML(){ // limpia la lista para reimprimir
  const listStaffClean = document.querySelector('.list_stafy');
  while (listStaffClean.firstChild) {
    listStaffClean.removeChild(listStaffClean.firstChild);
  }
}

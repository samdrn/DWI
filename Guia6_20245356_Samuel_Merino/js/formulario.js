const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");
const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");
const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

const idModal = document.getElementById("idModal");

let arrayPaciente = [];

// índice del paciente que se está editando (-1 = ninguno)
let indiceEdicion = -1;

const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";

    inputNombre.focus();
};

const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
        inputRdMasculino.checked == true
            ? "Hombre"
            : inputRdFemenino.checked == true
                ? "Mujer"
                : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
        const paciente = [nombre, apellido, fechaNacimiento, sexo, labelPais, direccion];

        if (indiceEdicion === -1) {
            arrayPaciente.push(paciente);
            mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        } else {
            arrayPaciente[indiceEdicion] = paciente;
            mensaje.innerHTML = "Paciente actualizado correctamente";
            indiceEdicion = -1;
        }

        toast.show();
        limpiarForm();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayPaciente.forEach((element, indice) => {
        $fila += `
        <tr>
            <td scope="row" class="text-center fw-bold">${contador}</td>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>${element[2]}</td>
            <td>${element[3]}</td>
            <td>${element[4]}</td>
            <td>${element[5]}</td>
            <td>
                <button type="button" class="btn btn-primary" onclick="editarPaciente(${indice})">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" class="btn btn-danger" onclick="eliminarPaciente(${indice})">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>
        `;
        contador++;
    });

    return $fila;
}


const imprimirPacientes = () => {
    let $table = `
    <div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <tr>
                <th scope="col" class="text-center" style="width:5%">#</th>
                <th scope="col" class="text-center" style="width:15%">Nombre</th>
                <th scope="col" class="text-center" style="width:15%">Apellido</th>
                <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
                <th scope="col" class="text-center" style="width:10%">Sexo</th>
                <th scope="col" class="text-center" style="width:10%">País</th>
                <th scope="col" class="text-center" style="width:25%">Dirección</th>
                <th scope="col" class="text-center" style="width:10%">Opciones</th>
            </tr>
            ${imprimirFilas()}
        </table>
    </div>
    `;

    document.getElementById("idTablaPacientes").innerHTML = $table;
};

let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        cmbPais.appendChild(option);

        mensaje.innerHTML = "País agregado correctamente";
        toast.show();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

// Cargar datos de un paciente en el formulario para editarlo
function editarPaciente(indice) {
    const paciente = arrayPaciente[indice];

    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];

    if (paciente[3] === "Hombre") {
        inputRdMasculino.checked = true;
        inputRdFemenino.checked = false;
    } else if (paciente[3] === "Mujer") {
        inputRdMasculino.checked = false;
        inputRdFemenino.checked = true;
    } else {
        inputRdMasculino.checked = false;
        inputRdFemenino.checked = false;
    }

    for (let i = 0; i < cmbPais.options.length; i++) {
        if (cmbPais.options[i].text === paciente[4]) {
            cmbPais.value = cmbPais.options[i].value;
            break;
        }
    }

    inputDireccion.value = paciente[5];

    indiceEdicion = indice;

    mensaje.innerHTML = "Paciente cargado para edición";
    toast.show();

    inputNombre.focus();
}

// Eliminar paciente
function eliminarPaciente(indice) {
    arrayPaciente.splice(indice, 1);

    mensaje.innerHTML = "Paciente eliminado correctamente";
    toast.show();

    imprimirPacientes();
}


limpiarForm();
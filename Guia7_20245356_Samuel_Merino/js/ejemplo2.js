const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const bodyModal = document.getElementById("idBodyModal");

function validarFormulario() {

    let nombre = document.getElementById("idNombre").value.trim();
    let apellidos = document.getElementById("idApellidos").value.trim();
    let fecha = document.getElementById("idFechaNac").value;
    let correo = document.getElementById("idCorreo").value.trim();
    let password = document.getElementById("idPassword").value;
    let password2 = document.getElementById("idPasswordRepetir").value;
    let pais = document.getElementById("idCmPais").value;

    let ckProgramacion = document.getElementById("idCkProgramacion").checked;
    let ckBD = document.getElementById("idCkBD").checked;
    let ckRedes = document.getElementById("idCkRedes").checked;
    let ckSeguridad = document.getElementById("idCkSeguridad").checked;

    let carreraIng = document.getElementById("idRdIng").checked;
    let carreraLic = document.getElementById("idRdLic").checked;
    let carreraTec = document.getElementById("idRdTec").checked;
    let carreraOtro = document.getElementById("idRdOtro").checked;

    if (nombre === "" || apellidos === "" || correo === "" || fecha === "" || password === "" || password2 === "") {
        alert("Todos los campos deben estar completos.");
        return;
    }

    let hoy = new Date();
    let fechaNac = new Date(fecha);
    if (fechaNac > hoy) {
        alert("La fecha de nacimiento no puede ser mayor que la fecha actual.");
        return;
    }

    let exp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!exp.test(correo)) {
        alert("El correo electrónico no es válido.");
        return;
    }

    if (password !== password2) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    if (!ckProgramacion && !ckBD && !ckRedes && !ckSeguridad) {
        alert("Debe seleccionar al menos un interés.");
        return;
    }

    if (!carreraIng && !carreraLic && !carreraTec && !carreraOtro) {
        alert("Debe seleccionar una carrera.");
        return;
    }

    if (pais === "Seleccione una opcion") {
        alert("Debe seleccionar un país.");
        return;
    }

    mostrarDatos();
}

function mostrarDatos() {

    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }

    let tabla = document.createElement("table");
    tabla.setAttribute("class", "table table-striped");

    let tbody = document.createElement("tbody");

    function fila(label, valor) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        td1.textContent = label;
        td2.textContent = valor;
        tr.appendChild(td1);
        tr.appendChild(td2);
        return tr;
    }

    let intereses = [];
    if (document.getElementById("idCkProgramacion").checked) intereses.push("Programación");
    if (document.getElementById("idCkBD").checked) intereses.push("Base de Datos");
    if (document.getElementById("idCkRedes").checked) intereses.push("Inteligencia Artificial");
    if (document.getElementById("idCkSeguridad").checked) intereses.push("Seguridad Informática");

    let carrera = "";
    if (document.getElementById("idRdIng").checked) carrera = "Ingeniería de Software y Negocios Digitales";
    if (document.getElementById("idRdLic").checked) carrera = "Licenciatura en Economía y Negocios";
    if (document.getElementById("idRdTec").checked) carrera = "Ingeniería de Negocios";
    if (document.getElementById("idRdOtro").checked) carrera = "Otra";

    tbody.appendChild(fila("Nombres", document.getElementById("idNombre").value));
    tbody.appendChild(fila("Apellidos", document.getElementById("idApellidos").value));
    tbody.appendChild(fila("Fecha nacimiento", document.getElementById("idFechaNac").value));
    tbody.appendChild(fila("Correo", document.getElementById("idCorreo").value));
    tbody.appendChild(fila("Intereses", intereses.join(", ")));
    tbody.appendChild(fila("Carrera", carrera));
    tbody.appendChild(fila("País", document.getElementById("idCmPais").value));

    tabla.appendChild(tbody);
    bodyModal.appendChild(tabla);

    modal.show();
}

button.onclick = () => {
    validarFormulario();
};
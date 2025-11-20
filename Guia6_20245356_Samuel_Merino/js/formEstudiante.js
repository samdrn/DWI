const form = document.getElementById("formEstudiante");
const resultado = document.getElementById("resultado");

// Expresiones regulares
const regexCarnet = /^[A-Za-z]{2}\d{3}$/;
const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
const regexDui = /^\d{8}-\d{1}$/;
const regexNit = /^\d{4}-\d{6}-\d{3}-\d{1}$/;
const regexFecha = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexEdad = /^\d+$/;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const carnet = document.getElementById("carnet").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const dui = document.getElementById("dui").value.trim();
    const nit = document.getElementById("nit").value.trim();
    const fecha = document.getElementById("fecha").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const edad = document.getElementById("edad").value.trim();

    let errores = [];

    if (!regexCarnet.test(carnet)) errores.push("Carnet inválido (ej: AB001).");
    if (!regexNombre.test(nombre)) errores.push("Nombre solo puede contener letras y espacios.");
    if (!regexDui.test(dui)) errores.push("DUI inválido (formato ########-#).");
    if (!regexNit.test(nit)) errores.push("NIT inválido (formato ####-######-###-#).");
    if (!regexFecha.test(fecha)) errores.push("Fecha inválida (formato dd/mm/aaaa).");
    if (!regexCorreo.test(correo)) errores.push("Correo electrónico inválido.");
    if (!regexEdad.test(edad)) errores.push("Edad debe contener solo números.");

    if (errores.length > 0) {
        resultado.innerHTML = `
            <div class="alert alert-danger">
                <ul>
                    ${errores.map(e => `<li>${e}</li>`).join("")}
                </ul>
            </div>`;
    } else {
        resultado.innerHTML = `
            <div class="alert alert-success">
                Toda la información es válida ✅
            </div>`;
    }
});
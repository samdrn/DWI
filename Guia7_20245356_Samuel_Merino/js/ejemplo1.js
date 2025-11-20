const newForm = document.getElementById("idNewForm");

const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");
const buttonValidar = document.getElementById("idBtnValidar");

const cmbElemento = document.getElementById("idCmbElemento");
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// Validacion de ID
function idExiste(id) {
    return document.getElementById(id) !== null;
}

const vericarTipoElemento = function () {
    let elemento = cmbElemento.value;
    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creará");
    }
};

// <select>
const newSelect = function () {
    let id = `id${nombreElemento.value}`;

    if (idExiste(id)) {
        alert("El ID ya existe. Debe usar uno diferente.");
        return;
    }

    let addElemento = document.createElement("select");
    addElemento.setAttribute("id", id);
    addElemento.setAttribute("class", "form-select");

    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opción ${i}`;
        addElemento.appendChild(addOption);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", id);
    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

// radio y checkbox
const newRadioCheckbox = function (newElemento) {
    let id = `id${nombreElemento.value}`;

    if (idExiste(id)) {
        alert("El ID ya existe. Debe usar uno diferente.");
        return;
    }

    let addElemento = document.createElement("input");
    addElemento.setAttribute("id", id);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", id);
    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-check");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

const newInput = function (newElemento) {
    let id = `id${nombreElemento.value}`;

    if (idExiste(id)) {
        alert("El ID ya existe. Debe usar uno diferente.");
        return;
    }

    let addElemento =
        newElemento == "textarea"
            ? document.createElement("textarea")
            : document.createElement("input");

    addElemento.setAttribute("id", id);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", id);

    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    labelElemento.textContent = tituloElemento.value;
    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating mb-3");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

// Validar form
function validarFormulario() {
    let controles = newForm.querySelectorAll("input, textarea, select");

    let errores = [];

    controles.forEach(ctrl => {
        let tipo = ctrl.type;
        let id = ctrl.id.replace("id", "");

        if (tipo === "text" || tipo === "number" || tipo === "password" ||
            tipo === "textarea" || tipo === "email") {

            if (ctrl.value.trim() === "") {
                errores.push(`El campo ${id} está vacío`);
            }

            if (tipo === "email" && ctrl.value.trim() !== "") {
                let exp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!exp.test(ctrl.value)) {
                    errores.push(`El email en ${id} no es válido`);
                }
            }
        }

        if (tipo === "radio") {
            let grupo = document.getElementsByName(ctrl.name);
            let seleccionado = [...grupo].some(r => r.checked);
            if (!seleccionado) errores.push(`Debe seleccionar una opción en ${id}`);
        }

        if (tipo === "checkbox") {
            if (!ctrl.checked) errores.push(`Debe marcar ${id}`);
        }

        if (ctrl.tagName === "SELECT") {
            if (ctrl.value === "") errores.push(`Debe seleccionar un valor en ${id}`);
        }

        if (tipo === "color") {
            if (ctrl.value === "") errores.push(`Debe seleccionar un color en ${id}`);
        }
    });

    if (errores.length > 0) {
        alert("Errores:\n\n" + errores.join("\n"));
    } else {
        alert("Formulario válido");
    }
}

buttonValidar.onclick = validarFormulario;

buttonCrear.onclick = vericarTipoElemento;

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        let elemento = cmbElemento.value;

        if (elemento == "select") newSelect();
        else if (elemento == "radio" || elemento == "checkbox") newRadioCheckbox(elemento);
        else newInput(elemento);

    } else {
        alert("Faltan campos por completar");
    }
};

document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});
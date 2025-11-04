const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
const numeroIntentos = 3;
let intentos = 1;

function generarNumeroAleatorio() {
    let mensaje;
    const parrafo = document.querySelector("#idParrafo");

    if (intentos <= numeroIntentos) {
        numero = prompt(
            "¿Qué número se ha generado (Intento " + intentos + ")?"
        );
        numero = parseInt(numero);

        if (numero == numeroAleatorio) {
            mensaje = `¡Felicidades! Has adivinado el número oculto (${numeroAleatorio}).
            Refresque la pagina para volver a jugar.`;
        } else if (intentos == numeroIntentos) {
            mensaje = `Su numero de intentos ha terminado.
            El número oculto era ${numeroAleatorio}.
            Refresque la pagina para jugar de nuevo.`;
        } else {
            if (numero < numeroAleatorio) {
                mensaje = `Intentalo de nuevo, el numero oculto es mas alto que ${numero}.
                Te quedan ${numeroIntentos - intentos} intentos.`;
            } else {
                mensaje = `Intentalo de nuevo, el numero oculto es mas bajo que ${numero}.
                Te quedan ${numeroIntentos - intentos} intentos.`;
            }
        }

        intentos++;
    } else {
        mensaje = `Su numero de intentos ha terminado.
        El número oculto era ${numeroAleatorio}.
        Refresque la pagina para jugar de nuevo.`;
    }

    parrafo.innerHTML = mensaje;
}

let modoActual = "inicio";

let paginaCarta = 0;

const paginas = [
    {
        texto: "Feliz cumpleaños, ma, se que esto no es un regalo enorme ni perfecto, pero quería hacer algo distinto, algo que pudieras recorrer y no solo leer...",
        imagen: "foto0.jpg"
    },
    {
        texto: "Gracias por estar incluso en los días donde todo parece más pesado, muchas veces no digo las cosas, pero sé todo lo que haces, incluso lo que nadie ve...",
        imagen: "foto1.jpg"
    },
    {
        texto: "Espero que hoy puedas descansar un poco, reírte bastante y sentirte querida, porque lo sos, muchísimo más de lo que probablemente imaginás...",
        imagen: "foto2.jpg"
    },
];

function validarFormulario() {
    const selector = document.getElementById("selectorCancion");
    const fecha = document.getElementById("fecha");
    const boton = document.getElementById("botonEnviar");

    if (!selector || !fecha || !boton) return;

    boton.disabled = !(selector.value && fecha.value.trim());
}

function iniciarMusica() {
    const selector = document.getElementById("selectorCancion");
    const reproductor = document.getElementById("reproductor");
    const musicaBox = document.getElementById("musicaBox");

    if (reproductor.src === "") {
        reproductor.src = selector.value;
        reproductor.play();
    }

    musicaBox.classList.add("oculto");
}

function mostrarSobre() {
    const contenido = document.getElementById("contenido");

    contenido.innerHTML = `
        <div class="sobreEmoji" onclick="abrirCarta()">
            💌
        </div>

        <p>Toca la carta</p>
    `;
}

function abrirCarta() {
    paginaCarta = 0;
    mostrarPaginaCarta();
}

function mostrarPaginaCarta() {
    const contenido = document.getElementById("contenido");

    const pagina = paginas[paginaCarta];

    contenido.innerHTML = `
        <div class="carta">

            <p>${pagina.texto}</p>

            ${
                pagina.imagen
                ? `<img src="${pagina.imagen}" class="imagenCarta">`
                : ""
            }

            ${
                paginaCarta < paginas.length - 1
                ? `<button class="botonCarta" onclick="siguientePagina()">Siguiente</button>`
                : `<h3>Te queremos mucho Ma</h3>`
            }

        </div>
    `;
}

function siguientePagina() {
    paginaCarta++;
    mostrarPaginaCarta();
}

function enviarConEspera(tiempo) {
    const contenido = document.getElementById("contenido");

    contenido.innerHTML = `<p></p>`;

    setTimeout(() => {
        mostrarSobre();
    }, tiempo);
}

function volverInicioDos() {
    modoActual = "reinicio";

    const contenido = document.getElementById("contenido");

    contenido.innerHTML = `
        <h1>Intenta otra vez</h1>

        <p>Escribe la fecha en formato día/mes</p>

        <input
            type="text"
            id="fecha"
            placeholder="dd/mm"
            oninput="validarReinicio()"
        >

        <button
            id="botonReinicio"
            onclick="verificarFechaReinicio()"
            disabled
        >
            Enviar
        </button>
    `;
}

function continuar() {
    modoActual = "inicio3";

    const contenido = document.getElementById("contenido");

    contenido.innerHTML = `
        <h1>Por favor pon tu fecha correcta para continuar</h1>

        <input
            type="text"
            id="fecha"
            placeholder="dd/mm"
            oninput="validarReinicio()"
        >

        <button
            id="botonReinicio"
            onclick="verificarFechaReinicio()"
            disabled
        >
            Enviar
        </button>
    `;
}

function validarReinicio() {
    const fecha = document.getElementById("fecha").value.trim();
    const boton = document.getElementById("botonReinicio");

    boton.disabled = !fecha;
}

function verificarFecha() {
    const fechaIngresada = document.getElementById("fecha").value.trim();
    const contenido = document.getElementById("contenido");

    iniciarMusica();

    if (fechaIngresada === "27/05") {

        enviarConEspera(2000);

    } else {

        contenido.innerHTML = `
            <h1>Muy mal</h1>

            <p>Cumples el 27/05</p>

            <button onclick="continuar()">
                Continuar
            </button>

            <button onclick="volverInicioDos()">
                Volver al inicio
            </button>
        `;
    }
}

function verificarFechaReinicio() {
    const fechaIngresada = document.getElementById("fecha").value.trim();
    const contenido = document.getElementById("contenido");

    if (fechaIngresada === "27/05") {

        if (modoActual === "reinicio") {

            enviarConEspera(10000);

        } else if (modoActual === "inicio3") {

            mostrarSobre();
        }

    } else {

        contenido.innerHTML = `
            <h1>Muy mal</h1>

            <p>Cumples el 27/05</p>

            <button onclick="continuar()">
                Continuar
            </button>

            <button onclick="volverInicioDos()">
                Volver al inicio
            </button>
        `;
    }
}
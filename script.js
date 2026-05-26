let estado = "inicio";
let pagina = 0;

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
    }
];

/* ---------------- VALIDACIÓN FECHA ---------------- */

function validarFormulario() {
    const fecha = document.getElementById("fecha");
    const boton = document.getElementById("botonEnviar");

    if (!fecha || !boton) return;

    boton.disabled = !fecha.value.trim();
}

function verificarFecha() {
    const fecha = document.getElementById("fecha").value.trim();
    const correcto = fecha === "27/05";

    if (!correcto) {
        document.getElementById("contenido").innerHTML = `
            <h1>Muy mal</h1>
            <p>Cumples el 27/05</p>

            <button onclick="reiniciar()">Volver</button>
        `;
        return;
    }

    mostrarSobre();
}

/* ---------------- SOBRE ---------------- */

function mostrarSobre() {
    estado = "sobre";

    const contenido = document.getElementById("contenido");

    contenido.innerHTML = `
        <div class="sobre" onclick="abrirSobre()">
            💌
        </div>
        <p>Toca la carta</p>
    `;
}

function abrirSobre() {
    estado = "animacion";

    const sobre = document.querySelector(".sobre");

    if (sobre) {
        sobre.classList.add("abriendo");
    }

    crearParticulas();

    setTimeout(() => {
        mostrarLibro();
    }, 900);
}

/* ---------------- PARTÍCULAS ---------------- */

function crearParticulas() {
    const contenedor = document.getElementById("contenido");

    for (let i = 0; i < 25; i++) {
        const p = document.createElement("div");

        p.className = "particula";
        p.style.left = Math.random() * 100 + "%";
        p.style.top = Math.random() * 100 + "%";

        contenedor.appendChild(p);

        setTimeout(() => {
            p.remove();
        }, 800);
    }
}

/* ---------------- LIBRO ---------------- */

function mostrarLibro() {
    estado = "libro";

    const contenido = document.getElementById("contenido");

    contenido.innerHTML = `
        <div class="libro">
            <div class="pagina" id="pagina">
                ${renderPagina()}
            </div>

            <button onclick="siguientePagina()">Siguiente</button>
        </div>
    `;
}

function renderPagina() {
    const p = paginas[pagina];

    return `
        <p>${p.texto}</p>
        ${p.imagen ? `<img src="${p.imagen}" class="imagenLibro">` : ""}
    `;
}

function siguientePagina() {
    if (pagina < paginas.length - 1) {
        pagina++;
        document.getElementById("pagina").innerHTML = renderPagina();
    } else {
        document.getElementById("pagina").innerHTML = `
            <h2>Te queremos mucho ❤️</h2>
        `;
    }
}

/* ---------------- REINICIO ---------------- */

function reiniciar() {
    location.reload();
}

function mostrarPaginaDoble(texto, imagen) {
    const contenido = document.getElementById("contenido");

    contenido.innerHTML = `
        <div class="paginaDoble">

            <div class="columnaTexto">
                <p>${texto}</p>
            </div>

            <div class="columnaImagen">
                <img src="${imagen}" style="width:100%; border-radius:12px;">
            </div>

        </div>
    `;
}

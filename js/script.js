// APIS que voy a utilizar:
// Mi API Key
const detect_api_key = "c5c94266037be2ffd8758bdf17e9a978"; 

// URL de la API de detección de idioma
const detect_url = "https://ws.detectlanguage.com/0.2/detect";

// URL de REST Countries
const country_api_base = "https://restcountries.com/v3.1/lang/";

// Array de frases para que el juego sea aleatorio
const frases = [
    "Bonjour mon ami", // Francés
    "Hello friend",    // Inglés
    "Hola amigo",      // Español
    "Ciao bella",      // Italiano
    "Bom dia",         // Portugués
    "Hallo Freund"     // Alemán
];
// Idiomas
const idiomas = {
    es: "español",
    en: "ingles",
    fr: "frances",
    de: "aleman",
    it: "italiano",
    pt: "portugues"
};

//Variables 
const fraseP = document.getElementById("frase");
const respuestaInput = document.getElementById("respuesta");
const resultadoP = document.getElementById("resultado");
const paisesDiv = document.getElementById("paises");
const galeriaGrid = document.getElementById("galeriaGrid");

//Variables de botones
const nuevaBtn = document.getElementById("nuevaFrase");
const comprobarBtn = document.getElementById("comprobar");

// Constante con imagenes
const imagenesPorIdioma = {
    es: "../assets/images/idioma_espanol.jpg",
    en: "../assets/images/idioma_ingles.jpg",
    fr: "../assets/images/idioma_frances.jpg",
    de: "../assets/images/idioma_aleman.jpg",
    it: "../assets/images/idioma_italiano.jpg",
    pt: "../assets/images/idioma_portugues.jpg"
};


//Funcion para generar una frase
function generarFrase() {
    const index = Math.floor(Math.random() * frases.length);
    fraseP.textContent = frases[index];
    resultadoP.textContent = "";
    paisesDiv.innerHTML = "";
    respuestaInput.value = "";
}
// Detecta el idioma usando DetectLanguage API
async function detectarIdioma(texto) {
    try {
        const response = await fetch(detect_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${detect_api_key}`
            },
            body: JSON.stringify({ q: texto })
        });

        if (!response.ok) return null;

        const data = await response.json();

        if (!data.data || data.data.detections.length === 0) {
            return null;
        }

        return data.data.detections[0].language;

    } catch (error) {
        console.error("Error detectando idioma:", error);
        return null;
    }
}
// Obtiene países donde se habla ese idioma con REST Countries API
async function obtenerPaisesPorIdioma(code) {
    try {
        const response = await fetch(`${country_api_base}${code}`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo países:", error);
        return null;
    }
}
//Funcion para mostrar la galería
function mostrarGaleria(idiomaCode) {
    galeriaGrid.innerHTML = "";

    const ruta = imagenesPorIdioma[idiomaCode];
    if (ruta) {
        const img = document.createElement("img");
        img.src = ruta;
        img.alt = "Imagen del idioma";

         img.classList.add("bandera"); 
        galeriaGrid.appendChild(img);
    };
}

// Comprueba la respuesta del usuario
async function comprobarRespuesta() {
    const frase = fraseP.textContent;
    const userAnswer = respuestaInput.value.trim().toLowerCase();
if (userAnswer === "") {
    resultadoP.textContent = "Escribe un idioma antes de comprobar.";
    return;
}

    if (!frase) {
        resultadoP.textContent = "Genera una frase primero.";
        return;
    }

    const detected = await detectarIdioma(frase);

    if (!detected || !idiomas[detected]) {
        resultadoP.textContent = "No se pudo detectar el idioma.";
        return;
    }

    const idiomaCorrecto = idiomas[detected];

    if (userAnswer === idiomaCorrecto) {
        resultadoP.textContent = "¡Correcto!";
    } else {
        resultadoP.textContent = `Incorrecto. El idioma es: ${idiomaCorrecto}`;
    }
 // Mostrar imagen del idioma
    mostrarGaleria(detected);
    // Mostrar países
    const paises = await obtenerPaisesPorIdioma(detected);

    if (paises && paises.length > 0) {
        paisesDiv.innerHTML = "<h3>Países donde se habla este idioma:</h3>";

        paises.forEach(pais => {
            const img = document.createElement("img");
            img.src = pais.flags.jpg;
            img.alt = pais.name.common;
            img.title = pais.name.common;
            img.classList.add("bandera");
            paisesDiv.appendChild(img);
        });
    } else {
        paisesDiv.textContent = "No se encontraron países para ese idioma.";
    }
}

// Eventos
nuevaBtn.addEventListener("click", generarFrase);
comprobarBtn.addEventListener("click",comprobarRespuesta);
// Genera una frase al cargar la página
generarFrase();


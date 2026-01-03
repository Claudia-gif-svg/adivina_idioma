// APIS que voy a utilizar:
// Mi API Key
const detect_api_key = "TU_API_KEY"; // reemplaza la real
// URL de la API de detección de idioma
const detect_url ="https://ws.detectlanguage.com/0.2/detect";

// URL de REST Countries
const country_api_base =  "https://restcountries.com/v3.1/lang/";

// Array de frases para que el juego sea aleatorio
const frases = [
    "Bonjour mon ami",
    "Hello friend",
    "Hola amigo",
    "Ciao bella",
    "Bom dia"
];

//Variables 
const fraseP = document.getElementById("frase");
const respuestaInput = document.getElementById("respuesta");
const resultadoP = document.getElementById("resultado");
const paisesDiv = document.getElementById("paises");
//Variables de botones
const nuevaBtn = document.getElementById("nuevaFrase");
const comprobarBtn = document.getElementById("comprobar");

//Funcion para generar una frase
function generarFrase(){
const index = Math.floor(Math.random() *frases.length);
fraseP.textContent = frases[index];
resultadoP.textContent= "";
paisesDiv.innerHTML="";
respuestaInput.value="";
}
// Detecta el idioma usando DetectLanguage API
async function detectarIdioma(texto) {
    const response = await fetch(detect_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${detect_api_key}`
        },
        body: JSON.stringify({ q: texto })
    });

    const data = await response.json();
    if (!data.data || data.data.detections.length === 0) {
        return null;
    }
    return data.data.detections[0].language; 
}

// Obtiene países donde se habla ese idioma con REST Countries API
async function obtenerPaisesPorIdioma(code) {
    const url = `${country_api_base}${code}`;
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    return data;
}
// Eventos
nuevaBtn.addEventListener("click",generarFrase);

// Genera una frase al cargar la página
generarFrase();
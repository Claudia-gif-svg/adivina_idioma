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

// Eventos
nuevaBtn.addEventListener("click",generarFrase);

// Genera una frase al cargar la página
generarFrase();
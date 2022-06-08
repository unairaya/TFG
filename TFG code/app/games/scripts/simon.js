import * as database from "../../scripts/database.js";

const opcionesWrapper = document.querySelector(".btn-container");
const resultsContainer = document.querySelector(".result-container");
const opciones = document.querySelectorAll(".opcion");
const state = document.querySelector(".state");
const btn = document.getElementById("btn");

let secuencia;
let tiempo;
let pulsaciones;
let turnoJugador;
let evaluando;
let puntuacion;

btn.addEventListener("click", () => {
  btn.innerText = "REINICIAR";
  resultsContainer.style.display = "none";
  opcionesWrapper.style.display = "flex";
  secuencia = [];
  tiempo = 1;
  turnoJugador = false;
  evaluando = 0;
  puntuacion = 0;
  añadirInstruccion();
});

opciones.forEach((opcion, index) => {
  opcion.addEventListener("click", () => comprobarRespuesta(index));
});

function añadirInstruccion() {
  secuencia.push(parseInt(Math.random() * 5));
  mostrarSecuencia();
}

async function mostrarSecuencia() {
  for (let i = 0; i < secuencia.length; i++) {
    await delay(tiempo);
    const pulsacion = secuencia[i];
    opciones[pulsacion].classList.add("celeste");
    await delay(tiempo);
    opciones[pulsacion].classList.remove("celeste");
    await delay(tiempo);
  }
  turnoJugador = true;
  state.innerText = "Su turno";
}

async function comprobarRespuesta(opcion) {
  if (!turnoJugador) return;
  if (opcion != secuencia[evaluando]) {
    opciones[opcion].classList.add("rojo");
    await delay(0.1);
    opciones[opcion].classList.remove("rojo");
    mostrarResultados();
  } else {
    opciones[opcion].classList.add("verde");
    await delay(0.1);
    opciones[opcion].classList.remove("verde");
    evaluando++;
    if (secuencia.length == evaluando) {
      puntuacion++;
      evaluando = 0;
      tiempo = tiempo > 0.4 ? tiempo - 0.1 : 0.4;
      turnoJugador = false;
      state.innerText = "Memorice la secuencia";
      añadirInstruccion();
    }
  }
}

function mostrarResultados() {
  const points = puntuacion * 3;
  document.querySelector(
    ".results"
  ).innerText = `Tu puntuación: ${puntuacion}\n Puntos obtenidos: ${points}`;
  state.innerText = "RESULTADOS";
  resultsContainer.style.display = "flex";
  opcionesWrapper.style.display = "none";
  database.startDB(false, () => database.addPoints(points));
}

function delay(n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 1000);
  });
}

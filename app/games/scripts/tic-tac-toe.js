// constantes y variables
import * as database from "../../scripts/database.js";
const gameContainer = document.querySelector(".game-container");
const tablero = [];

let turno = 0;

// funcionamiento juego
document
  .querySelectorAll(".opcion-tablero")
  .forEach((opcion, index) =>
    opcion.addEventListener("click", (event) => dibujar(event, index))
  );

const dibujar = (event, pos) => {
  if (turno % 2) return;
  if (
    event.target.classList.contains("o") ||
    event.target.classList.contains("x")
  )
    return;
  event.target.classList.add("x");
  tablero[pos] = "x";
  turno++;
  if (!comprobarVictoria()) return;

  let casillaRandom = parseInt(Math.random() * 9);
  while (turno % 2) {
    if (!tablero[casillaRandom]) {
      tablero[casillaRandom] = "o";
      document.getElementById(casillaRandom).classList.add("o");
      turno++;
    } else casillaRandom == 8 ? (casillaRandom = 0) : casillaRandom++;
  }
  comprobarVictoria();
};
const mensajeDerrota = document.getElementById("mensaje-derrota");

const comprobarVictoria = () => {
  let resultado;
  if (tablero[0] && tablero[0] == tablero[1] && tablero[0] == tablero[2])
    resultado = tablero[0];
  else if (tablero[3] && tablero[3] == tablero[4] && tablero[3] == tablero[5])
    resultado = tablero[3];
  else if (tablero[6] && tablero[6] == tablero[7] && tablero[6] == tablero[8])
    resultado = tablero[6];
  else if (tablero[0] && tablero[0] == tablero[3] && tablero[0] == tablero[6])
    resultado = tablero[0];
  else if (tablero[1] && tablero[1] == tablero[4] && tablero[1] == tablero[7])
    resultado = tablero[1];
  else if (tablero[2] && tablero[2] == tablero[5] && tablero[2] == tablero[8])
    resultado = tablero[2];
  else if (tablero[0] && tablero[0] == tablero[4] && tablero[0] == tablero[8])
    resultado = tablero[0];
  else if (tablero[2] && tablero[2] == tablero[4] && tablero[2] == tablero[6])
    resultado = tablero[2];
  else if (
    tablero[0] &&
    tablero[1] &&
    tablero[2] &&
    tablero[3] &&
    tablero[4] &&
    tablero[5] &&
    tablero[6] &&
    tablero[7] &&
    tablero[8]
  )
    resultado = "empate";
  switch (resultado) {
    case "x":
      victoria();
      break;
    case "o":
      document.getElementById("mensaje-derrota").style.display = "flex";
      break;
    case "empate":
      document.getElementById("mensaje-empate").style.display = "flex";
      break;
    default:
      return true;
  }
};

document
  .querySelectorAll(".resultado-btn")
  .forEach((btn) => btn.addEventListener("click", () => location.reload()));

const victoria = () => {
  const mensajeVictoria = document.getElementById("mensaje-victoria");
  mensajeVictoria.style.display = "flex";
  database.startDB(false, () => database.addPoints(5));
};

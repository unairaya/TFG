// dibujar tablero
const gameContainer = document.querySelector('.game-container')
for(let i = 0; i < 9; i++){
    let div = document.createElement('div')
    div.classList.add('opcion-tablero')
    div.id = i
    div.addEventListener('click', seleccionarCasilla(div.id))
    gameContainer.appendChild(div)
}

// funcionamiento juego
let turnoJugador = true
const casillasSeleccionadas = []

function seleccionarCasilla(id){
    const casilla = document.getElementById(id)
    if(!casilla.classList.contains('selected') && turnoJugador){
        casilla.classList.add('selected')
        casilla.classList.add('x')
        turnoJugador = false
        while(!turnoJugador){
            
        }
    }
}

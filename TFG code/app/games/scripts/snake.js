import * as database from '../../scripts/database.js'

document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container')
    for (let i = 0; i < 100; i++) gameContainer.appendChild(document.createElement('div'))
    const casillas = document.querySelectorAll('.game-container div')
    const state = document.querySelector('.state')
    const btn = document.querySelector('.btn')

    const tamaño = 10
    let currentIndex = 0
    let appleIndex = 0
    let currentSnake = [2, 1, 0]
    let direccion = 1
    let puntuacion = 0
    let velocidad = 0.9
    let intervalTime = 0
    let interval = 0


    function iniciarJuego() {
        btn.innerText = 'Reiniciar'
        gameContainer.style.display = 'flex'
        currentSnake.forEach(index => casillas[index].classList.remove('snake'))
        casillas[appleIndex].classList.remove('manzana')
        clearInterval(interval)
        puntuacion = 0
        state.innerText = `Puntuación: ${puntuacion}`
        direccion = 1
        intervalTime = 1000
        currentSnake = [2, 1, 0]
        currentIndex = 0
        currentSnake.forEach(index => casillas[index].classList.add('snake'))
        randomApple()
        interval = setInterval(movimiento, intervalTime)
    }


    function movimiento() {

        if (
            (currentSnake[0] + tamaño >= (tamaño * tamaño) && direccion === tamaño) ||
            (currentSnake[0] % tamaño === tamaño - 1 && direccion === 1) ||
            (currentSnake[0] % tamaño === 0 && direccion === -1) ||
            (currentSnake[0] - tamaño < 0 && direccion === -tamaño) ||
            casillas[currentSnake[0] + direccion].classList.contains('snake')
        ) {
            clearInterval(interval)
            return mostrarResultados()
        }

        const cola = currentSnake.pop()
        casillas[cola].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direccion)

        if (casillas[currentSnake[0]].classList.contains('manzana')) {
            casillas[currentSnake[0]].classList.remove('manzana')
            casillas[cola].classList.add('snake')
            currentSnake.push(cola)
            randomApple()
            puntuacion++
            state.innerText = `Puntuación: ${puntuacion}`
            clearInterval(interval)
            intervalTime = intervalTime * velocidad
            interval = setInterval(movimiento, intervalTime)
        }
        casillas[currentSnake[0]].classList.add('snake')
    }


    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * casillas.length)
        } while (casillas[appleIndex].classList.contains('snake'))
        casillas[appleIndex].classList.add('manzana')
    }


    function cambioDireccion(e) {
        casillas[currentIndex].classList.remove('snake')

        if (e.keyCode === 39) {
            direccion = 1
        } else if (e.keyCode === 38) {
            direccion = -tamaño
        } else if (e.keyCode === 37) {
            direccion = -1
        } else if (e.keyCode === 40) {
            direccion = +tamaño
        }
    }

    function mostrarResultados() {
        gameContainer.style.display = 'none'
        database.startDB(false, () => database.addPoints(puntuacion * 2))
    }

    document.addEventListener('keyup', cambioDireccion)
    btn.addEventListener('click', iniciarJuego)
})
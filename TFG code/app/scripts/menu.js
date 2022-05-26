// menu lateral
const navBtn = document.querySelector('.nav-button')
const targets = document.querySelectorAll('.target')

navBtn.addEventListener('click', () => {
    targets.forEach(element => {
        element.classList.toggle('change')
    });
})

// galeria de juegos
const gamesWrapper = document.getElementById('games-wrapper')


// indexedDB
import * as database from './database.js'

database.startDB(false, getUser)
function getUser() {
    database.getUser('true', cargarPagina, true)
}



// cargar los juegos en el menu en base a los puntos del usuario
import juegosJson from './juegos.json' assert {type: 'json'}

function cargarPagina(user) {
    let userPoints = user.points
    let contenido
    let juegosCargados = 0

    juegosJson.juegos.forEach(game => {
        if (game.points <= userPoints) {
            crearJuego(game.preview, 'preview')
        } else {
            let restPoints = game.points - userPoints
            crearJuego(juegosJson.locked, 'locked', restPoints)
        }
        juegosCargados++
    });

    for (let i = 0; i < 9 - juegosCargados; i++) {
        crearJuego(juegosJson.soon, 'soon')
    }
}

function crearJuego(selector, tipo, points) {
    const div = document.createElement('div')
    selector.div.class.forEach(clase => div.classList.add(clase))
    if (tipo === 'preview') div.id = selector.div.id
    if (tipo !== 'soon') {
        const img = document.createElement('img')
        img.src = selector.img.src
        img.alt = selector.img.alt
        img.classList.add(selector.img.class) 
        div.appendChild(img)
    }
    const h3 = document.createElement('h3')
    selector.h3.class.forEach(clase => h3.classList.add(clase))
    h3.innerText = selector.h3.innerText
    if(tipo === 'locked') h3.innerText += points
    div.appendChild(h3)
    if (tipo === 'preview'){
        div.addEventListener('click', () => {cargarJuego(div.id)})
    }
    gamesWrapper.appendChild(div)
}

function cargarJuego(juegoId){
    window.open(`./juego.html?id=${juegoId}`, '_self')
}
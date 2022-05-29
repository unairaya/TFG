// menu lateral
const navBtn = document.querySelector('.nav-button')
const targets = document.querySelectorAll('.target')

navBtn.addEventListener('click', () => {
    targets.forEach(element => {
        element.classList.toggle('change')
    });
})

// cargar juego
const urlParams = new URLSearchParams(window.location.search)
import juegosJson from './juegos.json' assert {type: 'json'}
juegosJson.juegos.forEach(juego => {
    if (juego.preview.div.id == urlParams.get('id')){
        document.querySelector('.game-description-text').innerText = juego.description
        document.querySelector('.game-container iframe').src = juego.app
    }
})

// menu lateral
const navBtn = document.querySelector('.nav-button')
const targets = document.querySelectorAll('.target')

navBtn.addEventListener('click', ()=>{
    targets.forEach(element => {
        element.classList.toggle('change')
    });
})

// galeria de juegos
const gamesWrapper = document.getElementById('games-wrapper')


// indexedDB
// inicializar db
const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
let db
let userPoints
indexedDB.open('database').onsuccess = function (e) {
	db = e.target.result
    db.transaction('users').objectStore('users').index('actual').get('true').onsuccess = function(e){
        if (e.target.result != undefined){
            userPoints = e.target.result.points
            cargarPagina()
        } else alert('No se pudo recuperar sus datos, por favor recarge la página')
    }
}

// cargar los juegos en el menu en base a los puntos del usuario
import juegosJson from './juegos.json' assert {type: 'json'}
function cargarPagina(){
    
    let contenido = ''
    let juegosCargados = 0

    juegosJson.juegos.forEach(game => {
        if(game.points <= userPoints){
            contenido += game.preview + '\n'
        } else {
            let restPoints = game.points - userPoints
            contenido += juegosJson.locked1 + restPoints + juegosJson.locked2
        }
        juegosCargados++
    });

    for(let i = 0; i < 9 - juegosCargados; i++){
        contenido += juegosJson.soon + '\n'
    }

    gamesWrapper.innerHTML = contenido
}
const botones = document.querySelectorAll('.boton')
const state = document.querySelector('state')

let secuencia
let tiempo = 500
let pulsaciones = 5
let turnoJugador = false
crearSecuencia()

function crearSecuencia(){
    secuencia = []
    for(let i = 0; i < pulsaciones; i++){
        secuencia.push(parseInt(Math.random() * 5))
    }
    mostrarSecuencia()
}

async function mostrarSecuencia(){
    secuencia.forEach(pulsacion => {
        await setTimeout(() => {
            botones[pulsacion].classList.add('pulsado')
            setTimeout(() => {
                botones[pulsacion].classList.remove('pulsado')
            }, tiempo);
        }, tiempo);
    });
}
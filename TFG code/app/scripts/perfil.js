// menu lateral
const navBtn = document.querySelector('.nav-button')
const targets = document.querySelectorAll('.target')

navBtn.addEventListener('click', () => {
    targets.forEach(element => {
        element.classList.toggle('change')
    });
})

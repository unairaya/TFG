// constantes de la página
// universales
const html = document.querySelector("html");
const body = document.querySelector("body");
const main = document.querySelector("main");
// animacion inicio
const inicio = document.getElementById("inicio");
const colorArray = ["#fff", "#f00", "#0f0", "#ff0", "#f0f", "#0ff"];
// menús inicio de sesion y registro
const identifyContainer = document.getElementById("identify-container");
const loginContainer = document.getElementById("login");
const registerContainer = document.getElementById("register");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const loadLogin = document.getElementById("load-login");
const loadRegister = document.getElementById("load-register");
const toasts = document.getElementById("toasts");
const notificaciones = [
	"Rellene todos los campos",
	"Usuario o contraseña incorrectos",
	"Usuario ya existente",
	"Contraseña mínimo 8 caractéres",
	"Las contraseñas no coinciden",
];

// variables de la página
let colorIndex = 0;
let totalUsers;
let loginUsername;
let loginPassword;
let registerUsername;
let registerPassword1;
let registerPassword2;

// eventos
// inicio
setTimeout(() => {
	inicio.style.transform = "scale(1)";
}, 1);

const cambioColor = setInterval(() => {
	inicio.style.color = colorArray[colorIndex];
	colorIndex = colorIndex < colorArray.length ? colorIndex + 1 : 0;
}, 1000);

const subrayado = setInterval(() => {
	inicio.classList.toggle("underline");
}, 500);

inicio.addEventListener("click", () => {
	inicio.style.display = "none";
	setTimeout((identifyContainer.style.display = "flex")), 1000;
	clearInterval(cambioColor);
	clearInterval(subrayado);
});


// cambio entre menus
loadRegister.addEventListener("click", () => {
	loginContainer.style.left = "-100%";
	registerContainer.style.left = "0";
});

loadLogin.addEventListener("click", () => {
	loginContainer.style.left = "0";
	registerContainer.style.left = "100%";
});

// iniciar sesion
loginBtn.addEventListener("click", () => {
	const loginUsername = document.getElementById("login-username").value;
	const loginPassword = document.getElementById("login-password").value;
	if (!loginUsername || !loginPassword) {
		mostrarNotificacion(0);
		return
	}
	login(loginUsername, loginPassword)
});

// registrar usuario
registerBtn.addEventListener("click", () => {
	const registerUsername = document.getElementById("register-username").value;
	const registerPassword1 = document.getElementById("register-password1").value
	const registerPassword2 = document.getElementById("register-password2").value
	if (!registerUsername || !registerPassword1 || !registerPassword2) {
		mostrarNotificacion(0);
		return
	}
	if (registerPassword1.length < 8) {
		mostrarNotificacion(3)
		return
	}
	if (registerPassword1 !== registerPassword2) {
		mostrarNotificacion(4)
		return
	}
	register(registerUsername, registerPassword1)
});


// notificaciones
function mostrarNotificacion(notificacion) {
	const notif = document.createElement("div");
	if (notif) {
		notif.classList.add("toast");
		notif.innerText = notificaciones[notificacion];
		toasts.appendChild(notif);
		setTimeout(() => {
			notif.remove();
		}, 2000);
	}
}

// indexedDB
// inicializar db
const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
let db
let request = indexedDB.open('database')
request.onupgradeneeded = function (e) {
	db = e.target.result
	let objectStore = db.createObjectStore('users', { keyPath: 'username' })
	objectStore.createIndex('actual', 'actual')
}
request.onsuccess = function (e) {
	db = e.target.result
	let objectStore = db.transaction('users', 'readwrite').objectStore('users')
	objectStore.index('actual').get('true').onsuccess = function (e) {
		if (e.target.result != undefined) {
			let data = e.target.result
			data.actual = 'false'
			objectStore.put(data)
		}
	}
}

// recuperar usuario de la db
function login(username, password) {
	let objectStore = db.transaction('users', 'readwrite').objectStore('users')
	objectStore.get(username).onsuccess = function (e) {
		if(e.target.result != undefined){
			if (e.target.result.password === password) {
				let data = e.target.result
				data.actual = 'true'
				objectStore.put(data)
				window.open("./juegos/menu.html", "_self");
			} else mostrarNotificacion(1)
		} else mostrarNotificacion(1)
	}
}

// registrar usuario en la db
function register(registerUsername, registerPassword) {
	let objectStore = db.transaction('users', 'readwrite').objectStore('users')
	let getRequest = objectStore.get(registerUsername)
	getRequest.onsuccess = function(e){
		console.log(e.target.result)
		if (e.target.result == undefined) {
			let user = {
				username: registerUsername,
				password: registerPassword,
				actual: 'true',
				points: 0
			}
			objectStore.add(user).onsuccess = function (e) {
				window.open("./juegos/menu.html", "_self");
			}
		} else mostrarNotificacion(2)
	}
}

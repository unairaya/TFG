// constantes de la página
// generales
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
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginUsername = document.getElementById("login-username").value;
  loginPassword = document.getElementById("login-password").value;
  if (!loginUsername || !loginPassword) {
    mostrarNotificacion(0);
    return;
  }
  database.getUser(loginUsername, login);
});

function login(user) {
  console.log(user);
  if (user) {
    console.log(user.password, loginPassword);
    if (user.password == loginPassword) {
      database.setActual(loginUsername);
      window.open("./menu.html", "_self");
    } else mostrarNotificacion(1);
  } else mostrarNotificacion(1);
}

// registrar usuario
registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  registerUsername = document.getElementById("register-username").value;
  registerPassword1 = document.getElementById("register-password1").value;
  registerPassword2 = document.getElementById("register-password2").value;
  if (!registerUsername || !registerPassword1 || !registerPassword2) {
    mostrarNotificacion(0);
    return;
  }
  if (registerPassword1.length < 8) {
    mostrarNotificacion(3);
    return;
  }
  if (registerPassword1 !== registerPassword2) {
    mostrarNotificacion(4);
    return;
  }
  database.registerUser(registerUsername, registerPassword1, register);
});

function register(registerOK) {
  if (registerOK) window.open("./menu.html", "_self");
  else mostrarNotificacion(2);
}

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
import * as database from "./database.js";
try {
  database.startDB(true);
} catch (error) {
  console.log(error);
}

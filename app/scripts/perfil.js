// menu lateral
const navBtn = document.querySelector(".nav-button");
const targets = document.querySelectorAll(".target");

navBtn.addEventListener("click", () => {
  targets.forEach((element) => {
    element.classList.toggle("change");
  });
});

// mostrar datos del usuario
import * as database from "../scripts/database.js";

const username = document.getElementById("username");
const userPoints = document.getElementById("userPoints");

database.startDB(false, () => database.getUser("true", mostrarDatos, true));

const mostrarDatos = (usuario) => {
  username.innerText = usuario.username;
  userPoints.innerText = usuario.points;
};

// cambio de contraseña
const changePasswordContainer = document.querySelector(".changePassword");
const mostrarChangePassword = document.getElementById("mostrarChangePassword");
const cambiar = document.getElementById("cambiar");
const cancelar = document.getElementById("cancelar");
const toasts = document.getElementById("toasts");
const notificaciones = [
  "Rellene todos los campos",
  "Contraseña mínimo 8 caractéres",
  "Las contraseñas no coinciden",
  "Contraseña actual incorrecta",
  "La contraseña nueva no puede ser igual a la anterior"
];

mostrarChangePassword.addEventListener(
  "click",
  () => (changePasswordContainer.style.display = "flex")
);
cancelar.addEventListener(
  "click",
  () => (changePasswordContainer.style.display = "none")
);
cambiar.addEventListener("click", cambiarContraseña);

function cambiarContraseña(e) {
  e.preventDefault();
  const oldPassword = document.getElementById("old-password").value;
  const newPassword1 = document.getElementById("new-password-1").value;
  const newPassword2 = document.getElementById("new-password-2").value;
  if (!oldPassword || !newPassword1 || !newPassword2) {
    mostrarNotificacion(0);
    return;
  }
  if (newPassword1 !== newPassword2) {
    mostrarNotificacion(2);
    return;
  }
  if (newPassword1.length < 8) {
    mostrarNotificacion(1);
    return;
  }
  database.getUser(
    "true",
    (user) => {
      if (oldPassword != user.password) {
        mostrarNotificacion(3);
        return;
      }
      if (oldPassword == newPassword1) {
        mostrarNotificacion(4);
        return;
      }
      database.changePassword(newPassword1, () =>
        window.open("./perfil.html", "_self")
      );
    },
    true
  );
}

// mostrar notificaciones
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

let db;

function startDB(reset, callback = function () {}) {
  const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;
  let request = indexedDB.open("database");
  request.onupgradeneeded = function (e) {
    db = e.target.result;
    let objectStore = db.createObjectStore("users", { keyPath: "username" });
    objectStore.createIndex("actual", "actual");
  };

  request.onsuccess = function (e) {
    db = e.target.result;
    if (reset) {
      try {
        resetActual();
      } catch (error) {
        console.log(error);
      }
    }
    callback();
  };
  request.onerror = () => {
    throw "Error al cargar base de datos";
  };
}

function getUser(search, callback, index = null) {
  let objectStore = db.transaction("users", "readwrite").objectStore("users");
  let busqueda;
  !index ? (busqueda = objectStore) : (busqueda = objectStore.index("actual"));
  const getRequest = busqueda.get(search);
  getRequest.onsuccess = function (e) {
    if (e.target.result != undefined) {
      callback(e.target.result);
    } else callback(false);
  };
  getRequest.onerror = () => {
    throw "Error al recuperar el usuario";
  };
}

function registerUser(username, password, callback) {
  let objectStore = db.transaction("users", "readwrite").objectStore("users");
  let getRequest = objectStore.get(username);
  getRequest.onsuccess = function (e) {
    if (e.target.result == undefined) {
      let user = {
        username: username,
        password: password,
        actual: "true",
        points: 0,
      };
      const addRequest = objectStore.add(user);

      addRequest.onerror = () => {
        throw "Error al registrar usuario";
      };
      addRequest.onsuccess = () => {
        callback(true);
      };
    } else callback(false);
  };
  getRequest.onerror = () => {
    throw "Error al recuperar usuario";
  };
}

function setActual(username) {
  let objectStore = db.transaction("users", "readwrite").objectStore("users");
  const getRequest = objectStore.get(username);
  getRequest.onsuccess = function (e) {
    if (e.target.result != undefined) {
      let data = e.target.result;
      data.actual = "true";
      objectStore.put(data);
      return true;
    } else return false;
  };
  getRequest.onerror = () => {
    throw "Error al recuperar usuario";
  };
}

function addPoints(points) {
  let objectStore = db.transaction("users", "readwrite").objectStore("users");
  const getRequest = objectStore.index("actual").get("true");
  getRequest.onsuccess = function (e) {
    if (e.target.result != undefined) {
      let data = e.target.result;
      data.points += points;
      objectStore.put(data);
    } else throw "No se pudo recuperar el usuario actual";
  };
  getRequest.onerror = () => {
    throw "Error al recuperar usuario";
  };
}

function changePassword(newPassword, callback) {
  let objectStore = db.transaction("users", "readwrite").objectStore("users");
  const getRequest = objectStore.index("actual").get("true");
  getRequest.onsuccess = function (e) {
    if (e.target.result != undefined) {
      let data = e.target.result;
      data.password = newPassword;
      objectStore.put(data);
      callback();
    } else throw "No se pudo recuperar el usuario actual";
  };
  getRequest.onerror = () => {
    throw "Error al recuperar usuario";
  };
}

function resetActual() {
  let objectStore = db.transaction("users", "readwrite").objectStore("users");
  const getRequest = objectStore.index("actual").get("true");
  getRequest.onsuccess = function (e) {
    if (e.target.result != undefined) {
      let data = e.target.result;
      data.actual = "false";
      objectStore.put(data);
    } else throw "No se pudo recuperar el usuario actual";
  };
  getRequest.onerror = () => {
    throw "Error al recuperar usuario";
  };
}

export {
  startDB,
  getUser,
  registerUser,
  setActual,
  resetActual,
  addPoints,
  changePassword,
};

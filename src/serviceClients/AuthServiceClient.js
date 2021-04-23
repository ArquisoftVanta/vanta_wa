const axios = require("axios");
const environment = require("./../environment.js");
const route = environment.serverUrl + "/api/user";
const path = environment.serverUrl;
function registerUser(user, callback) {
  axios
    .post(route + "/signup", user)
    .then((response) => {
      console.log(route + "/signup");
      callback(response.status);
    })
    .catch(function(error) {
      console.log(error);
      callback(error.status);
    });
}

function loginUser(user, callback, showtoast) {
  axios
    .post(
      path + "/oauth/token",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          username: user.userMail,
          password: user.password,
          grant_type: "password",
        },
        auth: {
          username: "wheels-us",
          password: "dragonfly-software",
        },
      }
    )
    .then((response) => {
      if (response.status !== 200) {
        showtoast("Error en la Autenticación");
      } else {
        localStorage.setItem("token", response.data.access_token);
        callback();
      }
    })
    .catch((error) => {
      if (error.response.status === 400) {
        showtoast("Datos de Ingreso Invalidos");
      }
    });
}

function setUserLogged() {}

function getUserLogged() {}

export default {
  registerUser,
  loginUser,
  setUserLogged,
  getUserLogged,
};

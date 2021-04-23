const axios = require("axios");
const environment = require("./../environment.js");
const route = environment.serverUrl + "/api/user";

function getUser(callback) {
  axios
    .get(route + "/profile", {
      params: {
        access_token: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      callback(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function getFastProfile(email, callback){
  axios
  .get(route + "/fast-profile", {
    params: {
      access_token: localStorage.getItem("token"),
      userMail: email
    },
  })
  .then((response) => {
    callback(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });
}

function createUser(user, callback) {
  axios
    .post(route, user)
    .then((response) => {
      callback(response.status);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function updateUser(user, callback) {
  axios
    .put(route + "/profile", user, {
      params: {
        access_token: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      callback(response.status);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function deleteUser(id, callback) {
  axios
    .delete(`${route}${id}`)
    .then((response) => {
      callback(response.status);
    })
    .catch(function(error) {
      console.log(error);
    });
}

export default {
  getUser,
  getFastProfile,
  createUser,
  updateUser,
  deleteUser,
};

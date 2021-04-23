const axios = require("axios");
const environment = require("./../environment.js");
const route = environment.serverUrl + "/api/vehicle/";
/*function getVehicles(callback) {
  axios
    .get(route)
    .then((response) => {
      callback(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}*/

function getVehicles(callback) {
  axios
    .get(route + "show-vehicles", {
      params: {
        access_token: localStorage.getItem("token")
      }
    })
      .then(response => {
        callback(response);
      })
      .catch(function (error) {
        console.log(error);      
      });
}

function createVehicle(vehicle, callback) {
  axios
    .post(route, vehicle)
    .then((response) => {
      callback(response.status);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function updateVehicle(vehicle, callback) {
  axios
    .put(route + "update-vehicle", vehicle, {
      params: {
        access_token: localStorage.getItem("token"),
      },
    })
    .then(response => {
      callback(response.status);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function deleteVehicle(id, callback) {
  axios
    .delete(`${route}${id}`)
    .then((response) => {
      callback(response.status);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default {
  getVehicles,
  //getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};

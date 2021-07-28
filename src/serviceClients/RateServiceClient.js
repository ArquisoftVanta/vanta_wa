const axios = require("axios");
const environment = require("./../environment.js");
const route = environment.serverUrl + "/api/rate";

function getRate(userEmail, callback) {
  axios
    .get(route, {
      params: {
        access_token: localStorage.getItem("token"),
        userEmail: userEmail,
      },
    })
    .then((response) => {
      callback(response.data.rating);
    })
    .catch(function(error) {
      console.log(error);
    });
}
function createRate(rate, callback) {
  axios
    .post(route, rate)
    .then(() => {
      callback();
    })
    .catch(function(error) {
      console.log(error);
    });
}

export default {
  getRate,
  createRate,
};

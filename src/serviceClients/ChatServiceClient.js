const axios = require("axios");
//const environment = require("./../environment.js");
const route = "http://localhost:8600"+"/conv";

function getConversations(callback, email) {
  axios
    .get(route + "/" + email, {
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

export default{
    getConversations
}
const axios = require("axios");
//const environment = require("./../environment.js");
const route = "https://localhost:8600" + "/conv";

function getConversationsList(email, callback) {
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

function getConversation(email, convId, callback) {
  axios
    .get(route + "/" + email + "/" + convId, {
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

function sendMessage(convId, userId, content, callback) {
  axios
    .put(
      route,
      { convId: convId, userId: userId, content: content },
      {
        params: {
          access_token: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      callback(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

export default {
  getConversationsList,
  getConversation,
  sendMessage,
};

const axios = require("axios");
const environment = require("./../environment.js");
const route = environment.apiUrl;

function getConversationsList(email, callback) {
  axios({
    method: "POST",
    url: route,
    data: {
      query: `{
      chatByUser(user_id: "${email}"){
      _id,
      user1,
      user2,
      active,
      }
    }`,
    },
  })
    .then((response) => {
      callback(response.data.data.chatByUser);
    })
    .catch(function() {});
}

function getConversation(email, convId, callback) {
  axios({
    method: "POST",
    url: route,
    data: {
      query: `{
        chatById(user_id: "${email}", chat_id: "${convId}"){
          _id,
          user1,
          user2,
          active,
          conversation{
            sender,
            content,
            createdAt
          }
        }
      }`,
    },
  })
    .then((response) => {
      callback(response.data.data.chatById);
    })
    .catch(function() {});
}

function sendMessage(convId, userId, content, callback) {
  axios({
    method: "POST",
    url: route,
    data: {
      query: `mutation{
        sendMessage(msg: {convId: "${convId}", userId:"${userId}", content: "${content}"}){
          _id,
          sender,
          content
        }
      }`,
    },
  })
    .then((response) => {
      callback(response.data.data.sendMessage);
    })
    .catch(function() {});
}

export default {
  getConversationsList,
  getConversation,
  sendMessage,
};

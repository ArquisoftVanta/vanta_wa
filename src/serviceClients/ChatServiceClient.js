const axios = require("axios");
const route2 = "https://localhost:4100/graphql";

function getConversationsList(email, callback) {
  axios({
    method: "POST",
    url: route2,
    data: {
      query: `{
      chatByUser(user_id: "${email}"){
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
      callback(response.data.data.chatByUser);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function getConversation(email, convId, callback) {
  axios({
    method: "POST",
    url: route2,
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
      console.log(response);
      callback(response.data.data.chatById);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function sendMessage(convId, userId, content, callback) {
  axios({
    method: "POST",
    url: route2,
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
    .catch(function(error) {
      console.log(error);
    });
}

export default {
  getConversationsList,
  getConversation,
  sendMessage,
};

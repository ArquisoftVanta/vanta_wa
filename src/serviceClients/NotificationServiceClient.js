const axios = require("axios");
//const environment = require("./../environment.js");
//const route = environment.serverUrl + "/api/notification";
const route = "https://localhost:4100/graphql";

function getNotification(callback) {
    axios
        .post(route, {
            query: `  
      {
        getNotifications (token: "${localStorage.getItem("token")}"){
        direction
        message
        user_email
        created_at{
          _seconds
          _nanoseconds
        }
        notification_id
        viewed
      }
    }`
        })
        .then((response) => {
            callback(response.data.data.getNotifications);
        })
        .catch(function(error) {
            console.log(error);
        });
}

function createNotification(notification, callback) {
    axios
        .post(route, {
            query: `mutation {
        createNotification (notification:{
          direction: "${notification.direction}",
          message: "${notification.message}",
          token: "${localStorage.getItem("token")}",
          viewed: ${notification.viewed}
        }){
          notification_id
        }
      }`
        })
        .then((response) => {
            callback(response.status);
        })
        .catch(function(error) {
            console.log(error);
        });
}

function updateNotification(notification_id, callback) {
    axios
        .post(route, {
            query: `mutation{
        updateNotification(notification_id:"${notification_id}"){
          viewed
        }
      }`
        })
        .then((response) => {
            callback(response.status);
        })
        .catch(function(error) {
            console.log(error);
        });
}

function deleteNotification(notification_id, callback) {
    axios
        .delete(route, {
            query: `mutation{
        deleteNotification(notification_id: "${notification_id}"){
          notification_id
        }
      }`
        })
        .then((response) => {
            callback(response.status);
        })
        .catch(function(error) {
            console.log(error);
        });
}

export default {
    getNotification,
    createNotification,
    updateNotification,
    deleteNotification,
};
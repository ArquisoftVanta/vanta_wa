const axios = require("axios");
const environment = require("./../environment.js");
const route = environment.serverUrl + "/api/favorite-direction";

function addDirection(direction, callback) {
    axios
        .post(route + "/new-direction", direction, {
            params: {
                access_token: localStorage.getItem("token"),
            },
        })
        .then((response) => {
            callback(response.status);
        })
        .catch(function(error) {
            callback(error);
        });
}

function getDirectionsByUser(callback) {
    axios
        .get(route + "/show-directions", {
            params: {
                access_token: localStorage.getItem("token"),
            },
        })
        .then((response) => {
            if (response.status !== 200) {
                callback("Error");
            } else {
                callback(response.data);
            }
        })
        .catch((error) => {
            callback(error);
        });
}

function deleteDirection(id, callback) {
    axios
        .post(route + "/delete-direction", id, {
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

export default {
    addDirection,
    getDirectionsByUser,
    deleteDirection,
};
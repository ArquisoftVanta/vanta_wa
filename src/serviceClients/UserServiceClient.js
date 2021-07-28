const axios = require("axios");
const route = "https://localhost:4100/graphql";

function getUser(callback) {
    axios({
            method: "POST",
            url: route,
            data: {
                query: `{
          userById(user_id: "${localStorage.getItem("mail")}"){
            user_name
            rh
            user_address
            user_doc
            user_mail
            user_phone
          }
        }`
            }
        }).then(res => {
            callback(res.data.data.userById);
        })
        .catch(err => {
            callback(err.message);
        });
}

function getFastProfile(email, callback) {
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
    axios({
            method: "POST",
            url: route,
            data: {
                query: `mutation{
          updateUser(user_mail: "${user.user_mail}", user:{
            user_name: "${user.user_name}",
            user_doc: "${user.user_doc}",
            user_phone: "${user.user_phone}",
            user_address: "${user.user_address}",
            user_mail: "${user.user_mail}",
            picture: "${user.picture}",
            rh: "${user.rh}"
          }){
            user_mail
          }
        }`
            }
        }).then(res => {
            callback(201);
        })
        .catch(err => {
            callback(err.message);
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
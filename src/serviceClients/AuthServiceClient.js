const axios = require("axios");
const route = process.env.VUE_APP_API_URL;

function getUserMailByToken(callback) {
    axios({
            method: "POST",
            url: route,
            data: {
                query: `{
          userByToken(token:"${localStorage.getItem("token")}"){
            userMail,
            authenticated
          }
        }`,
            },
        })
        .then((res) => {
            callback(res.data.data.userByToken.userMail);
        })
        .catch((err) => {
            callback(err.message);
        });
}

function registerUser(user, callback) {
    axios({
            method: "POST",
            url: route,
            data: {
                query: `mutation{
          registerUser(user:{
            userName: "${user.userName}",
            userDoc: "",
            userPhone: "${user.userPhone}",
            userMail: "${user.userMail}",
            userAddress: "",
            password: "${user.password}",
            registryDatetime: "${user.registryDatetime}",
            picture: "",
            rh: ""
          }){
            userMail
          }
        }`,
            },
        })
        .then((res) => {
            callback(res.data.data.registerUser);
        })
        .catch((err) => {
            callback(err.message);
        });
}

function loginUser(user, callback, showtoast) {
    let userGet = user;
    axios({
            method: "POST",
            url: route,
            data: {
                query: `mutation{
          loginUser(usermail: "${userGet.userMail}",
            password: "${userGet.password}"
          ){
                access_token
          }
        }`,
            },
        })
        .then((response) => {
            localStorage.setItem("token", response.data.data.loginUser.access_token);
            localStorage.setItem("mail", userGet.userMail);
            callback();
        })
        .catch((error) => {
            showtoast("┬íVerifica tus datos!", error);
        });
}

export default {
    getUserMailByToken,
    registerUser,
    loginUser,
};
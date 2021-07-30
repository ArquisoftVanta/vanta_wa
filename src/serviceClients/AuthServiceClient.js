const axios = require("axios");
const route = "https://localhost:4100/graphql";

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
      console.log(err.message);
      callback(err.message);
    });
}

function registerUser(user, callback) {
  console.log(user);
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
      console.log(res.data.data.registerUser);
      callback(res.data.data.registerUser);
    })
    .catch((err) => {
      console.log(err.message);
      callback(err.message);
    });
}

function loginUser(user, callback, showtoast) {
  let userGet = user;
  console.log(userGet.userMail);
  console.log(userGet.password);
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
      console.log(response.data.data.loginUser.access_token);
      localStorage.setItem("token", response.data.data.loginUser.access_token);
      localStorage.setItem("mail", userGet.userMail);
      callback();
    })
    .catch((error) => {
      showtoast("¡Verifica tus datos!", error);
    });
}

export default {
  getUserMailByToken,
  registerUser,
  loginUser,
};

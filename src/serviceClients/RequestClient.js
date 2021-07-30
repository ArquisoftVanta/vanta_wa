const axios = require("axios");
const moment = require("moment");
const route = "https://localhost:4100/graphql";

function getRequestbyUser(userMail, callback) {
  axios({
    method: "POST",
    url: route,
    data: {
      query: `
                {
                    getRequestbyUser(user_id:"${userMail}"){
                        request_id
                        active
                        service_id
                        date
                        time
                        user_id     
                      }
                }
                `,
    },
  })
    .then((res) => {
      callback(res.data.data.getRequestbyUser);
    })
    .catch((err) => {
      callback(err.message);
    });
}

function getRequestbyActive(flag, callback) {
  axios({
    method: "POST",
    url: route,
    data: {
      query: `
            {
                getRequestActive(active:"${flag}"){
                    request_id
                    active
                    service_id
                    date
                    time
                    user_id         
              }
            }
            `,
    },
  })
    .then((res) => {
      callback(res.data.data.getRequestActive);
    })
    .catch((err) => {
      callback(err.message);
    });
}

function getCoordinatesByRequest(request, callback) {
  axios({
    method: "POST",
    url: route,
    data: {
      query: `
            {
                getCoordinatesbyRequest(request:${request}){
                    request
                    lat
                    lng
                    address
                    type
                    order
                }
            }
            `,
    },
  })
    .then((res) => {
      callback(res.data.data.getCoordinatesbyRequest);
    })
    .catch((err) => {
      callback(err.message);
    });
}

function createRequest(request, callback) {
  axios({
    method: "POST",
    url: route,
    data: {
      query: `mutation{
                    newRequest(req:{
                        user_id: "${localStorage.getItem("mail")}",
                        date: "${request.date}",
                        time: "${request.time}",
                        active: "false",
                        registry_request: "${moment().format()}"
                    },coor1:{
                        lat: "${request.origin.lat}",
                        lng: "${request.origin.lng}",
                        address: "${request.origin.address}",
                        type: "origin"
                    
                      },coor2:{
                        lat: "${request.destination.lat}",
                        lng: "${request.destination.lng}",
                        address: "${request.destination.address}",
                        type: "destination"
                    
                      })
                      {
                        request_id
                      }
                }`,
    },
  })
    .then((res) => {
      callback(res.data.data.newRequest.request_id);
    })
    .catch((err) => {
      callback(err.message);
    });
}

function deleteRequest(request, callback) {
  axios({
    method: "POST",
    url: route,
    data: {
      query: `
                mutation{
                    deleteRequest(request_id:${request}){
                      request_id
                    }}
                `,
    },
  })
    .then((res) => {
      callback(res.data.data.deleteRequest);
    })
    .catch((err) => {
      callback(err.message);
    });
}

export default {
  getRequestbyUser,
  createRequest,
  getRequestbyActive,
  getCoordinatesByRequest,
  deleteRequest,
};

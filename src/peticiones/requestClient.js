
const axios = require("axios");
const moment = require("moment");
var d = new Date();
async function getRequestbyUser(){
        var id = "ojtinjacar@unal.edu.co"
        var result =await axios({
            method: "POST",
            url: "http://localhost:8000/graphql",
            data:{
                query: `
                {
                    getRequestbyUser(user_id:${id}){
                        active
                        request_id
                        service_id
                      }
                }
                `
            }

        })
        return result.data.data.getRequestbyUser;
}
function createRequest(request){
    console.log(request)
    console.log(request.origin.lat)
    console.log(request.destination.lat)
    axios({
        method: "POST",
        url: "http://localhost:8000/graphql",
        data:{
            query: `mutation{
                    newRequest(req:{
                        user_id: "${request.passengerMail}",
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
                }`
        }
    }).then(res => {
        console.log(res.data.data.newRequest);
       })
       .catch(err => {
        console.log(err.message);
       });
}

export default {
    getRequestbyUser,
    createRequest,
  };
  
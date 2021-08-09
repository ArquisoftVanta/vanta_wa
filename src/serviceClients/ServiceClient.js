const axios = require("axios");
const moment = require("moment");
const route = "https://localhost:4100/graphql";

function createService(service, callback) {
    for (let index = service[2].length; index < 8; index++) {
        let h = {
            coordinates_id: 0,
            order: 0
        };
        service[2].push(h)
    }
    console.log(service[2])
    axios({
            method: "POST",
            url: route,
            data: {
                query: `mutation{
                  newService(ser:{
                    user_id: "${localStorage.getItem("mail")}",
                    date: "${service[3].date}"
                    time: "${service[3].time}"
                    vehicle_id: "${service[3].idVehicle}"
                    state_service:false
                    service_value:${service[3].value}
                    places: ${service[3].places}
                  },coor1:{
                    lat: "${service[0].lat}"
                    lng: "${service[0].lng}"
                    address: "${service[0].address}"
                    typeC: "Origen"
                    orderC: 1
                  },coor2:{
                    lat: "${service[1].lat}"
                    lng: "${service[1].lng}"
                    address: "${service[1].address}"
                    typeC: "Destino"
                    orderC: 8
                  },coords:[{
                        coordinates_id: ${service[2][0].coordinates_id},
                        order: 1
                  },{
                        coordinates_id: ${service[2][1].coordinates_id},
                        order: 2
                  },{
                        coordinates_id: ${service[2][2].coordinates_id},
                        order: 3
                  },{
                        coordinates_id: ${service[2][3].coordinates_id},
                        order: 4
                  },{
                        coordinates_id: ${service[2][4].coordinates_id},
                        order: 5
                  },{
                        coordinates_id: ${service[2][5].coordinates_id},
                        order: 6
                  },{
                        coordinates_id: ${service[2][6].coordinates_id},
                        order: 7
                  },{
                        coordinates_id: ${service[2][7].coordinates_id},
                        order: 8
                  }])
                {
                  user_id
                }
                }`,
            },
        })
        .then((res) => {
            callback(201);
        })
        .catch((err) => {
            callback(err.message);
        });
}

export default {
    createService,
}
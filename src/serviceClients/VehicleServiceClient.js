const axios = require("axios");
const route = "http://localhost:4100/graphql";



function deleteVehicle(id, callback) {
    axios({
            method: "POST",
            url: route,
            data: {
                query: `mutation{
            deleteVehicle(id: ${id}){
              owner
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


function createVehicle(vehicle) {
    axios({
            method: "POST",
            url: route,
            data: {
                query: `mutation{
            createVehicle(vehicle: {
                  owner: "${vehicle.owner}",
                  license_plate: "${vehicle.license_plate}",
                  vehicle_type: "${vehicle.vehicle_type}",
                  model: "${vehicle.model}",
                  year: ${parseInt(vehicle.year)},
                  color: "${vehicle.color}",
                  registry: "${vehicle.registry}",
                  capacity: ${vehicle.capacity},
                  brand: "${vehicle.brand}",
                  service_type: "${vehicle.service_type}",
                  body: "${vehicle.body}",
                  soat_exp: "${vehicle.soat_exp}",
                  engine: ${vehicle.engine},
                  gas_type: "${vehicle.gas_type}"
            }){
              id
              license_plate
            }
          }`
            }
        }).then(res => {
            return res.data.data.createVehicle;
        })
        .catch(err => {
            return err.message;
        });
}

function updateVehicle(vehicle) {
    axios({
            method: "POST",
            url: route,
            data: {
                query: `mutation{
            updateVehicle(id:${vehicle.id}, vehicle: {
                  owner: "${vehicle.owner}",
                  license_plate: "${vehicle.license_plate}",
                  vehicle_type: "${vehicle.vehicle_type}",
                  model: "${vehicle.model}",
                  year: ${parseInt(vehicle.year)},
                  color: "${vehicle.color}",
                  registry: "${vehicle.registry}",
                  capacity: ${vehicle.capacity},
                  brand: "${vehicle.brand}",
                  service_type: "${vehicle.service_type}",
                  body: "${vehicle.body}",
                  soat_exp: "${vehicle.soat_exp}",
                  engine: ${vehicle.engine},
                  gas_type: "${vehicle.gas_type}"
            }){
              id
              soat_exp
            }
          }`
            }
        }).then(res => {
            return res.data.data.updateVehicle;
        })
        .catch(err => {
            return err.message;
        });
}

async function getVehicle(user, callback) {
    await axios({
            method: "POST",
            url: route,
            data: {
                query: `{
            getVehicles{
              id
              owner
              license_plate
              vehicle_type
              model
              year
              color
              registry
              capacity
              brand
              service_type
              body
              soat_exp
              engine
              gas_type
            }
          }`
            }
        }).then(res => {
            var arrayVehiclesUser = []
            res.data.data.getVehicles.forEach(element => {
                if (user === element.owner) {
                    arrayVehiclesUser.push(element)
                }
            });
            callback(arrayVehiclesUser);
        })
        .catch(err => {
            callback(err.message);
        });
}

export default {
    getVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle,
};
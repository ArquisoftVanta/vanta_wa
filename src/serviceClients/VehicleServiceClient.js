const axios = require("axios");
const route = "http://localhost:8000/graphql";



function deleteVehicle(id,callback){
  axios({
      method: "POST",
      url: route,
      data:{
          query: `mutation{
            deleteVehicle(id: ${id}){
                  owner
            }
          }`
      }
  }).then(res => {
      console.log(res.data.data.deleteVehicle);
     })
     .catch(err => {
      console.log(err.message);
     });
}


function createVehicle(vehicle){
  axios({
      method: "POST",
      url: route,
      data:{
          query: `mutation{
            createVehicle(vehicle: {
                  owner: "otrocorreo2",
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
      console.log(res.data.data.createVehicle);
     })
     .catch(err => {
      console.log(err.message);
     });
}

function updateVehicle(vehicle){
  console.log(vehicle)
  axios({
      method: "POST",
      url: route,
      data:{
          query: `mutation{
            updateVehicle(id:${vehicle.id}, vehicle: {
                  owner: "otrocorreo2",
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
      console.log(res.data.data.updateVehicle);
     })
     .catch(err => {
      console.log(err.message);
     });
}

async function getVehicle(user,callback){
  await axios({
      method: "POST",
      url: route,
      data:{
          query: `
          {
            getVehicle(owner: "${user}"){
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
              gas_type            }
          }`
      }
  }).then(res => {
      console.log(res.data.data.getVehicle)
      callback(res.data.data.getVehicle);
     })
     .catch(err => {
      console.log(err.message);
     });
}

export default {
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};

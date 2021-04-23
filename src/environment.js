// Modulos instalados
const enviroment = require("./environment.json");

// Entorno actual
var currentEnviroment;

// Asignar variables del entorno
if (process.env.NODE_ENV == "production") {
  currentEnviroment = enviroment.production;
} else {
  currentEnviroment = enviroment.development;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

// Exportar entorno
module.exports = currentEnviroment;
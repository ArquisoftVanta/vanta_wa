import vehicleSC from "../serviceClients/VehicleServiceClient";
import AuthSC from "../serviceClients/AuthServiceClient";

function eliminarVehiculo(idvehicle) {
    vehicleSC.deleteVehicle(idvehicle, (response) => {
        return response;
    });
}

function guardarVehiculo(vehicle) {
    vehicle.owner = localStorage.getItem("mail");
    if (vehicle.id == null) {
        vehicleSC.createVehicle(vehicle);
    } else {
        vehicleSC.updateVehicle(vehicle);
    }
}

function obtenerVehiculo(callback) {
    AuthSC.getUserMailByToken((data) => {
        vehicleSC.getVehicle(data, (response) => {
            callback(response);
        });
    });
}

function obtenerDatosRUNT(vehicle, DatosRunt) {
    vehicle.registry = getFormattedDate();
    var datos = DatosRunt.split(
        "\n"
    ); /*Separa la información por saltos de línea */
    for (var dato of datos) {
        /*Realiza un recorrido por todas las líneas buscando*/
        if (dato.includes("PLACA DEL VEHÍCULO")) {
            /*la información correspondiente para llenar los campos*/
            var lineaplaca = dato.split(":"); /*de texto.*/
            vehicle.license_plate = lineaplaca[1];
        } else if (dato.includes("MARCA:")) {
            var lineamarca = dato.split(":");
            vehicle.brand = lineamarca[1].replace("LÍNEA", "");
            vehicle.model = lineamarca[2];
        } else if (dato.includes("MODELO:")) {
            var lineamodelo = dato.split(":");
            vehicle.year = lineamodelo[1].replace("COLOR", "");
            vehicle.color = lineamodelo[2];
        } else if (dato.includes("TIPO DE SERVICIO")) {
            var lineatipo = dato.split(":");
            vehicle.service_type = lineatipo[1].replace("CLASE DE VEHÍCULO", "");
            vehicle.vehicle_type = lineatipo[2];
        } else if (dato.includes("CILINDRAJE")) {
            var lineacilindraje = dato.split(":");
            vehicle.engine = lineacilindraje[1].replace("TIPO DE CARROCERÍA", "");
            vehicle.body = lineacilindraje[2];
        } else if (dato.includes("COMBUSTIBLE")) {
            var lineacombustible = dato.split(":");
            vehicle.gas_type = lineacombustible[1].replace(
                "FECHA DE MATRICULA INICIAL(DD/MM/AAAA)",
                ""
            );
        } else if (dato.includes("PASAJEROS")) {
            var lineapasajeros = dato.split(":");
            vehicle.capacity = lineapasajeros[2];
        } else if (dato.includes("VIGENTE")) {
            var lineasoat = dato.split("	");
            var formato = lineasoat[3].split("/");
            vehicle.soat_exp =
                formato[2] +
                "-" +
                formato[1] +
                "-" +
                formato[0].replace(
                    " ",
                    ""
                ); /**Esto permite ordenar la fecha en el formato que se requiere */
            var dateControl = document.querySelector(
                'input[type="date"]'
            ); /**Busca el primer input de tipo "date" */
            dateControl.value =
                vehicle.soat_exp; /**Posteriormente se guarda en el input date la fecha de vencimiento tomada por el RUNT */
            break;
        }
    }
    return vehicle;
}

function getFormattedDate() {
    var date = new Date();

    return (
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.toLocaleDateString("es-CO", { day: "2-digit" }) +
        "T" +
        ("0" + date.getHours()).slice(-2) +
        ":" +
        ("0" + date.getMinutes()).slice(-2) +
        ":" +
        ("0" + date.getSeconds()).slice(-2)
    );
}

export default {
    eliminarVehiculo,
    guardarVehiculo,
    obtenerDatosRUNT,
    obtenerVehiculo,
};
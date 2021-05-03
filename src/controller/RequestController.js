import AuthSC from "../serviceClients/AuthServiceClient";
import RequestSC from "../serviceClients/RequestClient";

function createRequest(request, callback) {
    RequestSC.createRequest(request, (response) => {
        if (response > 0) {
            callback(201)
        } else {
            callback(401)
        }
    });
}

function getRequests(callback) {
    AuthSC.getUserMailByToken((response) => {
        var datos = []
        RequestSC.getRequestbyUser(response, (data) => {
            console.log(data)
            if (data.length == 0) {
                callback(data)
            }
            data.forEach((element, key) => {
                RequestSC.getCoordinatesByRequest(element.request_id, (response2) => {
                    var RequestCoor = []
                    RequestCoor.push(element)
                    RequestCoor.push(response2)
                    datos.push(RequestCoor)
                    if (Object.is(data.length - 1, key)) {
                        console.log(datos)
                        callback(datos)
                    }
                })
            });

        })
    })
}

function deleteRequests(request_id, callback) {
    AuthSC.getUserMailByToken((response) => {
        RequestSC.deleteRequest(request_id, (call) => {
            console.log(request_id)
            this.getRequests((response2) => {
                callback(response2)
            })
        })
    })
}
export default {
    createRequest,
    getRequests,
    deleteRequests
}
import AuthSC from "../serviceClients/AuthServiceClient";
import RequestSC from "../serviceClients/RequestClient";

function createRequest(request, callback) {
    RequestSC.createRequest(request, (response) => {
        if (response > 0) {
            callback(201);
        } else {
            callback(401);
        }
    });
}

function getRequests(flag, callback) {
    AuthSC.getUserMailByToken((response) => {
        var datos = [];
        RequestSC.getRequestbyUser(response, (data) => {
            if (data.length == 0) {
                callback(data);
            }
            data.forEach((element, key) => {
                RequestSC.getCoordinatesByRequest(element.request_id, (response2) => {
                    var RequestCoor = [];
                    RequestCoor.push(element);
                    RequestCoor.push(response2);
                    if (element.active == flag) {
                        datos.push(RequestCoor);
                    }
                    if (Object.is(data.length - 1, key)) {
                        callback(datos);
                    }
                });
            });
        });
    });
}

function getRequestsbyActive(callback) {
    AuthSC.getUserMailByToken((response) => {
        var datos = [];
        RequestSC.getRequestbyActive("False", (data) => {
            if (data.length == 0) {
                callback(data);
            }
            data.forEach((element, key) => {
                RequestSC.getCoordinatesByRequest(element.request_id, (response2) => {
                    var RequestCoor = [];
                    RequestCoor.push(element);
                    RequestCoor.push(response2);
                    if (response != element.user_id) {
                        datos.push(RequestCoor);
                    }
                    if (Object.is(data.length - 1, key)) {
                        callback(datos);
                    }
                });
            });
        });
    });
}

function deleteRequests(request_id, callback) {
    AuthSC.getUserMailByToken(() => {
        RequestSC.deleteRequest(request_id, () => {
            this.getRequests('false',(response2) => {
                callback(response2);
            });
        });
    });
}
export default {
    createRequest,
    getRequests,
    deleteRequests,
    getRequestsbyActive,
};
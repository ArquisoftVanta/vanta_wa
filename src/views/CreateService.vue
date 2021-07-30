<template>
  <div>
    <Header></Header>
    <Directions state="Choose Direction" />
    <VehiclesByUser state="Choose" />
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Lista de Pasajeros Postulados
            </h5>

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <RouteList />
          </div>
        </div>
      </div>
    </div>
    <div>
      <div
        class="modal fade"
        id="exampleModal2"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Ordena el recorrido de tu ruta
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div>
                <draggable
                  v-model="orderedRoutesOfPassengers"
                  ghost-class="ghost"
                >
                  <transition-group type="transition" name="flip-list">
                    <div
                      class="sortable"
                      :id="`${element.type + element.id}`"
                      v-for="element in orderedRoutesOfPassengers"
                      :key="`${element.type + element.id}`"
                    >
                      <strong
                        >{{ element.type }} pasajero {{ element.id }}:</strong
                      >
                      <strong>{{ element.address }}</strong>
                    </div>
                  </transition-group>
                </draggable>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-dark btn-block"
                @click="sendPossibleRouteToMap"
              >
                Ver Ruta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="container-fluid mb-5">
        <div class="row">
          <div class="col-12 col-md-5">
            <div class="card bg-dark mb-5 mb-md-0">
              <div class="card-body">
                <h3 class="card-title text-warning lead">Crear servicio</h3>
                <form @submit.prevent="saveRoute">
                  <div class="form-group mb-2">
                    <div class="input-group input-group-sm mb-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          >Salida</span
                        >
                      </div>
                      <input
                        id="placeoforigin"
                        type="text"
                        class="form-control"
                        placeholder="Lugar de salida"
                        aria-label="lugar-salida"
                        aria-describedby="basic-addon1"
                        ref="originDriver"
                        required
                      />
                    </div>
                    <div class="input-group input-group-sm mb-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          >Llegada</span
                        >
                      </div>
                      <input
                        id="placeofdeparture"
                        type="text"
                        class="form-control"
                        placeholder="Lugar de llegada"
                        aria-label="lugar-llegada"
                        aria-describedby="basic-addon1"
                        ref="destinationDriver"
                        required
                      />
                    </div>
                    <div class="input-group input-group-sm mb-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          >Fecha</span
                        >
                      </div>
                      <input
                        v-model="route.date"
                        type="date"
                        class="form-control"
                        placeholder="Fecha de salida"
                        aria-label="fecha-salida"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </div>
                    <div class="input-group input-group-sm mb-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          >Hora</span
                        >
                      </div>
                      <input
                        v-model="route.time"
                        type="time"
                        class="form-control"
                        placeholder="Hora de salida"
                        aria-label="hora-salida"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </div>
                    <div class="input-group input-group-sm mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          >Valor</span
                        >
                      </div>
                      <input
                        v-model="route.value"
                        type="text"
                        class="form-control"
                        placeholder="Valor del viaje"
                        aria-label=""
                        aria-describedby="basic-addon1"
                        required
                      />
                    </div>
                    <button
                      type="summit"
                      class="btn btn-warning btn-block btn-sm btn-block"
                    >
                      Crear Servicio
                    </button>
                  </div>
                </form>
                <button
                  type="button"
                  class="btn btn-light btn-sm btn-block"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  data-display="static"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Escoger Pasajeros
                </button>
                <button
                  type="button"
                  class="btn btn-light btn-sm btn-block"
                  data-toggle="modal"
                  data-target="#modalVehicles"
                  data-display="static"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Escoger Vehículo
                </button>

                <button
                  type="button"
                  class="btn btn-light btn-sm btn-block"
                  data-toggle="modal"
                  data-target="#exampleModal2"
                >
                  Ordenar Ruta
                </button>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-7 mb-5">
            <DirectionsMapView />
          </div>
        </div>
      </div>
    </div>
    <footerwith-background></footerwith-background>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus.js";
import RouteList from "../components/RouteList.vue";
import DirectionsMapView from "../components/DirectionsMapView.vue";
import Header from "../components/Header.vue";
import FooterwithBackground from "../components/FooterwithBackground.vue";
import firebase from "firebase";
import Draggable from "vuedraggable";
import Directions from "../components/WatchCurrentDirections";
import VehiclesByUser from "../components/VehiclesByUser";
import NotificationSC from "../serviceClients/NotificationServiceClient";

export default {
  name: "CreateService",
  data() {
    return {
      typeInput: "",
      orderedRoutesOfPassengers: [],
      routeDefinitive: [],
      listVehicles: [],
      pointChoosed: "",
      currentDate: Date,
      route: {
        orderRoute: {
          ori: {},
          des: {},
          stops: {},
        },
        idVehicle: "",
        originDriver: {
          address: "",
          lat: 0,
          lng: 0,
        },
        originPassengers: {
          A: {
            address: "",
            lat: 0,
            lng: 0,
            type: "Origen",
            id: 1,
          },
          B: {
            address: "",
            lat: 0,
            lng: 0,
            type: "Origen",
            id: 2,
          },
          C: {
            address: "",
            lat: 0,
            lng: 0,
            type: "Origen",
            id: 3,
          },
          D: {
            address: "",
            lat: 0,
            lng: 0,
            type: "Origen",
            id: 4,
          },
        },
        destinationPassengers: {
          A: {
            address: "",
            lat: 0,
            lng: 0,
            type: "Destino",
            id: 1,
          },
          B: {
            address: "",
            lat: 0,
            lng: 0,
            type: "Destino",
            id: 2,
          },
          C: {
            address: "",
            lat: 0,
            lng: 0,
            type: "Destino",
            id: 3,
          },
          D: {
            address: "",
            lat: 0,
            lng: 0,
            type: "Destino",
            id: 4,
          },
        },
        destinationDriver: {
          address: "",
          lat: 0,
          lng: 0,
        },
        dataDriver: {
          driverMail: "",
          driverName: "",
        },
        passengers: {
          A: {
            name: "",
            id: "",
            email: "",
          },
          B: {
            name: "",
            id: "",
            email: "",
          },
          C: {
            name: "",
            id: "",
            email: "",
          },
          D: {
            name: "",
            id: "",
            email: "",
          },
        },
        value: "",
        date: "",
        time: "",
        routeActive: Boolean,
        servicePerformed: Boolean,
      },

      error: "",
    };
  },
  components: {
    RouteList,
    DirectionsMapView,
    Header,
    Directions,
    FooterwithBackground,
    Draggable,
    VehiclesByUser,
  },
  mounted() {
    this.getFormattedDate();
    EventBus.$on("vehicle", (vehicle) => {
      try {
        this.route.idVehicle = vehicle.vehicleLicenseplate;
      } catch (error) {
        console.log("");
      }
    });
    EventBus.$on("point", (point) => {
      try {
        this.$refs[this.typeInput].value = point.favAddress;
        this.route[this.typeInput].address = point.favAddress;
        this.route[this.typeInput].lat = parseFloat(point.favLatitude);
        this.route[this.typeInput].lng = parseFloat(point.favLongitude);
      } catch (error) {
        console.log("");
      }
    });
    EventBus.$on("choosePassengerRoutes-data", (routesReceived) => {
      /**
       *En esta función se traen los datos de los pasajeros seleccionados
       *por parte del conductor en el componente "Route List" y se guardan
       *en el objeto "route" para posteriormente enviar a Firebase
       */
      let letterchar = 65;
      routesReceived.forEach(({ origin, destination, id, dataPassenger }) => {
        let repeatDirectionOrigin = 0;
        let repeatDirectionDestination = 0;

        this.route.originPassengers[String.fromCharCode(letterchar)].address =
          origin.address;
        this.route.originPassengers[String.fromCharCode(letterchar)].lat =
          origin.lat;
        this.route.originPassengers[String.fromCharCode(letterchar)].lng =
          origin.lng;
        this.route.destinationPassengers[
          String.fromCharCode(letterchar)
        ].address = destination.address;
        this.route.destinationPassengers[String.fromCharCode(letterchar)].lat =
          destination.lat;
        this.route.destinationPassengers[String.fromCharCode(letterchar)].lng =
          destination.lng;
        this.route.passengers[String.fromCharCode(letterchar)].name =
          dataPassenger.passengerName;
        this.route.passengers[String.fromCharCode(letterchar)].id = id;
        this.route.passengers[String.fromCharCode(letterchar)].email =
          dataPassenger.passengerMail;

        /**
         *Existen casos donde algunos pasajeros salen del mismo lugar.
         *Entonces, para practicidad por parte del conductor, solo se
         *guardan ubicaciones unicas en la variable "orderedRoutesOfPassengers"
         *para que cuando el conductor pueda ordenar la ruta, no le aparezca
         *una ubicacion dos veces repetidas.
         */
        this.orderedRoutesOfPassengers.forEach(({ address }) => {
          if (
            address ==
            this.route.originPassengers[String.fromCharCode(letterchar)].address
          ) {
            repeatDirectionOrigin = repeatDirectionOrigin + 1;
          }
          if (
            address ==
            this.route.destinationPassengers[String.fromCharCode(letterchar)]
              .address
          ) {
            repeatDirectionDestination = repeatDirectionDestination + 1;
          }
        });
        if (repeatDirectionOrigin == 0) {
          this.orderedRoutesOfPassengers.push(
            this.route.originPassengers[String.fromCharCode(letterchar)]
          );
        }
        if (repeatDirectionDestination == 0) {
          this.orderedRoutesOfPassengers.push(
            this.route.destinationPassengers[String.fromCharCode(letterchar)]
          );
        }
        letterchar = letterchar + 1;
      });
    });

    EventBus.$emit("passengerRoutes-data", this.routes);
    /**
     *Esta parte del código, permite crear la opcion de Autocompletar
     *de Google en los inputs, para facilidad del conductor a la hora de
     *buscar su origen y destino.
     *Se limita la restricción para que solo salgan ubicaciones de Colombia.
     */
    for (let ref in this.$refs) {
      const autocomplete = new google.maps.places.Autocomplete(
        this.$refs[ref],
        {
          bounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(45.4215296, -75.6971931)
          ),
          componentRestrictions: { country: "co" },
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        this.route[ref].address = `${place.name}, ${place.vicinity}`;
        this.route[ref].lat = place.geometry.location.lat();
        this.route[ref].lng = place.geometry.location.lng();
      });
    }
  },
  methods: {
    goToDrive() {
      this.$router.push("/driver");
    },
    getFormattedDate() {
      var date = new Date();
      this.currentDate =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.toLocaleDateString("es-CO", { day: "2-digit" });
    },
    /*getUserDB() {
      UserSC.getUser((data) => {
        this.route.dataDriver.driverMail = data.userMail;
        this.route.dataDriver.driverName = data.userName;
      });
    },*/
    /**
     * Esta función guarda el objeto "route" con todas las paradas y datos
     *  en la colección "driverRoute", de firebase.
     */
    saveRoute() {
      var textAlert = "";
      let idRoute;
      if (this.route.originDriver.address === "") {
        textAlert = textAlert + "Punto de Origen, \n";
      }
      if (this.route.destinationDriver.address === "") {
        textAlert = textAlert + "Punto de Destino, \n";
      }
      if (this.route.date === "") {
        textAlert = textAlert + "Fecha de Servicio, \n";
      }
      if (this.route.time === "") {
        textAlert = textAlert + "Hora de Partida, \n";
      }
      if (this.route.value === "") {
        textAlert = textAlert + "Valor de Servicio, \n";
      }
      if (this.route.idVehicle === "") {
        textAlert = textAlert + "Vehículo, \n";
      }
      if (textAlert === "") {
        if (new Date(this.currentDate) > new Date(this.route.date)) {
          this.$bvToast.toast(textAlert, {
            title: "Por favor verifica la fecha.",
            autoHideDelay: 5000,
            appendToast: true,
            variant: "danger",
            solid: true,
          });
        } else {
          const db = firebase.firestore();
          this.route.routeActive = true;
          this.route.servicePerformed = false;
          this.route.orderRoute.ori = this.routeDefinitive[0];
          this.route.orderRoute.des = this.routeDefinitive[1];
          let j = 65;
          this.routeDefinitive[2].forEach((element) => {
            this.route.orderRoute.stops[String.fromCharCode(j)] = element;
            j = j + 1;
          });
          db.collection("driverRoute")
            .doc()
            .set(this.route);
          db.collection("driverRoute")
            .where(
              "dataDriver.driverMail",
              "==",
              this.route.dataDriver.driverMail
            )
            .where("date", "==", this.route.date)
            .where("time", "==", this.route.time)
            .get()
            .then((snap) => {
              snap.forEach((doc) => {
                idRoute = doc.id;
                for (let i = 65; i < 69; i++) {
                  if (this.route.passengers[String.fromCharCode(i)].id !== "") {
                    this.changeStateofPassenger(
                      this.route.passengers[String.fromCharCode(i)].id,
                      idRoute
                    );
                  }

                  NotificationSC.createNotification({
                    data: "¡Haz sido seleccionado para un viaje!",
                    destination: "nomination-services",
                    mailUser: this.route.passengers[String.fromCharCode(i)]
                      .email,
                  });
                }
              });
            });

          this.$bvToast.toast("¡Ruta Creada Correctamente!", {
            title: "Ruta Creada",
            autoHideDelay: 5000,
            appendToast: true,
            variant: "success",
            solid: true,
          });
        }
      } else {
        this.$bvToast.toast(textAlert, {
          title: "Faltan Campos por Llenar",
          autoHideDelay: 5000,
          appendToast: true,
          variant: "danger",
          solid: true,
        });
      }
    },
    changeStateofPassenger(id, idRoute) {
      const db = firebase.firestore();
      const a = db.collection("passengerRoutes").doc(id);
      a.update({
        selected: true,
        idRoute: idRoute,
        value: "" + this.route.value,
      });
    },
    /**
     * Esta función, envia "routeDefinitive" al componente "DirectionsMapView",
     * para que pueda mostrar dinamicamente en el mapa el posible orden de recogida
     * y destino de cada pasajero.
     */
    sendPossibleRouteToMap() {
      while (this.routeDefinitive != 0) {
        this.routeDefinitive.pop();
      }
      this.routeDefinitive.push(this.route.originDriver);
      this.routeDefinitive.push(this.route.destinationDriver);
      this.routeDefinitive.push(this.orderedRoutesOfPassengers);
      EventBus.$emit("possibleRoute-data", this.routeDefinitive);
    },
  },
};
</script>

<style scoped>
.createservice {
  color: black;
  background-color: white;
  opacity: 0.9;
  border-radius: 2%;
}
strong {
  display: inline-block;
}

.sortable {
  width: 100%;
  background: white;
  cursor: move;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 10px 10px 5px -1px rgba(0, 0, 0, 0.14);
}
.flip-list-move {
  transition: transform 0.5s;
}
.ghost {
  border-left: 6px solid #06416d;
  box-shadow: 10px 10px 5px -1px rgba(0, 0, 0, 0.14);
  opacity: 0.7;
}
</style>

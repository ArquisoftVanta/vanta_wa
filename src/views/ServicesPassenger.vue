<template>
  <div>
    <Header></Header>
    <div class="container-fluid mb-5">
      <div class="row">
        <div class="col-12 col-lg-6 mb-3 mb-lg-0">
          <div class="card bg-dark text-center" style="height: 400px">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                  <a
                    id="active-tab"
                    class="nav-link btn btn-dark text-light"
                    data-toggle="tab"
                    href="#active"
                    role="tab"
                    aria-controls="active"
                    aria-selected="false"
                    >Activos</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link btn btn-dark text-light"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                    >Seleccionados</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link btn btn-dark text-light"
                    id="contact-tab"
                    data-toggle="tab"
                    href="#contact"
                    role="tab"
                    aria-controls="contact"
                    aria-selected="false"
                    >Realizados</a
                  >
                </li>
              </ul>
            </div>
            <div class="card-body overflow-auto">
              <div class="tab-content" id="nav-tabContent">
                <div
                  class="tab-pane fade active show"
                  id="active"
                  role="tabpanel"
                  aria-labelledby="active-tab"
                >
                  <table class="table table-hover table-dark table-sm text-nowrap h-100">
                    <thead>
                      <tr class="text-warning">
                        <th>Origen/Destino</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Ruta</th>
                        <th>Cancelar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="route in routesActive"
                        :key="route[0].request_id"
                      >
                        <td>
                          {{ route[1][0].address.split(",")[0] }}/{{
                            route[1][1].address.split(",")[0]
                          }}
                        </td>
                        <td>{{ route[0].date }}</td>
                        <td>{{ route[0].time }}</td>
                        <td>
                          <img
                            type="button"
                            src="~@/assets/map.png"
                            width="24"
                            height="24"
                            alt="map"
                            @click="routePassengerItemPressed(route[1])"
                          />
                        </td>
                        <td>
                          <img
                            type="button"
                            src="~@/assets/remove.png"
                            width="24"
                            height="24"
                            alt="remove"
                            @click="deleteRoute(route[0].request_id)"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  class="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <table class="table table-dark">
                    <thead>
                      <tr class="text-warning">
                        <th>Origen/Destino</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Ruta</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="route in routesChoosed"
                        :key="route[0].request_id"
                      >
                        <td>
                          {{ route[1][0].address.split(",")[0] }}/{{
                            route[1][1].address.split(",")[0]
                          }}
                        </td>
                        <td>{{ route[0].date }}</td>
                        <td>{{ route[0].time }}</td>
                        <td>
                          <img
                            type="button"
                            src="~@/assets/map.png"
                            width="24"
                            height="24"
                            alt="map"
                            @click="routePassengerItemPressed(route[1])"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  class="tab-pane fade"
                  id="contact"
                  role="tabpanel"
                  aria-labelledby="contact-tab"
                >
                  <table class="table table-dark">
                    <thead>
                      <tr class="text-warning">
                        <th>Origen/Destino</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Ruta</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="route in routesMade"
                        :key="route[0].request_id"
                      >
                        <td>
                          {{ route[1][0].address.split(",")[0] }}/{{
                            route[1][1].address.split(",")[0]
                          }}
                        </td>
                        <td>{{ route[0].date }}</td>
                        <td>{{ route[0].time }}</td>
                        <td>
                          <img
                            type="button"
                            src="~@/assets/map.png"
                            width="24"
                            height="24"
                            alt="map"
                            @click="routePassengerItemPressed(route[1])"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6 mb-3 mb-lg-0">
          <DirectionsMapView />
        </div>
      </div>
    </div>
    <FooterwithBackground></FooterwithBackground>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import FooterwithBackground from "../components/FooterwithBackground.vue";
import DirectionsMapView from "../components/DirectionsMapView.vue";
import { EventBus } from "@/EventBus.js";
import firebase from "firebase";
import RequestCo from "../controller/RequestController";

export default {
  name: "MyServicesDriver",
  components: {
    Header,
    FooterwithBackground,
    DirectionsMapView,
  },

  data() {
    return {
      routesActive: [],
      routesChoosed: [],
      routesMade: [],
      userMail: "",
      routeComplete: [],
      request: {
        origin: {
          address: "",
          lat: 0,
          lng: 0,
        },
        destination: {
          address: "",
          lat: 0,
          lng: 0,
        },
      },
    };
  },
  created() {
    this.getRoutesActives();
    this.getRoutesChoosed();
  },
  mounted() {
    EventBus.$emit("passengerRoutes-data", this.routes);
  },
  methods: {
    goToPassenger() {
      this.$router.push("/passenger");
    },
    getRoutesActives() {
      RequestCo.getRequests("false",(data) => {
        this.routesActive = [];
        this.routesActive = data;
      });
    },
    getRoutesChoosed(){
      RequestCo.getRequests("true",(data) => {
        this.routesChoosed = [];
        this.routesChoosed = data;
      });
      
    },
    getRoutesMade() {
      const db = firebase.firestore();
      db.collection("passengerRoutes")
        .where("dataPassenger.passengerMail", "==", this.userMail)
        .where("servicePerformed", "==", true)
        .where("selected", "==", true)
        .get()
        .then((snap) => {
          this.routesMade = [];
          snap.forEach((doc) => {
            let route = doc.data();
            route.id = doc.id;
            this.routesMade.push(route);
          });
        });
    },
    changeStateofPassenger(id) {
      const db = firebase.firestore();
      const a = db.collection("passengerRoutes").doc(id);
      a.update({
        selected: false,
      });
    },
    deleteRoute(request) {
      RequestCo.deleteRequests(request, (response) => {
        this.$bvToast.toast("Postulación Cancelada Correctamente!", {
          title: "Postulación Cancelada",
          autoHideDelay: 5000,
          appendToast: true,
          variant: "success",
          solid: true,
        });
        this.routesActive = response;
      });
    },
    returnRoute(route) {
      this.$router.push("/service-ended");
    },
    routePassengerItemPressed(route) {
      this.request.origin.lat = Number(route[0].lat);
      this.request.origin.lng = Number(route[0].lng);
      this.request.origin.address = route[0].address;
      this.request.destination.lat = Number(route[1].lat);
      this.request.destination.lng = Number(route[1].lng);
      this.request.destination.address = route[1].address;
      EventBus.$emit("passengerRoutes-data", [this.request]);
    },
    routePassengerMade(route) {
      const db = firebase.firestore();
      db.collection("driverRoute")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            if (doc.id == route.idRoute) {
              let aux = [];
              let stops = doc.data().orderRoute.stops;
              this.routeComplete[0] = doc.data().orderRoute.ori;
              this.routeComplete[1] = doc.data().orderRoute.des;
              for (let i = 65; i < 73; i++) {
                if (stops[String.fromCharCode(i)] != undefined) {
                  aux.push(stops[String.fromCharCode(i)]);
                }
              }
              this.routeComplete[2] = aux;
              EventBus.$emit("possibleRoute-data", this.routeComplete);
            }
          });
        });
    },
  },
};
</script>

<template>
  <div>
    <Header></Header>
    <div class="container-fluid mb-5">
      <div class="row">
        <div class="col-12 col-md-4 offset-md-1">
          <div class="card mt-4 mb-3 mb-md-4" style="height: 400px">
            <div class="card">
              <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <a
                    class="nav-link"
                    id="active-tab"
                    data-toggle="tab"
                    href="#active"
                    role="tab"
                    aria-controls="active"
                    aria-selected="false"
                    >Activos</a
                  >
                  <a
                    class="nav-link"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                    >Seleccionados</a
                  >
                  <a
                    class="nav-link"
                    id="contact-tab"
                    data-toggle="tab"
                    href="#contact"
                    role="tab"
                    aria-controls="contact"
                    aria-selected="false"
                    >Realizados</a
                  >
                </div>
              </nav>
            </div>
            <div
              class="card"
              style="height: 80%; overflow: scroll; margin: 0 0 -20% 0"
            >
              <div class="card-body">
                <div class="tab-content" id="nav-tabContent">
                  <div
                    class="tab-pane fade active show"
                    id="active"
                    role="tabpanel"
                    aria-labelledby="active-tab"
                  >
                    <div class="accordion" id="accordionExample">
                      <div
                        class="card"
                        v-for="route in routesActive"
                        :key="route[0].request_id"
                      >
                        <div class="card-header" id="headingOne3">
                          <h2 class="mb-0">
                            <button
                              class="btn btn-link btn-block text-left"
                              type="button"
                              data-toggle="collapse"
                              :data-target="`#data${route[0].request_id}`"
                              aria-expanded="true"
                              :aria-controls="`data${route[0].request_id}`"
                              style="color: #06416d"
                            >
                              <div>
                                Origen:
                                {{ route[1][0].address.split(",")[0] }}
                              </div>
                              <div>
                                Destino:
                                {{ route[1][1].address.split(",")[0] }}
                              </div>
                            </button>
                          </h2>
                        </div>
                        <div
                          :id="`data${route[0].request_id}`"
                          class="collapse"
                          aria-labelledby="headingOne3"
                          data-parent="#accordionExample"
                        >
                          <div class="card-body">
                            <div>Dia: {{ route[0].date }}</div>
                            <div>Hora: {{ route[0].time }}</div>

                            <div class="row">
                              <div class="col">
                                <button
                                  type="button"
                                  class="btn btn-outline-dark btn-block button"
                                  @click="deleteRoute(route[0].request_id)"
                                  style="margin: 5% 0 5% 0"
                                >
                                  Cancelar Servicio
                                </button>
                              </div>
                              <div class="col">
                                <button
                                  type="button"
                                  class="btn btn-outline-dark btn-block button"
                                  style="margin: 5% 0 5% 0"
                                  @click="routePassengerItemPressed(route[1])"
                                >
                                  Ver Ruta
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div class="accordion" id="accordionExample2">
                      <div
                        class="card"
                        v-for="route1 in routesChoosed"
                        :key="route1.id"
                      >
                        <div class="card-header" id="headingOne">
                          <h2 class="mb-0">
                            <button
                              class="btn btn-link btn-block text-left"
                              type="button"
                              data-toggle="collapse"
                              :data-target="`#data${route1.id}`"
                              aria-expanded="true"
                              :aria-controls="`data${route1.id}`"
                              style="color: #06416d"
                            >
                              <div>
                                Origen:
                                {{ route1.origin.address.split(",")[0] }}
                              </div>
                              <div>
                                Destino:
                                {{ route1.destination.address.split(",")[0] }}
                              </div>
                            </button>
                          </h2>
                        </div>
                        <div
                          :id="`data${route1.id}`"
                          class="collapse"
                          aria-labelledby="headingOne"
                          data-parent="#accordionExample2"
                        >
                          <div class="card-body">
                            <div>Dia: {{ route1.date }}</div>
                            <div>Hora: {{ route1.time }}</div>
                            <div>Valor: {{ route1.value }}</div>

                            <div class="row">
                              <div class="col">
                                <button
                                  type="button"
                                  class="btn btn-outline-dark btn-block button"
                                  style="margin: 5% 0 5% 0"
                                  @click="routePassengerMade(route1)"
                                >
                                  Ver Ruta
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="contact"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                  >
                    <div class="accordion" id="accordionExample3">
                      <div
                        class="card"
                        v-for="route2 in routesMade"
                        :key="route2.id"
                      >
                        <div class="card-header" id="headingOne2">
                          <h2 class="mb-0">
                            <button
                              class="btn btn-link btn-block text-left"
                              type="button"
                              data-toggle="collapse"
                              :data-target="`#data${route2.id}`"
                              aria-expanded="true"
                              :aria-controls="`data${route2.id}`"
                              style="color: #06416d"
                            >
                              <div>
                                Origen:
                                {{ route2.origin.address.split(",")[0] }}
                              </div>
                              <div>
                                Destino:
                                {{ route2.destination.address.split(",")[0] }}
                              </div>
                            </button>
                          </h2>
                        </div>
                        <div
                          :id="`data${route2.id}`"
                          class="collapse"
                          aria-labelledby="headingOne2"
                          data-parent="#accordionExample3"
                        >
                          <div class="card-body">
                            <div>Dia: {{ route2.date }}</div>
                            <div>Hora: {{ route2.time }}</div>
                            <div>Value: {{ route2.value }}</div>

                            <div class="row">
                              <div class="col">
                                <button
                                  type="button"
                                  class="btn btn-outline-dark btn-block button"
                                  style="margin: 5% 0 5% 0"
                                  @click="routePassengerMade(route2)"
                                >
                                  Ver Ruta
                                </button>
                              </div>
                              <div class="col">
                                <button
                                  type="button"
                                  class="btn btn-outline-dark btn-block button"
                                  style="margin: 5% 0 5% 0"
                                  @click="returnRoute(route2)"
                                >
                                  Calificar Pasajeros
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 mt-md-4 mb-5">
          <DirectionsMapView />
        </div>
      </div>
    </div>
    <FooterwithBackground></FooterwithBackground>
  </div>
</template>

<script>
import Header from "../components/Header";
import FooterwithBackground from "../components/FooterwithBackground.vue";
import DirectionsMapView from "../components/DirectionsMapView.vue";
import { EventBus } from "@/EventBus.js";
import firebase from "firebase";
import RequestCo from "../controller/RequestController"

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
  },
  mounted() {
    EventBus.$emit("passengerRoutes-data", this.routes);
  },
  methods: {
    goToPassenger() {
      this.$router.push("/passenger");
    },
    getRoutesActives() {
      RequestCo.getRequests((data)=>{
        this.routesActive = []
        this.routesActive = data
      })
    },
    getRoutesChoosed() {
      const db = firebase.firestore();
      db.collection("passengerRoutes")
        .where("dataPassenger.passengerMail", "==", this.userMail)
        .where("servicePerformed", "==", false)
        .where("selected", "==", true)
        .get()
        .then((snap) => {
          this.routesChoosed = [];
          snap.forEach((doc) => {
            let route = doc.data();
            route.id = doc.id;
            this.routesChoosed.push(route);
          });
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
        RequestCo.deleteRequests(request,(response)=>{
        this.$bvToast.toast("Postulación Cancelada Correctamente!", {
        title: "Postulación Cancelada",
        autoHideDelay: 5000,
        appendToast: true,
        variant: "success",
        solid: true,
      });
      this.routesActive = response
      })
    },
    returnRoute(route) {
      this.$router.push("/service-ended");
    },
    routePassengerItemPressed(route) {
      this.request.origin.lat = Number(route[0].lat)
      this.request.origin.lng = Number(route[0].lng)
      this.request.origin.address = route[0].address
      this.request.destination.lat = Number(route[1].lat)
      this.request.destination.lng = Number(route[1].lng)
      this.request.destination.address = route[1].address
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
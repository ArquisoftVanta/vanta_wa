<template>
  <div>
    <Header></Header>
    <div class="container-fluid mb-5">
      <div class="row">
        <div class="col-12 col-md-5">
          <div class="card bg-dark mb-5 mb-md-0">
            <div class="card-body">
              <h5 class="card-title text-warning lead">Postula tu ruta</h5>
              <form @submit.prevent="saveRoute">
                <div class="form-group mb-2">
                  <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        >Salida</span
                      >
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Lugar de salida"
                      aria-label="lugar-salida"
                      aria-describedby="basic-addon1"
                      ref="origin"
                      required
                    />
                  </div>
                  <div class="input-group input-group-sm mb-3">
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
                      ref="destination"
                      required
                    />
                  </div>
                  <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        >Fecha</span
                      >
                    </div>
                    <input
                      v-model="request.date"
                      type="date"
                      class="form-control"
                      placeholder="Fecha de salida"
                      aria-label="fecha-salida"
                      aria-describedby="basic-addon1"
                      required
                    />
                  </div>
                  <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        >Hora</span
                      >
                    </div>
                    <input
                      v-model="request.time"
                      type="time"
                      class="form-control"
                      placeholder="Hora de salida"
                      aria-label="hora-salida"
                      aria-describedby="basic-addon1"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn btn-warning btn-block btn-sm"
                  >
                    Guardar ruta
                  </button>
                </div>
              </form>
              <button
                @click="calculateButtonPressed"
                class="btn btn-light btn-block btn-sm"
              >
                Ver ruta
              </button>
              <button
                type="button"
                class="btn btn-light btn-block btn-sm"
                @click="locatorButtonPressed"
              >
                ¡Ubicame!
              </button>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-7 mb-5 mb-md-0">
          <DirectionsMapView></DirectionsMapView>
        </div>
      </div>
    </div>
    <FooterwithBackground></FooterwithBackground>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus.js";
import DirectionsMapView from "../components/DirectionsMapView.vue";
import Header from "../components/Header.vue";
import FooterwithBackground from "../components/FooterwithBackground.vue";
import RequestCo from "../controller/RequestController";
import UserCo from "../controller/UserController";
import axios from "axios";

export default {
  name: "PostService",
  data() {
    return {
      prueba: [],
      request: {
        passengerMail: "",
        time: "",
        date: Date,
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

      error: "",
      typeInput: "",
    };
  },
  components: {
    DirectionsMapView,
    Header,
    FooterwithBackground,
  },
  async mounted() {
    EventBus.$emit("passengerRoutes-data", this.routes);
    UserCo.getUser((data) => {
      this.request.passengerMail = data.user_mail;
    });

    for (let ref in this.$refs) {
      const autocomplete = new google.maps.places.Autocomplete(
        this.$refs[ref],
        {
          bounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(45.4215296, -75.6971931)
          ),
          componentRestrictions: { country: "co" },
          //types: ["address"],
        }
      );
      EventBus.$on("point", (point) => {
        try {
          this.$refs[this.typeInput].value = point.favAddress;
          this.request[this.typeInput].address = point.favAddress;
          this.request[this.typeInput].lat = parseFloat(point.favLatitude);
          this.request[this.typeInput].lng = parseFloat(point.favLongitude);
        } catch (error) {
          console.log("");
        }
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        this.request[ref].address = `${place.name}, ${place.vicinity}`;
        this.request[ref].lat = place.geometry.location.lat();
        this.request[ref].lng = place.geometry.location.lng();
      });
    }
  },
  methods: {
    goToPassenger() {
      this.$router.push("/passenger");
    },
    calculateButtonPressed() {
      if (
        this.request.origin.address === "" ||
        this.request.destination.address === ""
      ) {
        this.createToast(
          "Por favor completa los campos de lugar de salida y llegada",
          "Campos incompletos",
          "danger"
        );
      } else {
        const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=${this.request.origin.lat},${this.request.origin.lng}&destinations=${this.request.destination.lat},${this.request.destination.lng}&key=AIzaSyAxm0QLs59dJ34JezS4XmSs75bHKrFUBz0`;
        axios
          .get(URL)
          .then((response) => {
            console.log(response);
            if (response.data.error_message) {
              this.error = response.data.error_message;
            } else {
              const elements = response.data.rows[0].elements;

              if (elements[0].status === "ZERO_RESULTS") {
                this.error = "No Results Found.";
              } else {
                this.request.distance = elements[0].distance;
                this.request.duration = elements[0].duration;
              }
              EventBus.$emit("passengerRoutes-data", [this.request]);
            }
          })
          .catch((error) => {
            console.log(URL);
            console.log(error.message);
            this.error = error.message;
          });
      }
    },
    saveRoute() {
      if (
        this.request.time === "" ||
        this.request.date === "" ||
        this.request.origin.address === "" ||
        this.request.destination.address === ""
      ) {
        this.createToast(
          "Por favor completa todos los campos",
          "Campos incompletos",
          "danger"
        );
      } else {
        RequestCo.createRequest(this.request, (response) => {
          if (response == 201) {
            this.createToast(
              "¡Postulación Almacenada Correctamente!",
              "Postulación Almacenada",
              "success"
            );
          } else {
            this.createToast("¡Hubo un Error con la BD!", "Error", "danger");
          }
        });
      }
    },
    locatorButtonPressed() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            EventBus.$emit("newMarker", [
              position.coords.latitude,
              position.coords.longitude,
            ]);
          },
          (Error) => {
            this.error = "El localizador no encuentra tu ubicación " + Error;
          }
        );
      }
    },
    createToast(toast, title, variant) {
      this.$bvToast.toast(toast, {
        title: title,
        autoHideDelay: 5000,
        appendToast: true,
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>

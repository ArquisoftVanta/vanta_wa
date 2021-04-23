<template>
  <section class="">
    <div class="form">
      <Directions state="Choose Direction" />

      <h4>Postula tu ruta</h4>
      <div v-show="error">{{ error }}</div>
      <div class="four fields">
        <div class="field">
          <div class="form-inline mb-3">
            <input
              type="text"
              placeholder="Origen"
              ref="origin"
              class="form-control"
              style="border: 0; background: #f1f1f1; width: 100%"
              required
            />
            <!--button
              type="button"
              class="btn btn-dark"
              data-toggle="modal"
              data-target="#modalDirections"
              @click="typeInput = 'origin'"
            >
              +
            </button-->
          </div>
        </div>
        <div class="field">
          <div class="form-inline mb-3">
            <input
              type="text"
              placeholder="Destino"
              ref="destination"
              class="form-control"
              style="border: 0; background: #f1f1f1; width: 100%"
              required
            />
            <!--button
              type="button"
              class="btn btn-dark"
              data-toggle="modal"
              data-target="#modalDirections"
              @click="typeInput = 'destination'"
            >
              +
            </button-->
          </div>
        </div>
        <div class="field">
          <div>
            <input
              v-model="request.time"
              type="time"
              placeholder="Tiempo"
              class="form-control mb-2"
              style="border: 0; background: #f1f1f1"
              required
            />
          </div>
        </div>
        <div class="field">
          <div>
            <input
              v-model="request.date"
              type="date"
              placeholder="Fecha"
              class="form-control mb-3"
              style="border: 0; background: #f1f1f1"
              required
            />
          </div>
        </div>
        <button
          class="btn btn-dark btn-block button mb-2"
          @click="calculateButtonPressed"
        >
          Ver ruta
        </button>
        <button
          class="btn btn-dark btn-block button mb-2"
          @click="saveRoute"
          data-toggle="modal"
        >
          Guardar ruta
        </button>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import firebase from "firebase";
import { EventBus } from "@/EventBus.js";
import UserSC from "../serviceClients/UserServiceClient";
import Directions from "../components/WatchCurrentDirections";
import Request from "../peticiones/requestClient";

export default {
  components: {
    Directions,
  },
  data() {
    return {
      prueba : [],
      request:{
        passengerMail: "ojtinjacar@unal.edu.co",
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
        }
      },
      error: "",
      typeInput: "",
    };
  },

    async mounted() {
    //this.prueba = await Request.createCoordinates(this.coodinates);
    //console.log(this.prueba)
    this.getUserDB();
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
    getUserDB() {
      UserSC.getUser((data) => {
        this.request.passengerMail = data.userMail;
        this.request.passengerName = data.userName;
      });
    },
    calculateButtonPressed() {
      const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=${this.request.origin.lat},${this.request.origin.lng}&destinations=${this.request.destination.lat},${this.request.destination.lng}&key=AIzaSyAxm0QLs59dJ34JezS4XmSs75bHKrFUBz0`;
      axios
        .get(URL)
        .then((response) => {
          if (response.data.error_message) {
            this.error = response.data.error_message;
          } else {
            const elements = response.data.rows[0].elements;

            if (elements[0].status === "ZERO_RESULTS") {
              this.error = "No Results Found.";
            } else {
              this.route.distance = elements[0].distance;
              this.route.duration = elements[0].duration;
            }
            EventBus.$emit("passengerRoutes-data", [this.route]);
          }
        })
        .catch((error) => {
          console.log(error.message);
          this.error = error.message;
        });
    },
    saveRoute() {
      console.log(this.request)
      Request.createRequest(this.request)
      /*if (this.route.time === "" || this.route.date === ""||this.route.origin.address === "" || this.route.destination.address === "")  {
        this.$bvToast.toast("Revisa los campos por llenar!", {
          title: "Error",
          autoHideDelay: 2000,
          appendToast: true,
          variant: "danger",
          solid: true,
        });
      } else {
        const db = firebase.firestore();
        this.route.selected = false;
        this.route.servicePerformed = false;
        db.collection("passengerRoutes").doc().set(this.route);
        this.$bvToast.toast("¡Ruta Almacenada Correctamente!", {
          title: "Ruta Almacenada",
          autoHideDelay: 2000,
          appendToast: true,
          variant: "success",
          solid: true,
        });
      }*/
    },
  },
};
</script>
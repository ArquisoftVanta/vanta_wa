<template>
  <div>
    <section class="route-list-view">
      <div class="route-list-view-header">
        <div class="row">
          <div class="col">
            <select
              id="inputState2"
              class="form-control"
              style="border: 0; background: #f1f1f1"
              v-model="selected"
            >
              <option disabled value="">Número de Pasajeros</option>
              <option>4</option>
              <option>3</option>
              <option>2</option>
              <option>1</option>
              <option>0</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button
              type="button"
              class="btn btn-dark btn-block button"
              style="margin: 5% 0 0 0"
              @click="sendPassengerItemPressed()"
              data-dismiss="modal"
            >
              Confirmar Pasajeros
            </button>
          </div>
        </div>
      </div>
      <div class="accordion" id="accordionExample56">
        <div class="card" v-for="route in routes" :key="route[0].request_id">
          <div class="card-header" id="headingOne">
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
                Destino: {{ route[1][1].address.split(",")[0] }}
              </button>
            </h2>
          </div>
          <div
            :id="`data${route[0].request_id}`"
            class="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordionExample56"
          >
            <div class="card-body">
              <div>Correo: {{ route[0].user_id }}</div>
              <div>Salida: {{ route[1][0].address.split(",")[0] }}</div>
              <div>Día de Salida: {{ route[0].date }}</div>
              <div>Hora de Salida: {{ route[0].time }}</div>
              <div class="row">
                <div class="col">
                  <button
                    type="button"
                    class="btn btn-dark btn-block button"
                    @click="choosePassengerItemPressed(route)"
                    style="margin: 5% 0 5% 0"
                    data-toggle="modal"
                    data-target="#modalConfirmation"
                  >
                    Seleccionar pasajero
                  </button>
                </div>
                <div class="col">
                  <button
                    type="button"
                    class="btn btn-dark btn-block button"
                    @click="cancelPassengerItemPressed(route)"
                    style="margin: 5% 0 5% 0"
                  >
                    Cancelar pasajero
                  </button>
                </div>
                <div class="col">
                  <button
                    type="button"
                    class="btn btn-dark btn-block button"
                    style="margin: 5% 0 5% 0"
                    @click="routePassengerItemPressed(route)"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    Ver ruta del pasajero
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from "firebase";
import { EventBus } from "@/EventBus.js";
import RequestCo from "../controller/RequestController";

export default {
  components: {
  },
  data() {
    return {
      routes: [],
      routesMyself: [],
      routesSelected: [],
      selected: "",
      quotaMessage: "",
      confirmed: "",
      date: [],
      hours: [],
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
      datefilter: "",
      hoursfilter: "",
      userMail: "",
    };
  },
  mounted() {
    this.getListPassengersActives();
  },
  methods: {
    getListPassengersActives() {
      RequestCo.getRequestsbyActive((call) => {
        this.routes = call;
      });
  
    },
    /**
     * Esta función enviar la ruta del pasajero al componente
     * "DirectionsMapView" para pintar la ruta del pasajero en el mapa.
     */
    routePassengerItemPressed(route) {
      this.request.origin.lat = Number(route[1][0].lat);
      this.request.origin.lng = Number(route[1][0].lng);
      this.request.origin.address = route[1][0].address;
      this.request.destination.lat = Number(route[1][1].lat);
      this.request.destination.lng = Number(route[1][1].lng);
      this.request.destination.address = route[1][1].address;
      EventBus.$emit("passengerRoutes-data", [this.request]);
    },
    /**
     * Esta función, envia la lista de pasajeros a llevar al componente "Create Service"
     */
    sendPassengerItemPressed() {
      EventBus.$emit("choosePassengerRoutes-data", this.routesSelected);
      this.toast(
        "Los pasajeros han sido confirmados, por favor, dirígete a seleccionar tu vehículo.",
        "Pasajeros Seleccionados",
        "success"
      );
    },
    /**
     * Esta función, avisa al conductor cuando ha seleccionado a un pasajero
     * Y actualiza el numero de pasajero para completar su servicio.
     */
    toast(text, title, varian) {
      this.$bvToast.toast(text, {
        title: title,
        autoHideDelay: 5000,
        appendToast: true,
        variant: varian,
        solid: true,
      });
    },
    choosePassengerItemPressed(route) {
      if (this.selected === "") {
        this.toast(
          "Primero escoja el número de pasajeros que desea llevar",
          "Error",
          "danger"
        );
      } else {
        this.selected = this.selected - 1;
        if (this.selected == 0) {
          this.routesSelected.push(route);
          this.toast(
            "Cupo completado, por favor confirme los pasajeros",
            "Pasajero Seleccionado",
            "success"
          );
        } else if (this.selected < 0) {
          this.selected = 0;
          this.toast(
            "No puede ingresar más pasajeros, confirme pasajeros o cancele alguno.",
            "Operación fallida.",
            "success"
          );
        } else {
          this.routesSelected.push(route);
          this.toast(
            "Número de cupos: " + this.selected,
            "Pasajero Seleccionado",
            "success"
          );
        }
      }
    },
    cancelPassengerItemPressed(route) {
      var count = 0;
      for (let index = 0; index < this.routesSelected.length; index++) {
        if (route === this.routesSelected[index]) {
          this.routesSelected.splice(index, 1);
          count++;
          this.toast("Usuario Cancelado Correctamente", "Hecho", "success");
          this.selected = this.selected + 1;
        }
      }
      if (count == 0) {
        this.toast(
          "Este pasajero no se encuentra en la lista.",
          "Error",
          "success"
        );
      }
    },
  },
};
</script>

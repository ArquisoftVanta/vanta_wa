<template>
  <div>
    <section class="route-list-view">
      <div class="route-list-view-header"></div>
      <div class="accordion" id="accordionExample">
        <div class="card" v-for="route in routes" :key="route.id">
          <div class="card-header" id="headingOne">
            <h2 class="mb-0">
              <button
                class="btn btn-link btn-block text-left"
                type="button"
                data-toggle="collapse"
                :data-target="`#data${route.id}`"
                aria-expanded="true"
                :aria-controls="`data${route.id}`"
                style="color: #06416d"
              >
                Origen: {{ route.origin.address }} <br />
                Destino: {{ route.destination.address }}
              </button>
            </h2>
          </div>
          <div
            :id="`data${route.id}`"
            class="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div class="card-body">
              <div>Distancia: {{ route.distance.text }}</div>
              <div>Tiempo aproximado: {{ route.duration.text }}</div>
              <div class="row">
                <div class="col">
                  <button
                    type="button"
                    class="btn btn-dark btn-block button"
                    style="margin: 5% 0 5% 0"
                    @click="routePassengerItemPressed(route)"
                  >
                    Ver Ruta
                  </button>
                </div>
                <div class="col"></div>
                <div class="col">
                  <button
                    type="button"
                    class="btn btn-dark btn-block button"
                    style="margin: 5% 0 5% 0"
                    @click="deleteRoute(route)"
                  >
                    Eliminar ruta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div
      class="modal fade"
      id="modalConfirmation"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalConfirmationLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ this.confirmed }}</h5>
          </div>
          <div class="modal-body">
            {{ this.quotaMessage }}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              onclick="$('#modalConfirmation').modal('hide');"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { EventBus } from "@/EventBus.js";
export default {
  components: {},
  data() {
    return {
      routes: [],
      routesSelected: [],
      selected: "",
      quotaMessage: "",
      confirmed: "",
    };
  },
  created() {
    const db = firebase.firestore();
    db.collection("passengerRoutes").onSnapshot((snap) => {
      this.routes = [];
      snap.forEach((doc) => {
        let route = doc.data();
        route.id = doc.id;
        this.routes.push(route);
      });
    });
  },
  methods: {
    routePassengerItemPressed(route) {
      EventBus.$emit("passengerRoutes-data", [route]);
    },
    deleteRoute(route) {
      const db = firebase.firestore();
      db.collection("passengerRoutes")
        .doc(route.id)
        .delete();
    },
  },
};
</script>

<style scoped>
.route-list-view-header {
  padding: 10px;
}

.item {
  padding: 10px;
  cursor: pointer;
}

.item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.show-all {
  padding: 4px 10px;
}
#modalConfirmation {
  margin: 20% 0 0 -0.6%;
}
</style>

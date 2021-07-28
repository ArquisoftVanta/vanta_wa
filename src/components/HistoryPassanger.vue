<template>
  <div class="container-fluid overflow-auto">
    <div class="list-group">
      <div class="accordion" id="accordionExample">
        <div
          class="card border shadow-sm mt-2 mb-2 bg-white rounded"
          v-for="route in routes"
          :key="route.id"
        >
          <p class="mb-0">
            <button
              class="btn btn-dark btn-block btn-sm text-white text-center text-wrap"
              type="button"
              :data-target="`#data${route.id}`"
              aria-expanded="true"
              :aria-controls="`data${route.id}`"
              style="color: #06416d"
              @click="routePassengerItemPressed(route)"
            >
              {{ route.destination.address }}
            </button>
          </p>
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
      routeSelected: [],
      selected: "",
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
      this.$bvToast.toast("¡Ruta Cargada Correctamente!", {
        title: "Ruta Cargada",
        autoHideDelay: 4000,
        appendToast: true,
        variant: "success",
        solid: true,
      });
    },
  },
};
</script>

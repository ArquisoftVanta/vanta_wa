<template>
  <div>
    <Header></Header>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Tus rutas</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body"><MyRoutesList /></div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-dark"
              data-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="container-fluid mb-5">
        <div class="row">
          <div class="col-12 col-md-4 offset-md-1">
            <div class="createservice card mb-5 mb-md-0">
              <div class="card-body">
                <OriginDestination />
                <button
                  type="button"
                  class="btn btn-dark btn-block btn-sm"
                  @click="locatorButtonPressed"
                >
                  ¡Ubicame!
                </button>
              </div>
            </div>
          </div>
          <div
            class="col-12 col-md-6 mb-5 mb-md-0"
          >
            <DirectionsMapView></DirectionsMapView>
          </div>
        </div>
      </div>
    </div>
    <FooterwithBackground></FooterwithBackground>
  </div>
</template>

<script>
import MyRoutesList from "../components/MyRoutesList.vue";
import OriginDestination from "../components/OriginDestinationForm";
import { EventBus } from "@/EventBus.js";
import DirectionsMapView from "../components/DirectionsMapView.vue";
import Header from "../components/Header.vue";
import FooterwithBackground from "../components/FooterwithBackground.vue";

export default {
  name: "PostService",
  data() {
    return {};
  },
  components: {
    OriginDestination,
    DirectionsMapView,
    MyRoutesList,
    Header,
    FooterwithBackground
  },
  mounted() {
    EventBus.$emit("passengerRoutes-data", this.routes);
  },
  methods: {
    goToPassenger() {
      this.$router.push("/passenger");
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
          (error) => {
            this.error = "El localizador no encuentra tu ubicación";
          }
        );
      }
    },
  },
};
</script>
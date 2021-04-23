<template>
  <div
    class="modal fade"
    id="modalDirections"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Mis Direcciones</h5>
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
          <div class="accordion" id="accordionExample">
            <div
              class="card"
              v-for="route in listRoutes"
              :key="route.idFavoriteDirection"
            >
              <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                  <button
                    class="btn btn-link btn-block text-left"
                    type="button"
                    data-toggle="collapse"
                    :data-target="`#data${route.idFavoriteDirection}`"
                    aria-expanded="true"
                    :aria-controls="`data${route.idFavoriteDirection}`"
                    style="color: #06416d"
                  >
                    Nombre: {{ route.nameFd }}
                  </button>
                </h2>
              </div>
              <div
                :id="`data${route.idFavoriteDirection}`"
                class="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  <div>{{ route.favAddress }}</div>
                  <div class="row">
                    <div class="col">
                      <button
                        type="button"
                        class="btn btn-outline-dark btn-block button"
                        style="margin: 5% 0 5% 0"
                        @click="showPoint(route)"
                      >
                        Ver Dirección
                      </button>
                    </div>
                    <div class="col">
                      <button
                        type="button"
                        class="btn btn-outline-dark btn-block button"
                        @click="sendPoint(route)"
                        style="margin: 5% 0 5% 0"
                        data-dismiss="modal"
                      >
                        {{ button }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="visibilityMap">
              <DirectionsMapView class="map" />
            </div>
          </div>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import DirectionsMapView from "../components/DirectionsMapView.vue";
import FavoriteServiceClient from "../serviceClients/FavoriteServiceCliente";
import { EventBus } from "@/EventBus.js";

export default {
  name: "WatchCurrentDirections",
  components: {
    DirectionsMapView,
  },
  props: ["state"],
  data() {
    return {
      listRoutes: [],
      button: "",
    };
  },
  mounted() {
    this.nameButton();
    this.showDirections();
  },
  methods: {
    showDirections() {
      FavoriteServiceClient.getDirectionsByUser((response) => {
        this.listRoutes = response;
      });
    },
    sendPoint(route) {
      if (this.button === "Eliminar Dirección") {
        FavoriteServiceClient.deleteDirection(route, (response) => {
          if (response === 201) {
            this.$bvToast.toast("¡Dirección Eliminada Correctamente!", {
              title: "Dirección Eliminada",
              autoHideDelay: 5000,
              appendToast: true,
              variant: "success",
              solid: true,
            });
          } else {
            this.$bvToast.toast("¡Por favor verifique los datos ingresados!", {
              title: "Datos invalidos",
              autoHideDelay: 5000,
              appendToast: true,
              variant: "danger",
              solid: true,
            });
          }
        });
      } else {
        EventBus.$emit("point", route);
      }
    },
    nameButton() {
      var x = document.getElementById("visibilityMap");
      if (this.state == "Watch Direction") {
        x.style.display = "block";
        this.button = "Eliminar Dirección";
      } else if (this.state == "Choose Direction") {
        this.button = "Escoger Dirección";
        x.style.display = "none";
      }
    },
    showPoint(route) {
      EventBus.$emit("generateMarker", route);
    },
  },
};
</script>
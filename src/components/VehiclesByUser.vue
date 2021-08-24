<template>
  <div>
    <div
      class="modal fade"
      id="modalVehicles"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalVehicles"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Mis Vehículos</h5>
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
                v-for="vehicle in listVehicles"
                :key="vehicle.id"
              >
                <div class="card-header" id="headingOne">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link btn-block text-left"
                      type="button"
                      data-toggle="collapse"
                      :data-target="`#data${vehicle.id}`"
                      aria-expanded="true"
                      :aria-controls="`data${vehicle.id}`"
                      style="color: #06416d"
                    >
                      Placa: {{ vehicle.license_plate }}
                    </button>
                  </h2>
                </div>
                <div
                  :id="`data${vehicle.id}`"
                  class="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <div>Marca: {{ vehicle.brand }}</div>
                    <div>Tipo: {{ vehicle.vehicle_type }}</div>
                    <div>Color: {{ vehicle.color }}</div>
                    <div class="row">
                      <div class="col">
                        <button
                          type="button"
                          class="btn btn-outline-dark btn-block button"
                          @click="chooseSelection(vehicle)"
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
            </div>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
    <div>
      <div id="modalAlert" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Advertencia</h5>
            </div>
            <div class="modal-body">
              <p>No existen vehículos asociados con tu usuario.</p>
              <p>Serás redireccionado al menú principal.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="goToHome">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus.js";
import VehicleCo from "../controller/VehicleController";

export default {
  name: "VehiclesByUser",
  components: {},
  props: ["state"],
  data() {
    return {
      listVehicles: [],
      button: "",
      modalActive: Boolean,
    };
  },
  mounted() {
    this.nameButton();
    this.showVehicles();
  },
  methods: {
    showVehicles() {
      let x = document.getElementById("modalAlert");
      VehicleCo.obtenerVehiculo((res) => {
        this.listVehicles = res;
        if (this.listVehicles != 0) {
          x.style.display = "none";
        } else {
          if (!this.modalActive) {
            x.style.display = "block";
          }
        }
      });
    },
    chooseSelection(vehicle) {
      EventBus.$emit("vehicle", vehicle);
    },
    sendVehicleList(list) {
      EventBus.$emit("vehicle", list);
    },
    goToHome() {
      this.$router.push("/home");
    },
    nameButton() {
      if (this.state == "Choose Vehicle") {
        this.button = "Escoger Vehículo";
      } else {
        this.button = "Escoger Vehículo";
        this.modalActive = false;
      }
    },
  },
};
</script>

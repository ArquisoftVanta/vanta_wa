<template>
  <div id="driver">
    <Header></Header>
    <div class="container-fluid mb-4">
      <div class="row">
        <div class="col-12 col-md-6 mb-5">
          <div
            class="card bg-dark text-white border shadow rounded text-center mr-0 ml-0 mr-sm-5 ml-sm-5"
            type="button"
            @click="goToCreateService"
          >
            <img
              class="card-img-top"
              src="~@/assets/nueva.jpg"
              alt="Card image cap"
            />
            <div class="card-body">
              <h4 class="card-title d-none d-md-block mb-0">
                Nuevo servicio
              </h4>
              <h5 class="card-title d-block d-md-none mb-0">
                Nuevo servicio
              </h5>
              <p class="card-text d-none d-md-block mb-0">
                <small>
                  Crea un
                  <strong>nuevo servicio</strong> que estará a disposición de
                  todos los <strong>pasajeros</strong>.</small
                >
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 mb-5">
          <div
            class="card bg-dark text-white border shadow rounded text-center mr-0 ml-0 mr-sm-5 ml-sm-5"
            type="button"
            @click="goToMyServices"
          >
            <img
              class="card-img-top"
              src="~@/assets/servicios.jpg"
              alt="Card image cap"
            />
            <div class="card-body">
              <h4 class="card-title d-none d-md-block mb-0">
                Servicios actuales
              </h4>
              <h5 class="card-title d-block d-md-none mb-0">
                Servicios actuales
              </h5>
              <p class="card-text d-none d-md-block mb-0">
                <small>
                  Observa todos los <strong>servicios</strong> que tienes
                  <strong>disponibles</strong> a los
                  <strong>pasajeros</strong>.</small
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterwithBackground></FooterwithBackground>
  </div>
</template>

<script>
import Header from "../components/Header";
import FooterwithBackground from "../components/FooterwithBackground.vue";

export default {
  name: "Driver",
  props: {
    nombre: String,
  },
  components: {
    Header,
    FooterwithBackground,
  },
  data() {
    return {
      telefono: 0,
    };
  },
  methods: {
    goToHome() {
      this.$router.push("/home");
    },
    goToCreateService() {
      this.$router.push("/create-service");
    },
    goToMyServices() {
      this.$router.push({ name: "route-services" });
    },
    goToViewPassengers() {
      this.$router.push("/view-passengers");
    },
  },
};
</script>
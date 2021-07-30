<template>
  <div id="driver">
    <Header></Header>
    <div class="container-fluid mb-5">
      <div class="row justify-content-lg-around">
        <div class="col-12 col-lg-5 mb-3 mb-lg-0 mr-0 ml-0">
          <div
            class="card bg-dark shadow text-left text-md-center mr-0 ml-0"
            type="button"
            @click="goToCreateService"
          >
            <img
              class="card-img-top"
              src="~@/assets/driver.jpg"
              alt="new-service"
            />
            <div class="card-body">
              <h1 class="card-title text-warning text-left text-md-center lead">
                Nuevo servicio
              </h1>
              <p class="card-text text-light mb-2">
                Crea un
                <strong class="text-warning">nuevo servicio</strong>
                 y seleeciona a tus
                <strong class="text-warning">pasajeros</strong>.
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-5 mb-3 mb-lg-0 mr-0 ml-0">
          <div
            class="card bg-dark shadow text-left text-md-center mr-0 ml-0"
            type="button"
            @click="goToMyServices"
          >
            <img
              class="card-img-top"
              src="~@/assets/services.jpg"
              alt="actual-services"
            />
            <div class="card-body">
              <h1 class="card-title text-warning text-left text-md-center lead">
                Historial de servicios
              </h1>
              <p class="card-text text-light mb-2">
                Mira tu historial de
                <strong class="text-warning">servicios disponibles</strong>
                y realizados.
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

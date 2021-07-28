<template>
  <div id="driver">
    <Header></Header>
    <div class="container-fluid mb-5">
      <div class="row">
        <div class="col-12 col-md-6 mb-5 mb-md-0">
          <div
            class="card bg-light text-white shadow rounded border border-dark text-center text-dark mr-0 ml-0 mr-sm-5 ml-sm-5"
            type="button"
            @click="goToCreateService"
          >
            <img
              class="card-img-top"
              src="~@/assets/new1.jpg"
              alt="new-service"
            />
            <div class="card-body">
              <h3 class="card-title d-none d-md-block font-weight-bold">
                Nuevo servicio
              </h3>
              <h3
                class="card-title d-block d-md-none mb-0 font-weight-bold text-left"
              >
                Nuevo servicio
              </h3>
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
        <div class="col-12 col-md-6 mb-5 mb-md-0">
          <div
            class="card bg-light text-white shadow rounded border border-dark text-center text-dark mr-0 ml-0 mr-sm-5 ml-sm-5"
            type="button"
            @click="goToMyServices"
          >
            <img
              class="card-img-top"
              src="~@/assets/services.jpg"
              alt="actual-services"
            />
            <div class="card-body">
              <h3 class="card-title d-none d-md-block font-weight-bold">
                Servicios actuales
              </h3>
              <h3
                class="card-title d-block d-md-none mb-0 font-weight-bold text-left"
              >
                Servicios actuales
              </h3>
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

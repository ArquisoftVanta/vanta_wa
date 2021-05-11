<template>
  <div id="passenger">
    <Header></Header>
    <div class="container-fluid mb-5">
      <div class="row">
        <div class="col-12 col-md-6 mb-5 mb-md-0">
          <div
            class="card bg-light text-white shadow rounded border border-dark text-center text-dark mr-0 ml-0 mr-sm-5 ml-sm-5"
            type="button"
            @click="goToPostulation"
          >
            <img
              class="card-img-top"
              src="~@/assets/postulate.jpg"
              alt="postulate-image"
            />
            <div class="card-body">
              <h3 class="card-title d-none d-md-block font-weight-bold">
                Postularte a servicios
              </h3>
              <h3 class="card-title d-block d-md-none mb-0 font-weight-bold text-left">
                Postularte a servicios
              </h3>
              <p class="card-text d-none d-md-block mb-0">
                <small>
                  Postulate a un
                  <strong>servicio disponible</strong> como
                  <strong>pasajero</strong>.</small
                >
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 mb-5 mb-md-0">
          <div
            class="card bg-light text-white shadow rounded border border-dark text-center text-dark mr-0 ml-0 mr-sm-5 ml-sm-5"
            type="button"
            @click="goToHistory"
          >
            <img
              class="card-img-top"
              src="~@/assets/historial.jpg"
              alt="historical-image"
            />
            <div class="card-body">
              <h3 class="card-title d-none d-md-block font-weight-bold">
                Historial de servicios
              </h3>
              <h3 class="card-title d-block d-md-none mb-0 font-weight-bold text-left">
                Historial de servicios
              </h3>
              <p class="card-text d-none d-md-block mb-0">
                <small>
                  Mira tu historial de
                  <strong>servicios realizados</strong> como
                  <strong>pasajero</strong>.</small
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
  name: "Passenger",
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
    goToPostulation() {
      this.$router.push("/post-service");
    },
    goToPassangerProfile() {
      this.$router.push("/passenger-profile");
    },
    goToHistory() {
      this.$router.push("/nomination-services");
    },
  },
};
</script>

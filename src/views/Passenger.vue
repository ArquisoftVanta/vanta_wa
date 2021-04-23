<template>
  <div id="passenger">
    <Header></Header>
    <div class="container-fluid mb-5">
      <div class="row">
        <div class="col-12 col-md-2 offset-md-5 mt-4">
          <button
            class="btn btn-dark btn-block btn-lg"
            type="button"
            @click="goToHome"
          >
            Atrás
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 mt-4 mb-5">
          <div
            class="card bg-dark text-white border shadow rounded text-center mr-0 ml-0 mr-sm-5 ml-sm-5"
            type="button"
            @click="goToHistory"
          >
            <img
              class="card-img-top"
              src="~@/assets/historial.jpg"
              alt="Card image cap"
            />
            <div class="card-body">
              <h4 class="card-title d-none d-md-block mb-0">
                Historial de servicios
              </h4>
              <h5 class="card-title d-block d-md-none mb-0">
                Historial de servicios
              </h5>
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
        <div class="col-12 col-md-6 mt-4 mb-5">
          <div
            class="card bg-dark text-white border shadow rounded text-center mr-0 ml-0 mr-sm-5 ml-sm-5"
            type="button"
            @click="goToPostulation"
          >
            <img
              class="card-img-top"
              src="~@/assets/postularse.jpg"
              alt="Card image cap"
            />
            <div class="card-body">
              <h4 class="card-title d-none d-md-block mb-0">
                Postularte a servicios
              </h4>
              <h5 class="card-title d-block d-md-none mb-0">
                Postularte a servicios
              </h5>
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

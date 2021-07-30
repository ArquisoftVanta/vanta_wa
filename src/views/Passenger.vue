<template>
  <div id="passenger">
    <Header></Header>
    <div class="container-fluid mb-5">
      <div class="row justify-content-lg-around">
        <div class="col-12 col-lg-5 mb-3 mb-lg-0 mr-0 ml-0">
          <div
            class="card bg-dark shadow text-left text-md-center mr-0 ml-0"
            type="button"
            @click="goToPostulation"
          >
            <img
              class="card-img-top"
              src="~@/assets/postulate.jpg"
              alt="postulate-image"
            />
            <div class="card-body">
              <h1 class="card-title text-warning text-left text-md-center lead">
                Postulate a un servicio
              </h1>
              <p class="card-text text-light mb-2">
                Postula tu ruta y un
                <strong class="text-warning">conductor</strong> te seleccionará como
                <strong class="text-warning">pasajero</strong>.
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-5 mb-3 mb-lg-0 mr-0 ml-0">
          <div
            class="card bg-dark shadow text-left text-md-center mr-0 ml-0"
            type="button"
            @click="goToHistory"
          >
            <img
              class="card-img-top"
              src="~@/assets/historial.jpg"
              alt="historical-image"
            />
            <div class="card-body">
              <h1 class="card-title text-warning text-left text-md-center lead">
                Historial de servicios
              </h1>
              <p class="card-text text-light mb-2">
                Mira tu historial de
                <strong class="text-warning">servicios actuales</strong> y
                realizados.
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

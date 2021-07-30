<template>
  <div id="home">
    <Header></Header>
    <div class="container-fluid mb-5 mh-100">
      <div class="row justify-content-lg-around">
        <div class="col-12 col-lg-4 mb-3 mb-lg-0 mr-0 ml-0">
          <div
            class="card bg-dark shadow text-left text-md-center mr-0 ml-0"
            type="button"
            @click="goToDrive"
          >
            <img class="card-img-top" src="~@/assets/driver.jpg" alt="driver" />
            <div class="card-body">
              <h1
                class="card-title display-5 d-none d-md-block text-warning font-weight-bold"
              >
                Conductor
              </h1>
              <h1
                class="card-title d-block d-md-none mb-0 text-warning font-weight-bold"
              >
                Conductor
              </h1>
              <p class="card-text text-light mb-2">
                Como
                <strong class="text-warning font-weight-bold">conductor</strong>
                puedes crear servicios y seleccionar a tus pasajeros.
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4 mb-3 mb-lg-0 mr-0 ml-0">
          <div
            class="card bg-dark shadow text-left text-md-center mr-0 ml-0"
            type="button"
            @click="goToPassenger"
          >
            <img
              class="card-img-top"
              src="~@/assets/passenger.jpg"
              alt="passenger"
            />
            <div class="card-body">
              <h1
                class="card-title display-5 d-none d-md-block text-warning font-weight-bold"
              >
                Pasajero
              </h1>
              <h1
                class="card-title d-block d-md-none mb-0 text-warning font-weight-bold"
              >
                Pasajero
              </h1>
              <p class="card-text text-light mb-2">
                Como
                <strong class="text-warning font-weight-bold">pasajero</strong>
                puedes postularte a cualquier servicio para viajar acompañado.
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
import Header from "../components/Header.vue";
import FooterwithBackground from "../components/FooterwithBackground.vue";

export default {
  name: "Home",
  props: {
    nombre: String,
  },
  components: {
    Header,
    FooterwithBackground,
  },
  data() {
    return {};
  },
  methods: {
    goToPassenger() {
      this.$router.push("/passenger");
    },
    goToDrive() {
      this.$router.push("/driver");
    },
  },
  beforeCreate() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/");
    }
  },
};
</script>
<style>
</style>

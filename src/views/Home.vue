<template>
  <div id="home">
    <Header></Header>
    <div class="container-fluid mb-5">
      <div class="row">
        <div class="col-12 col-md-6 mb-5 mb-md-0">
          <div
            class="card bg-light text-white shadow rounded border border-dark text-center text-dark mr-0 ml-0 mr-sm-5 ml-sm-5"
            type="button"
            @click="goToDrive"
          >
            <img
              class="card-img-top"
              src="~@/assets/driver.jpg"
              alt="driver-image"
            />
            <div class="card-body">
              <h3 class="card-title d-none d-md-block font-weight-bold">Conductor</h3>
              <h3 class="card-title d-block d-md-none mb-0 font-weight-bold text-left">Conductor</h3>
              <p class="card-text d-none d-md-block mb-0">
                <small>
                  Descubre todo lo que la plataforma tiene para ti como
                  <strong>conductor</strong>.</small
                >
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 mb-5 mb-md-0">
          <div
            class="card bg-light text-white shadow rounded border border-dark text-center text-dark mr-0 ml-0 mr-sm-5 ml-sm-5"
            type="button"
            @click="goToPassenger"
          >
            <img
              class="card-img-top"
              src="~@/assets/passenger1.jpg"
              alt="passenger-image"
            />
            <div class="card-body">
              <h3 class="card-title d-none d-md-block font-weight-bold">Pasajero</h3>
              <h3 class="card-title d-block d-md-none mb-0 font-weight-bold text-left">Pasajero</h3>
              <p class="card-text d-none d-md-block mb-0">
                <small
                  >Descubre todo lo que la plataforma tiene para ti como
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
  name: "Home",
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
.card-img-top {
    min-height: 20vh;
    object-fit: cover;
}
</style>
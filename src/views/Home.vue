<template>
  <div id="home">
    <Header></Header>
    <div class="container-fluid mb-5">
      <div class="row">
        <div class="col-12 col-md-6 mt-4 mb-5">
          <div
            class="card bg-dark text-white border shadow rounded text-center mr-0 ml-0 mr-sm-5 ml-sm-5"
            type="button"
            @click="goToDrive"
          >
            <img
              class="card-img-top"
              src="~@/assets/driver.jpg"
              alt="Card image cap"
            />
            <div class="card-body">
              <h4 class="card-title d-none d-md-block mb-0">Conductor</h4>
              <h5 class="card-title d-block d-md-none mb-0">Conductor</h5>
              <p class="card-text d-none d-md-block mb-0">
                <small>
                  Descubre todo lo que la plataforma tiene para ti como
                  <strong>conductor</strong>.</small
                >
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 mt-4 mb-5">
          <div
            class="card bg-dark text-white rounded shadow border shadow text-center mr-0 ml-0 mr-sm-5 ml-sm-5"
            type="button"
            @click="goToPassenger"
          >
            <img
              class="card-img-top"
              src="~@/assets/passenger.jpg"
              alt="Card image cap"
            />
            <div class="card-body">
              <h4 class="card-title d-none d-md-block mb-0">Pasajero</h4>
              <h5 class="card-title d-block d-md-none mb-0">Pasajero</h5>
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
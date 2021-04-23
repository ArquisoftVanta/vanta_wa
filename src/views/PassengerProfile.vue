<template>
  <div>
    <Header></Header>
    <div>
      <div class="container-fluid mb-5">
        <div class="row">
          <div class="col-12 col-md-2 offset-md-5 mt-4">
            <button
              class="btn btn-dark btn-block btn-lg"
              type="button"
              @click="goToPassenger"
            >
              Atrás
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-lg-6 col-xl-3 offset-xl-1">
            <div class="card mt-4 pt-2">
              <img
                src="../assets/person.png"
                class="img-thumbnail align-self-center"
                alt=" Imagen de perfil"
              />
              <div class="card-body">
                <h5 class="card-title">Usuario</h5>
                <a type="button" class="btn btn-dark text-white btn-block">
                  Añadir ruta
                </a>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 col-xl-3 mt-4 mb-3">
            <h4>Tus viajes</h4>
            <history-passanger />
          </div>
          <div class="col-lg-12 col-xl-4 mt-0 mt-xl-4 mb-5">
            <DirectionsMapView />
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
import Foto from "@/assets/Enfermeria22.png";
import UserSC from "../serviceClients/UserServiceClient";
import DirectionsMapView from "../components/DirectionsMapView.vue";
import { EventBus } from "@/EventBus.js";
import HistoryPassanger from "./../components/HistoryPassanger.vue";

export default {
  name: "PassangerProfile",
  components: {
    Header,
    FooterwithBackground,
    DirectionsMapView,
    HistoryPassanger,
  },
  mounted() {
    EventBus.$emit("passengerRoutes-data", this.routes);
  },
  data() {
    return {
      Foto: Foto,
    };
  },
  props: {},

  methods: {
    goToPassenger() {
      this.$router.push("/passenger");
    },
    createUserDB() {
      UserSC.createUser(this.user, (response) => {
        console.log("Usuario creado " + response.status);
      });
    },
    getUserDB() {
      UserSC.getUser();
    },
    updateUser() {},
  },
};
</script>
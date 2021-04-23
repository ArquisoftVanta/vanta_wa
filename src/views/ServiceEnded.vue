<template>
  <div id="serviceEnded">
    <Header></Header>
    <div class="main-jumbo">
      <b-jumbotron
        header="¡Has llegado a tu destino!"
        lead="Esperamos que hayas tenido un viaje agradable, a continuación algunas cosas que puedes hacer ahora que llegaste."
      >
        <hr />
        <div class="row">
          <div class="col">
            <p>
              Califica al conductor y a los demás pasajeros para mejorar la
              calidad del servicio
            </p>
            <b-button variant="primary" v-b-modal.ratingModal
              >Calificar tripulantes</b-button
            >
          </div>
          <div class="col">
            <p>Volver al menú principal</p>
            <b-button variant="primary" href="#" @click="goToHome"
              >Menú Principal</b-button
            >
          </div>
        </div>
      </b-jumbotron>
    </div>
    <b-modal
      id="ratingModal"
      centered
      hide-footer
      title="Califica a tus compañeros de viaje"
      ok-only
    >
      <RideUsersList></RideUsersList>
    </b-modal>
    <FooterwithBackground></FooterwithBackground>
  </div>
</template>

<script>
import Header from "../components/Header";
import FooterwithBackground from "../components/FooterwithBackground.vue";
import RideUsersList from "../components/RideUsersList.vue";
export default {
  name: "ServiceEnded",
  components: {
    Header,
    FooterwithBackground,
    RideUsersList,
  },
  data() {
    return {
      informacion: "Información",
    };
  },
  methods: {
    goToHome() {
      this.$router.push("/home");
    },
  },
};
</script>

<style>
.main-jumbo {
  text-align: left;
  margin: 20vh 15vw 10vh 15vw;
}
</style>

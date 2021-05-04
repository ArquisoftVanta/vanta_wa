<template>
  <div class="fixed-bottom">
    <div id="footer" class="container-fluid align-middle">
      <div id="bottom-footer" class="row text-center">
        <div class="col-12 col-lg-6">
          <p class="text-white text-wrap mt-2 mb-2">
            © 2021 - Todos los derechos reservados.
          </p>
        </div>
        <div class="col-12 col-lg-6">
          <p class="text-white mt-2 mb-2" @click="goToAboutUs">
            Acerca de nosotros
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToAboutUs() {
      this.$router.push("about-us");
    },
  },
};
</script>

<style>
body {
  background-image: url("~@/assets/Enfermeria2.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

#footer {
  background-color: #212121;
}

#footer p {
  font-size: 11pt;
}
</style>

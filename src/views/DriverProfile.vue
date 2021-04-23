<template>
  <div>
    <Header></Header>
    <div>
      <div class="container">
        <div class="row align-items-start h-100">
          <div
            class="col-12 pl-md-5 pr-md-5 pl-lg-0 pr-lg-0 col-sm-12 col-md-12 col-lg-3 col-xl-3 mt-5 mb-5"
          >
            <div class="datosusuario card pt-3">
              <img
                src="../assets/person.png"
                class="img-thumbnail align-self-center h-25"
                alt=" Imagen de perfil"
              />
              <div class="card-body">
                <h5 class="card-title pt-3">{{ user.userName }}</h5>
              </div>
            </div>
          </div>
          <div
            class="col-12 pl-md-5 pr-md-5 pl-lg-5 pr-lg-5 col-sm-12 col-md-12 col-lg-3 col-xl-3 mt-5 mb-5"
          >
            <div class="list-group">
              <a
                href="#"
                class="list-group-item list-group-item-action disabled"
              >
                Recorridos realizados
              </a>
              <a href="#" class="list-group-item list-group-item-action"
                >Recorrido 1</a
              >
              <a href="#" class="list-group-item list-group-item-action"
                >Recorrido 2</a
              >
              <a href="#" class="list-group-item list-group-item-action"
                >Recorrido 3</a
              >
              <a href="#" class="list-group-item list-group-item-action"
                >Recorrido 4</a
              >
              <a href="#" class="list-group-item list-group-item-action"
                >Recorrido 5</a
              >
            </div>
          </div>
          <div
            class="col-12 pl-md-0 pr-md-0 col-sm-12 col-md-12 col-lg-9 col-xl-6 mt-lg-5 mt-0 mb-5"
          >
            <div class="datosvehiculo card card-body mb-5 h-100">
              <h5>Último recorrido</h5>
              <img
                src="../assets/person.png"
                class="img-thumbnail align-self-center h-25"
                alt=" Imagen de perfil"
              />
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
import Foto from "@/assets/Enfermeria22.png";
import UserSC from "../serviceClients/UserServiceClient";

export default {
  name: "Perfil",
  components: {
    Header,
    FooterwithBackground,
  },
  data() {
    return {
      Foto: Foto,
      user: {
        userName: "Gonzalo Diaz",
      },

      //Estado del botón que permite editar y guardar los cambios realizados a la información de un usuario
      estadoInput: true,
    };
  },
  props: {},

  methods: {
    getUserDB() {
      UserSC.getUser(1, (data) => {
        this.user.userName = data;
      });
    },
    updateUser() {},
  },
};
</script>

<style scoped>
.datosvehiculo {
  opacity: 95%;
}

.datosusuario {
  opacity: 95%;
}

.container {
  height: 85vh;
}
</style>

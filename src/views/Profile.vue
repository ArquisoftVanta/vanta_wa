<template>
  <div>
    <Header></Header>
    <div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 col-md-7 offset-lg-1 mt-0 mb-5">
            <div
              class="card card-body text-center text-dark border border-dark shadow"
            >
              <form>
                <h4 class="mb-4 font-weight-bold">Tus datos personales</h4>
                <div class="form-group">
                  <div class="input-group input-group-sm mb-2">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-sm"
                        >Nombre</span
                      >
                    </div>
                    <input
                      v-model="user.user_name"
                      id="validationDefault01"
                      type="text"
                      class="form-control"
                      placeholder="Nombre completo"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      disabled
                    />
                  </div>
                  <div class="input-group input-group-sm mb-2">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-sm"
                        >Documento</span
                      >
                    </div>
                    <input
                      v-model="user.user_doc"
                      id="validationDefault02"
                      type="text"
                      class="form-control"
                      placeholder="Número de identificación"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      disabled
                    />
                  </div>
                  <div class="input-group input-group-sm mb-2">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-sm"
                        >RH</span
                      >
                    </div>
                    <input
                      v-model="user.rh"
                      id="validationDefault03"
                      type="text"
                      class="form-control"
                      placeholder="Tipo sanguineo"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      disabled
                    />
                  </div>
                  <div class="input-group input-group-sm mb-2">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-sm"
                        >Dirección</span
                      >
                    </div>
                    <input
                      v-model="user.user_address"
                      id="validationDefault04"
                      type="text"
                      class="form-control"
                      placeholder="Dirección de residencia"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      disabled
                    />
                  </div>
                  <div class="input-group input-group-sm mb-2">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-sm"
                        >Teléfono/Celular</span
                      >
                    </div>
                    <input
                      v-model="user.user_phone"
                      id="validationDefault05"
                      type="text"
                      class="form-control"
                      placeholder="Número telefonico o celular"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      disabled
                    />
                  </div>
                  <div class="input-group input-group-sm mb-2">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-sm"
                        >Correo</span
                      >
                    </div>
                    <input
                      v-model="user.user_mail"
                      id="validationDefault06"
                      type="text"
                      class="form-control"
                      placeholder="Correo electrónico"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      disabled
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-6">
                    <a
                      v-on:click="editInputData"
                      type="button"
                      class="btn btn-dark btn-block text-white"
                    >
                      Editar datos
                    </a>
                  </div>
                  <div class="col-6">
                    <a
                      type="button"
                      class="btn btn-warning btn-block text-dark"
                      @click="updateUser"
                    >
                      Guardar datos
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="col-sm-12 col-md-4 col-lg-3 mb-5 mb-md-0">
            <div class="card pt-3 border border-dark shadow">
              <h4 class="mb-4 text-center font-weight-bold">Foto de perfil</h4>
              <img
                src=""
                class="img-thumbnail align-self-center h-50 w-50"
                alt=" Imagen de perfil"
                id="profilePic"
              />
              <div class="card-body">
                <h5 class="card-title pt-3">{{ user.userName }}</h5>
                <div class="form-group mb-0">
                  <div class="input-group input-group-sm">
                    <div class="custom-file">
                      <input
                        type="file"
                        @change="onPicSelected"
                        class="custom-file-input"
                        id="picPicker"
                      />
                      <label
                        class="custom-file-label text-left"
                        for="inputGroupFile01"
                        >Seleccionar imagen</label
                      >
                    </div>
                  </div>
                </div>
                <button
                  class="btn btn-warning btn-block btn-sm text-dark"
                  @click="updateUser"
                >
                  Guardar imagen
                </button>
              </div>
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
import UserCo from "../controller/UserController";
import UserSC from "../serviceClients/UserServiceClient"
import { EventBus } from "@/EventBus.js";
import NotificationSC from "../serviceClients/NotificationServiceClient";

export default {
  name: "Perfil",
  components: {
    Header,
    FooterwithBackground,
  },
  data() {
    return {
      Foto: Foto,
      selectedPic: null,
      user: {
        user_name: "",
        user_doc: "",
        user_phone: "",
        user_mail: "",
        user_address: "",
        picture: "",
        rh: "",
      },
      //Estado del botón que permite editar y guardar los cambios realizados a la información de un usuario
      inputState: true,
    };
  },
  props: [],
  mounted() {
    this.getUserDB();
  },
  methods: {
    editInputData() {
      this.inputState = !this.inputState;
      document.getElementById("validationDefault01").disabled = this.inputState;
      document.getElementById("validationDefault02").disabled = this.inputState;
      document.getElementById("validationDefault03").disabled = this.inputState;
      document.getElementById("validationDefault04").disabled = this.inputState;
      document.getElementById("validationDefault05").disabled = this.inputState;
      document.getElementById("validationDefault06").disabled = this.inputState;
      if (this.inputState == true) {
        this.getUserDB();
      }
    },
    getUserDB() {
      UserSC.getUser((data) => {
        this.user = data;
      });
    },
    updateUser() {
      UserCo.updateUser(this.user, (data) => {
        if (data === 201) {
          this.createToast(
            "¡Datos de perfil guardados correctamente!",
            "Datos Guardados",
            "success"
          );
        } else {
          this.createToast("Revise los campos", "Error", "danger");
        }
        this.$store.commit("updateUser", this.user);
        /*NotificationSC.createNotification(
              {data:"Usuario Modificado",
              destination: "profile",
              mailUser: this.user.userMail},(response) => {}
            )*/
      });
    },
    createToast(toast, title, variant) {
      this.$bvToast.toast(toast, {
        title: title,
        autoHideDelay: 5000,
        appendToast: true,
        variant: variant,
        solid: true,
      });
    },
    onPicSelected(event) {
      this.selectedPic = document.getElementById("picPicker").files;
      if (this.selectedPic.length > 0) {
        var archivo = this.selectedPic[0];
        var reader = new FileReader();
        var self = this;

        reader.onloadend = function (FileLoadEvent) {
          var srcData = FileLoadEvent.target.result;

          self.user.picture = FileLoadEvent.target.result;

          document.getElementById("profilePic").src = srcData;
        };

        var base64 = reader.readAsDataURL(archivo);
      }
    },
  },
};
</script>

<style>
#profilePic {
  width: 250px;
  height: 250px;
}
.input-group-text {
  min-width: 9vw !important;
}
</style>

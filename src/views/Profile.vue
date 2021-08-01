<template>
  <div>
    <Header></Header>
    <div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-lg-8 mb-3 mb-lg-0">
            <div class="card card-body bg-dark text-left text-light shadow">
              <form @submit.prevent="updateUser">
                <p class="card-title text-light">Información</p>
                <div class="form-group">
                  <div class="input-group input-group-sm mb-2">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-sm"
                        >Nombre</span
                      >
                    </div>
                    <input
                      v-model="user.user_name"
                      :disabled="disabledButton"
                      id="validationDefault01"
                      type="text"
                      class="form-control"
                      placeholder="Nombre completo"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      required
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
                      :disabled="disabledButton"
                      id="validationDefault02"
                      type="text"
                      class="form-control"
                      placeholder="Número de identificación"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      required
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
                      :disabled="disabledButton"
                      id="validationDefault03"
                      type="text"
                      class="form-control"
                      placeholder="Tipo sanguineo"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      required
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
                      :disabled="disabledButton"
                      id="validationDefault04"
                      type="text"
                      class="form-control"
                      placeholder="Dirección de residencia"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      required
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
                      :disabled="disabledButton"
                      id="validationDefault05"
                      type="text"
                      class="form-control"
                      placeholder="Número telefonico o celular"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      required
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
                    <button
                      @click="editInputData"
                      type="button"
                      class="btn btn-light btn-block btn-sm"
                    >
                      {{ editButton }}
                    </button>
                  </div>
                  <div class="col-6">
                    <button
                      :disabled="disabledButton"
                      type="summit"
                      class="btn btn-warning btn-block btn-sm"
                    >
                      Guardar información
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="col-12 col-lg-4 mb-3 mb-lg-0">
            <div class="card pt-5 bg-dark shadow">
              <img
                src=""
                class="img-thumbnail align-self-center h-50 w-50"
                alt=" Imagen de perfil"
                id="profilePic"
              />
              <div class="card-body">
                <form @summit.prevent="updateUser">
                  <p class="card-title text-light">Imagen de perfil</p>
                  <div class="form-group mb-0">
                    <div class="input-group input-group-sm">
                      <div class="custom-file">
                        <input
                          type="file"
                          @change="onPicSelected"
                          class="custom-file-input"
                          id="picPicker"
                          :disabled="disabledButtonImage"
                          required
                        />
                        <label
                          class="custom-file-label text-left"
                          for="inputGroupFile01"
                          >Seleccionar imagen</label
                        >
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-6">
                      <button
                        type="button"
                        class="btn btn-light btn-block btn-sm"
                        @click="editInputImage"
                      >
                        {{ editButtonImage }}
                      </button>
                    </div>
                    <div class="col-6">
                      <button
                        class="btn btn-warning btn-block btn-sm text-dark"
                        type="summit"
                        :disabled="disabledButtonImage"
                      >
                        Guardar imagen
                      </button>
                    </div>
                  </div>
                </form>
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
import Header from "../components/Header.vue";
import FooterwithBackground from "../components/FooterwithBackground.vue";
import UserCo from "../controller/UserController";
import UserSC from "../serviceClients/UserServiceClient";

export default {
  name: "Perfil",
  components: {
    Header,
    FooterwithBackground,
  },
  data() {
    return {
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
      inputImage: true,
      //Mensaje que muestra el botón de editar los datos
      editButton: "Modificar información",
      editButtonImage: "Cambiar imagen",
    };
  },
  props: [],
  mounted() {
    this.getUserDB();
  },
  computed: {
    disabledButton() {
      return this.inputState == true;
    },
    disabledButtonImage() {
      return this.inputImage == true;
    },
  },
  methods: {
    editInputData() {
      this.inputState = !this.inputState;
      if (this.inputState == true) {
        this.editButton = "Modificar información";
      } else {
        this.editButton = "Cancelar";
      }
      this.getUserDB();
    },
    editInputImage() {
      this.inputImage = !this.inputImage;
      if (this.inputImage == true) {
        this.editButtonImage = "Cambiar imagen";
      } else {
        this.editButtonImage = "Cancelar";
      }
      this.getUserDB();
    },
    getUserDB() {
      UserSC.getUser((data) => {
        this.user = data;
      });
    },
    updateUser() {
      UserCo.updateUser(this.user, (data) => {
        if (data === 201) {
          this.editInputData();
          this.createToast(
            "¡Tus datos se guardaron correctamente!",
            "Datos actualizados",
            "success"
          );
        } else {
          this.createToast("Revisa los campos", "Error", "Danger");
        }
        this.$store.commit("updateUser", this.user);
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
    onPicSelected() {
      this.selectedPic = document.getElementById("picPicker").files;
      if (this.selectedPic.length > 0) {
        var reader = new FileReader();
        var self = this;
        reader.onloadend = function(FileLoadEvent) {
          var srcData = FileLoadEvent.target.result;
          self.user.picture = FileLoadEvent.target.result;
          document.getElementById("profilePic").src = srcData;
        };
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

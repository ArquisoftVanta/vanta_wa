<template>
  <div>
    <FooterwithBackground></FooterwithBackground>
    <div>
      <div class="container-fluid mb-5">
        <div class="row">
          <div class="col-md-12 col-lg-3 offset-lg-1 mt-5 mb-5">
            <div class="card pt-3">
              <img
                src=""
                class="img-thumbnail align-self-center h-25"
                alt=" Imagen de perfil"
                id="profilePic"
              />
              <div class="card-body">
                <h5 class="card-title pt-3">{{ user.userName }}</h5>
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input outline-dark"
                    @change="onPicSelected"
                    id="picPicker"
                  />
                  <label class="custom-file-label" id="pickerLabel"
                    >Elige tu Foto</label
                  >
                </div>
                <a
                  class="btn btn-dark btn-block text-white"
                  type="button"
                  id="uploadBtn"
                  style="margin-top: 9px"
                  @click="updateUser"
                >
                  Guardar foto
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-7 mt-lg-5 mt-0 mb-5">
            <div class="card card-body mb-5">
              <form>
                <h4 class="mb-3">Tu información</h4>
                <div class="form-row">
                  <div class="col-md-8 mb-4">
                    <label for="validationDefault01">Nombre</label>
                    <input
                      v-model="user.user_name"
                      type="text"
                      class="form-control form-control-sm text-center"
                      id="validationDefault01"
                      placeholder="Nombres completos"
                      readonly
                    />
                  </div>
                  <div class="col-md-4 mb-2">
                    <label for="validationDefault02">Documento</label>
                    <input
                      v-model="user.user_doc"
                      type="text"
                      class="form-control form-control-sm text-center"
                      id="validationDefault02"
                      placeholder="Documento"
                      readonly
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-3 mb-3">
                    <label for="validationDefault07">Rh</label>
                    <input
                      v-model="user.rh"
                      type="text"
                      class="form-control form-control-sm text-center"
                      id="validationDefault03"
                      placeholder="Rh"
                      readonly
                    />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="validationDefault04">Dirección</label>
                    <input
                      v-model="user.user_address"
                      type="text"
                      class="form-control form-control-sm text-center"
                      id="validationDefault04"
                      placeholder="Dirección"
                      readonly
                    />
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="validationDefault05">Teléfono</label>
                    <input
                      v-model="user.user_phone"
                      type="text"
                      class="form-control form-control-sm text-center"
                      id="validationDefault05"
                      placeholder="N° de teléfono"
                      readonly
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-12 mb-3">
                    <label for="validationDefault06">Correo</label>
                    <input
                      v-model="user.user_mail"
                      type="text"
                      class="form-control form-control-sm text-center"
                      id="validationDefault06"
                      placeholder="Correo electronico"
                      readonly
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-6 mt-3 mb-3">
                    <a
                      v-on:click="editInputData"
                      type="button"
                      class="btn btn-secondary btn-block text-white"
                    >
                      Editar
                    </a>
                  </div>
                  <div class="col-6 mt-3 mb-3">
                    <a
                      type="button"
                      class="btn btn-dark btn-block text-white"
                      @click="updateUser"
                    >
                      Guardar
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Header></Header>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus.js";
import Header from "../components/Header";
import FooterwithBackground from "../components/FooterwithBackground.vue";
import Foto from "@/assets/Enfermeria22.png";
import NotificationSC from "../serviceClients/NotificationServiceClient";
import UserCo from "../controller/UserController"
//import { use } from 'vue/types/umd';
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
      textoBotonEditar: "Editar",
      //Estado del botón que permite editar y guardar los cambios realizados a la información de un usuario
      estadoInput: false,
    };
  },
  props: {},
  mounted() {
    this.getUserDB();
  },
  methods: {
    
    editInputData() {
      this.estadoInput = document.getElementById(
        "validationDefault01"
      ).readOnly;
      this.estadoInput = !this.estadoInput;
      document.getElementById(
        "validationDefault02"
      ).readOnly = this.estadoInput;
      document.getElementById(
        "validationDefault03"
      ).readOnly = this.estadoInput;
      document.getElementById(
        "validationDefault04"
      ).readOnly = this.estadoInput;
      document.getElementById(
        "validationDefault05"
      ).readOnly = this.estadoInput;
    },

    getUserDB() {
      UserCo.getUser((data)=>{
        this.user = data;
      });
    },
    updateUser() {
      UserCo.updateUser(this.user,(data)=>{
        if (data === 201) {
          this.createToast("¡Datos de perfil guardados correctamente!","Datos Guardados","success")
        } else {
          this.createToast("Revise los campos","Error","danger")
        }
            this.$store.commit("updateUser", this.user);
            /*NotificationSC.createNotification(
              {data:"Usuario Modificado",
              destination: "profile",
              mailUser: this.user.userMail},(response) => {}
            )*/
      })
    },

    createToast(toast,title,variant){
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
  width: 266px;
  height: 266px;
}
#pickerLabel {
  text-align: left;
}
</style>

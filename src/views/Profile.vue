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
                <a
                  class="btn btn-dark btn-block text-white"
                  type="button"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  id="uploadBtn"
                >
                  Añadir dirección
                </a>
                <a
                  class="btn btn-dark btn-block text-white"
                  type="button"
                  data-toggle="modal"
                  data-target="#modalDirections"
                  @click="reRender()"
                >
                  Ver direcciones
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
                      v-model="user.userName"
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
                      v-model="user.userDoc"
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
                      v-model="user.userAddress"
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
                      v-model="user.userPhone"
                      type="text"
                      class="form-control form-control-sm text-center"
                      id="validationDefault05"
                      placeholder="N° de teléfono"
                      readonly
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-6 mb-3">
                    <label for="validationDefault06">Correo</label>
                    <input
                      v-model="user.userMail"
                      type="text"
                      class="form-control form-control-sm text-center"
                      id="validationDefault06"
                      placeholder="Correo electronico"
                      readonly
                    />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="validationDefault04">Universidad</label>
                    <input
                      v-model="this.universityId2"
                      type="text"
                      class="form-control form-control-sm text-center"
                      id="validationDefault09"
                      placeholder="Universidad"
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
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Añadir Dirección
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row justify-content-md-center">
                  <div class="col col-md-auto">
                    <form>
                      <div class="form-group">
                        <label for="exampleInputEmail1"
                          >¿Cómo quieres llamar a tu dirección favorita?</label
                        >
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Ejemplo: Mi universidad"
                          v-model="nameFavd"
                        />
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1"
                          >Dirección según google</label
                        >
                        <input
                          class="form-control newFavoritePoint"
                          type="text"
                          placeholder="Ejemplo: Cra 45 #26-85"
                          ref="newFavoritePoint"
                          id="pac-input "
                        />
                      </div>
                    </form>
                    <DirectionsMapView class="map" />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  class="btn btn-dark"
                  data-dismiss="modal"
                  @click="saveDirection"
                >
                  Guardar Dirección
                </button>
              </div>
            </div>
          </div>
        </div>
        <Directions ref="myComp" state="Watch Direction" />
      </div>
    </div>
    <Header></Header>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus.js";
import DirectionsMapView from "../components/DirectionsMapView.vue";
import Header from "../components/Header";
import Directions from "../components/WatchCurrentDirections";
import FooterwithBackground from "../components/FooterwithBackground.vue";
import Foto from "@/assets/Enfermeria22.png";
import UserSC from "../serviceClients/UserServiceClient";
import NotificationSC from "../serviceClients/NotificationServiceClient";
import FavoriteServiceClient from "../serviceClients/FavoriteServiceCliente";
//import { use } from 'vue/types/umd';
export default {
  name: "Perfil",
  components: {
    Header,
    FooterwithBackground,
    DirectionsMapView,
    Directions,
  },
  data() {
    return {
      Foto: Foto,
      selectedPic: null,
      universityId2: "",
      user: {
        userName: "",
        userDoc: "",
        userPhone: "",
        universityId: "",
        userMail: "",
        userAddress: "",
        password: "",
        registryDatetime: "",
        picture: "",
        vehicleModel: [],
        rh: "", 
      },
      newFavoritePoint: {
        favAddress: "",
        favLatitude: "",
        favLongitude: "",
        datetimeCreationFav: "",
        nameFd: "",
      },
      nameFavd: "",
      textoBotonEditar: "Editar",
      listRoutes: [],

      //Estado del botón que permite editar y guardar los cambios realizados a la información de un usuario
      estadoInput: false,
    };
  },
  props: {},
  mounted() {
    this.getUserDB();
    EventBus.$emit("passengerRoutes-data", this.routes);
    for (let ref in this.$refs) {
      if (ref !== "myComp") {
        const autocomplete = new google.maps.places.Autocomplete(
          this.$refs[ref],
          {
            bounds: new google.maps.LatLngBounds(
              new google.maps.LatLng(45.4215296, -75.6971931)
            ),
            componentRestrictions: { country: "co" },
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          this[ref].nameFd = this.nameFavd;
          this[ref].favAddress = `${place.name}, ${place.vicinity}`;
          this[ref].favLatitude = "" + place.geometry.location.lat();
          this[ref].favLongitude = "" + place.geometry.location.lng();
          this[ref].datetimeCreationFav = "2020-05-07@10:20:15";
          EventBus.$emit("generateMarker", this.newFavoritePoint);
        });
      }
    }
  },
  methods: {
    reRender() {
      this.$refs["myComp"].showDirections();
    },
    getFormattedDate() {
      var date = new Date();
      var str =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.toLocaleDateString("es-CO", { day: "2-digit" }) +
        "@" +
        ("0" + date.getHours()).slice(-2) +
        ":" +
        ("0" + date.getMinutes()).slice(-2) +
        ":" +
        ("0" + date.getSeconds()).slice(-2);
      return str;
    },
    editInputData() {
      this.estadoInput = document.getElementById(
        "validationDefault01"
      ).readOnly;

      this.estadoInput = !this.estadoInput;

      document.getElementById(
        "validationDefault01"
      ).readOnly = this.estadoInput;
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
      document.getElementById(
        "validationDefault06"
      ).readOnly = this.estadoInput;
    },
    createUserDB() {
      UserSC.createUser(this.user, (response) => {
        console.log("Usuario creado " + response.status);
      });
    },
    getUserDB() {
      UserSC.getUser((data) => {
        if (!this.$store.state.user) {
          this.$store.commit("updateUser", data);
        }
        this.user = data;
        if (this.user.universityId == 0) {
          this.universityId2 = "Universidad Nacional de Colombia";
        }
        document.getElementById("profilePic").src = this.user.picture;
      });
    },
    updateUser() {
      //this.user.picture = "HolaSuCadena"
      UserSC.updateUser(this.user, () => {});
      this.$store.commit("updateUser", this.user);
      NotificationSC.createNotification(
        {data:"Usuario Modificado",
        destination: "profile",
        mailUser: this.user.userMail},(response) => {}
      )
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
    saveDirection() {
      this.newFavoritePoint.datetimeCreationFav = this.getFormattedDate();
      FavoriteServiceClient.addDirection(this.newFavoritePoint, (response) => {
        if (response === 201) {
          this.$bvToast.toast("¡Dirección Favorita Almacenada Correctamente!", {
            title: "Dirección Almacenada",
            autoHideDelay: 5000,
            appendToast: true,
            variant: "success",
            solid: true,
          });
        } else {
          this.$bvToast.toast("¡Por favor verifique los datos ingresados!", {
            title: "Datos invalidos",
            autoHideDelay: 5000,
            appendToast: true,
            variant: "danger",
            solid: true,
          });
        }
      });
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

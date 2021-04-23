<template>
  <div>
    <Header></Header>
    <div>
      <div class="container-fluid mb-5">
        <div class="modal" id="myModal" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{ modalaviso }}</h5>
                <button
                  id="w-change-close"
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-footer">
                <button
                  id="w-change-close1"
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 offset-md-0 col-lg-7 offset-lg-1 mt-4 mb-5">
            <div class="datosvehiculo card">
              <div class="card-body">
                <form class="needs-validation" novalidate>
                  <div class="form-row">
                    <div class="col-md-3 mb-0">
                      <p for="validationDefaultplaca" class="text-center">
                        Matricula
                      </p>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="validationDefaultplaca"
                        v-model="vehicle.vehicleLicenseplate"
                        disabled
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <p for="validationDefaultmarca">Marca</p>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="validationDefaultmarca"
                        v-model="vehicle.vehicleBrand"
                        disabled
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <p for="validationDefault01">No de pasajeros</p>
                      <select
                        class="form-control custom-select"
                        style="background: #f1f1f1; border: 0"
                        required
                      >
                        <option :value="vehicle.vehicleCapacity">
                          {{ vehicle.vehicleCapacity }}
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </select>
                    </div>
                    <div class="col-md-3 mb-3">
                      <p for="validationDefaultservicio">Tipo de Servicio</p>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="validationDefaultservicio"
                        v-model="vehicle.vehicleServiceType"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-3 mb-3">
                      <p for="validationDefaultlinea">Modelo</p>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="validationDefaultlinea"
                        v-model="vehicle.vehicleYear"
                        disabled
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <p for="validationDefaultcarroceria">
                        Tipo de Carroceria
                      </p>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="validationDefaultcarroceria"
                        v-model="vehicle.vehicleBody"
                        disabled
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <p for="validationDefaultfecha">F. Vencimiento SOAT</p>
                      <input
                        type="date"
                        class="form-control form-control-sm"
                        id="validationDefaultfecha"
                        disabled
                        v-model="vehicle.vehicleSoatExpiration"
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <p
                        for="validationDefaultclasevehiculo"
                        class="text-center"
                      >
                        Tipo de Vehículo
                      </p>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="validationDefaultclasevehiculo"
                        v-model="vehicle.vehicleType"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-3 mb-3">
                      <p for="validationDefaultmodelo">Linea</p>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="validationDefaultmodelo"
                        v-model="vehicle.vehicleModel"
                        disabled
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <p for="validationDefaultcilindraje">Cilindraje</p>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="validationDefaultcilindraje"
                        v-model="vehicle.vehicleEngine"
                        disabled
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <p for="validationDefaultcolor">Color</p>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="validationDefaultcolor"
                        v-model="vehicle.vehicleColor"
                        disabled
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <p for="validationDefaultcombustible">
                        Tipo de combustible
                      </p>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="validationDefaultcombustible"
                        v-model="vehicle.vehicleGasType"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-12 mb-3">
                      <textarea
                        v-model="DatosRunt"
                        class="form-control text-center"
                        id="validationTextarea"
                        placeholder="Por favor, copie la información proporcionada por el RUNT"
                        required
                      ></textarea>
                    </div>
                    <div class="col-12">
                      <p for="validationDefault01"></p>
                      <a
                        href="https://www.runt.com.co/consultaCiudadana/#/consultaVehiculo"
                        target="_blank"
                        type="button"
                        class="btn btn-dark btn-block text-center mb-2"
                        rel="noopener noreferrer"
                      >
                        Ingresar a RUNT
                      </a>
                    </div>
                    <div class="col-12">
                      <a
                        @click="datosRUNT"
                        target="_blank"
                        type="button"
                        class="btn btn-dark btn-block text-center text-white"
                      >
                        Validar información de RUNT
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-3 mt-4 mb-5">
            <img
              src=""
              alt="Foto del vehículo"
              class="img-thumbnail mb-2"
              style="width: 220px; height: 150px"
              id="vhcPicture"
            />
            <div class="card">
              <div class="container">
                <div>
                  <form>
                    <div class="custom-file mt-2 mb-2">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="vhcPicPicker"
                        @change="onVhcPicSelected"
                      />
                      <label
                        class="custom-file-label"
                        id="vhcPickerLabel"
                        style="
                          color: #06416d;
                          text-align: left;
                        "
                        >Foto del vehículo</label
                      >
                    </div>
                  </form>
                </div>
                <div>
                  <a
                    @click="habilitarCampos"
                    type="button"
                    class="btn btn-dark btn-block text-white mb-2"
                  >
                    Editar Datos Vehículo
                  </a>
                </div>
                <a
                  @click="guardarVehiculo"
                  type="button"
                  class="btn btn-dark btn-block text-white"
                  id="w-change-location"
                  data-toggle="modal"
                  data-target="#locModal"
                >
                  Guardar vehículo
                </a>
                <div>
                  <button
                    type="button"
                    class="btn btn-light"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    data-display="static"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      class="person"
                      src="~@/assets/help.png"
                      width="40"
                      height="40"
                      alt="Ayuda"
                    />
                  </button>
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="false"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            ¿Cómo Ingresar la Información del vehículo?
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
                          <h5 class="text-left">
                            Para ingresar los datos del vehículo se tienen dos
                            opciones:
                          </h5>
                          <p class="textoayuda">
                            1. En dado caso que no se conozcan todos los datos
                            del vehículo, se debe ingresar a través del botón
                            "Ingresar a RUNT". Luego, el usuario debe ingresar
                            la placa del vehículo y la cédula del propietario
                            del mismo, como se muestra en la imagen.
                          </p>
                          <p class="textoayuda">
                            Una vez en la página del RUNT se debe presionar
                            sobre las pestañas "Datos Técnicos del Vehículo" y
                            "Poliza SOAT", posteriormente presionar las teclas
                            "Ctrl + A" esto permitirá seleccionar toda la
                            información de la pantalla y finalmente copiar dicho
                            contenido. Después, se pega esta información en el
                            área de texto y se presiona la opción "Validar
                            información de RUNT". Finalmente se selecciona una
                            foto y se presiona el botón "Guardar Vehículo".
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
import FooterwithBackground from "../components/FooterwithBackground.vue";
import Header from "../components/Header.vue";
import vehicleSC from "../serviceClients/VehicleServiceClient";
import Foto from "@/assets/car.jpg";

export default {
  name: "RegistrarVehiculo",
  components: {
    FooterwithBackground,
    Header,
  },
  data: function() {
    return {
      showModal: false,
      Foto: Foto,
      selectedVhcPic: null,

      DatosRunt: "",
      modalaviso: "",

      Estado: "",

      vehicle: {
        idVehicle: null,
        vehicleOwner: null,
        vehicleLicenseplate: "",
        vehicleType: null,
        vehicleModel: "",
        vehicleYear: null,
        vehicleColor: "",
        vehicleRegistryDatetime: "",
        vehiclePicture: "",
        vehicleCapacity: null,
        vehicleBrand: "",
        vehicleServiceType: "",
        vehicleBody: "",
        vehicleSoatExpiration: "",
        vehicleEngine: null,
        vehicleGasType: "",
        userModel: null,
      },
    };
  },
  mounted() {
    this.getVehicleDB();
  },
  methods: {
    getVehicleDB() {
      vehicleSC.getVehicles((response) => {
        /*if (!this.$store.state.vehicle) {
          this.$store.commit("updateUser", data);
        }*/

        if (response.status == 200) {
          this.vehicle = response.data;
        }

        document.getElementById("vhcPicture").src = this.vehicle.vehiclePicture;
      });
    },
    datosRUNT() {
      this.vehicle.vehicleRegistryDatetime = this.getFormattedDate();
      var datos = this.DatosRunt.split(
        "\n"
      ); /*Separa la información por saltos de línea */
      for (var dato of datos) {
        /*Realiza un recorrido por todas las líneas buscando*/
        if (dato.includes("PLACA DEL VEHÍCULO")) {
          /*la información correspondiente para llenar los campos*/
          var lineaplaca = dato.split(":"); /*de texto.*/
          this.vehicle.vehicleLicenseplate = lineaplaca[1];
        } else if (dato.includes("MARCA:")) {
          var lineamarca = dato.split(":");
          this.vehicle.vehicleBrand = lineamarca[1].replace("LÍNEA", "");
          this.vehicle.vehicleModel = lineamarca[2];
        } else if (dato.includes("MODELO:")) {
          var lineamodelo = dato.split(":");
          this.vehicle.vehicleYear = lineamodelo[1].replace("COLOR", "");
          this.vehicle.vehicleColor = lineamodelo[2];
        } else if (dato.includes("ESTADO DEL VEHÍCULO")) {
          var lineaestado = dato.split(":");
          this.Estado = lineaestado[2];
        } else if (dato.includes("TIPO DE SERVICIO")) {
          var lineatipo = dato.split(":");
          this.vehicle.vehicleServiceType = lineatipo[1].replace(
            "CLASE DE VEHÍCULO",
            ""
          );
          this.vehicle.vehicleType = lineatipo[2];
        } else if (dato.includes("CILINDRAJE")) {
          var lineacilindraje = dato.split(":");
          this.vehicle.vehicleEngine = lineacilindraje[1].replace(
            "TIPO DE CARROCERÍA",
            ""
          );
          this.vehicle.vehicleBody = lineacilindraje[2];
        } else if (dato.includes("COMBUSTIBLE")) {
          var lineacombustible = dato.split(":");
          this.vehicle.vehicleGasType = lineacombustible[1].replace(
            "FECHA DE MATRICULA INICIAL(DD/MM/AAAA)",
            ""
          );
        } else if (dato.includes("PASAJEROS")) {
          var lineapasajeros = dato.split(":");
          this.vehicle.vehicleCapacity = lineapasajeros[2];
        } else if (dato.includes("VIGENTE")) {
          var lineasoat = dato.split("	");
          var formato = lineasoat[3].split("/");
          this.vehicle.vehicleSoatExpiration =
            formato[2] +
            "-" +
            formato[1] +
            "-" +
            formato[0].replace(
              " ",
              ""
            ); /**Esto permite ordenar la fecha en el formato que se requiere */
          var dateControl = document.querySelector(
            'input[type="date"]'
          ); /**Busca el primer input de tipo "date" */
          dateControl.value = this.vehicle.vehicleSoatExpiration; /**Posteriormente se guarda en el input date la fecha de vencimiento tomada por el RUNT */
          break;
        }
      }
    },
    onVhcPicSelected() {
      this.selectedVhcPic = document.getElementById("vhcPicPicker").files;

      if (this.selectedVhcPic.length > 0) {
        var archivo = this.selectedVhcPic[0];
        var reader = new FileReader();
        var self = this;
        reader.onloadend = function(FileLoadEvent) {
          var srcData = FileLoadEvent.target.result;

          self.vehicle.vehiclePicture = FileLoadEvent.target.result;

          document.getElementById("vhcPicture").src = srcData;
        };

        var base64 = reader.readAsDataURL(archivo);
      }
    },
    guardarVehiculo() {
      vehicleSC.updateVehicle(this.vehicle, () => {});
    },
    getFormattedDate() {
      var date = new Date();
      var str =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.toLocaleDateString("es-CO", { day: "2-digit" }) +
        "T" +
        ("0" + date.getHours()).slice(-2) +
        ":" +
        ("0" + date.getMinutes()).slice(-2) +
        ":" +
        ("0" + date.getSeconds()).slice(-2);
      return str;
    },

    habilitarCampos() {
      document.getElementById(
        "validationDefaultfecha"
      ).disabled = false; /**Habiita el único campo a modificar que es la fecha*/
      /**de vencimiento del SOAT */
    },
  },
};
</script>

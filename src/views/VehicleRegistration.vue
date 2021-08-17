<template>
  <div>
    <Header></Header>
    <VehiclesByUser ref="myComp" state="Choose Vehicle" />
    <div>
      <div class="container-fluid">
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
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-lg-8 mb-3 mb-lg-0">
            <div class="card text-center text-dark border border-dark shadow">
              <div class="card-body">
                <form novalidate>
                  <h4 class="mb-4 font-weight-bold">Datos de tú vehículo</h4>
                  <div class="form-row">
                    <div class="col-12 col-md-6">
                      <div class="input-group input-group-sm mb-2">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"
                            >Matrícula</span
                          >
                        </div>
                        <input
                          v-model="vehicle.license_plate"
                          type="text"
                          class="form-control"
                          placeholder="Matrícula de tu vehículo"
                          aria-label="matrícula"
                          aria-describedby="basic-addon1"
                          disabled
                        />
                      </div>
                      <div class="input-group input-group-sm mb-2">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"
                            >Marca</span
                          >
                        </div>
                        <input
                          v-model="vehicle.brand"
                          id="validationDefaultmarca"
                          type="text"
                          class="form-control"
                          placeholder="Marca de tu vehículo"
                          aria-label="marca"
                          aria-describedby="basic-addon1"
                          disabled
                        />
                      </div>
                      <div class="input-group input-group-sm mb-2">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"
                            >N° de pasajeros</span
                          >
                        </div>
                        <input
                          v-model="vehicle.capacity"
                          id="validationDefaultcapacity"
                          type="text"
                          class="form-control"
                          placeholder="N° de pasajeros de tu vehículo"
                          aria-label="número-pasajeros"
                          aria-describedby="basic-addon1"
                          disabled
                        />
                      </div>
                      <div class="input-group input-group-sm mb-2">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"
                            >Tipo de servicio</span
                          >
                        </div>
                        <input
                          v-model="vehicle.service_type"
                          id="validationDefaultservicio"
                          type="text"
                          class="form-control"
                          placeholder="Tipo de servicio de tu vehículo"
                          aria-label="tipo-servicio"
                          aria-describedby="basic-addon1"
                          disabled
                        />
                      </div>
                      <div class="input-group input-group-sm mb-2">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"
                            >Modelo</span
                          >
                        </div>
                        <input
                          v-model="vehicle.year"
                          id="validationDefaultlinea"
                          type="text"
                          class="form-control"
                          placeholder="Modelo de tu vehículo"
                          aria-label="modelo"
                          aria-describedby="basic-addon1"
                          disabled
                        />
                      </div>
                      <div class="input-group input-group-sm mb-2">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"
                            >Tipo de carrocería</span
                          >
                        </div>
                        <input
                          v-model="vehicle.body"
                          id="validationDefaultcarroceria"
                          type="text"
                          class="form-control"
                          placeholder="Tipo de carrocería de tu vehículo"
                          aria-label="tipo-carrocería"
                          aria-describedby="basic-addon1"
                          disabled
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="input-group input-group-sm mb-2">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"
                            >Fecha vemcimiento SOAT</span
                          >
                        </div>
                        <input
                          v-model="vehicle.soat_exp"
                          id="validationDefaultfecha"
                          type="date"
                          class="form-control"
                          placeholder="Fecha de vencimiento del SOAT"
                          aria-label="fecha-soat"
                          aria-describedby="basic-addon1"
                          disabled
                        />
                      </div>
                      <div class="input-group input-group-sm mb-2">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"
                            >Tipo de vehículo</span
                          >
                        </div>
                        <input
                          v-model="vehicle.vehicle_type"
                          id="validationDefaultclasevehiculo"
                          type="text"
                          class="form-control"
                          placeholder="Tipo de carrocería de tu vehículo"
                          aria-label="tipo-carrocería"
                          aria-describedby="basic-addon1"
                          disabled
                        />
                      </div>
                      <div class="input-group input-group-sm mb-2">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"
                            >Línea</span
                          >
                        </div>
                        <input
                          v-model="vehicle.model"
                          id="validationDefaultmodelo"
                          type="text"
                          class="form-control"
                          placeholder="Línea de tu vehículo"
                          aria-label="linea"
                          aria-describedby="basic-addon1"
                          disabled
                        />
                      </div>
                      <div class="input-group input-group-sm mb-2">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"
                            >Cilindraje</span
                          >
                        </div>
                        <input
                          v-model="vehicle.engine"
                          id="validationDefaultcilindraje"
                          type="text"
                          class="form-control"
                          placeholder="Cilindraje de tu vehículo"
                          aria-label="cilindraje"
                          aria-describedby="basic-addon1"
                          disabled
                        />
                      </div>
                      <div class="input-group input-group-sm mb-2">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"
                            >Color</span
                          >
                        </div>
                        <input
                          v-model="vehicle.color"
                          id="validationDefaultcolor"
                          type="text"
                          class="form-control"
                          placeholder="Color de tu vehículo"
                          aria-label="color"
                          aria-describedby="basic-addon1"
                          disabled
                        />
                      </div>
                      <div class="input-group input-group-sm mb-2">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"
                            >Tipo de combustible</span
                          >
                        </div>
                        <input
                          v-model="vehicle.gas_type"
                          id="validationDefaultcombustible"
                          type="text"
                          class="form-control"
                          placeholder="Color de tu vehículo"
                          aria-label="color"
                          aria-describedby="basic-addon1"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-12">
                      <textarea
                        v-model="DatosRunt"
                        class="form-control text-center"
                        id="validationTextarea"
                        placeholder="Por favor, copie la información proporcionada por el RUNT"
                        required
                      ></textarea>
                    </div>
                    <div class="col-6 mt-3">
                      <a
                        href="https://www.runt.com.co/consultaCiudadana/#/consultaVehiculo"
                        target="_blank"
                        type="button"
                        class="btn btn-dark btn-block text-center"
                        rel="noopener noreferrer"
                      >
                        Ingresar a RUNT
                      </a>
                    </div>
                    <div class="col-6 mt-3">
                      <button
                        @click="llenarFormulario"
                        target="_blank"
                        type="button"
                        class="btn btn-warning btn-block text-center text-dark"
                      >
                        Validar información RUNT
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4 mb-5 mb-lg-0">
            <div class="card pt-3 border border-dark shadow">
              <h4 class="mb-4 text-center font-weight-bold">
                Foto del vehículo
              </h4>
              <img
                src=""
                class="img-thumbnail align-self-center h-50 w-50"
                alt=" Imagen del vehículo"
                id="vhcPicture"
              />
              <div class="card-body">
                <h5 class="card-title pt-3">{{ vehicle.license_plate }}</h5>
                <div class="form-group mb-0">
                  <div class="input-group input-group-sm">
                    <div class="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="vhcPicPicker"
                        @change="onVhcPicSelected"
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
                  class="btn btn-dark btn-block btn-sm text-white mb-2"
                  data-toggle="modal"
                  data-target="#modalVehicles"
                  data-display="static"
                  @click="reRender()"
                >
                  Ver mis vehículos
                </button>
                <button
                  @click="habilitarCampos"
                  class="btn btn-dark btn-block btn-sm text-white mb-2"
                >
                  Editar Datos Vehículo
                </button>
                <button
                  class="btn btn-warning btn-block btn-sm text-dark"
                  @click="guardarVehiculo(vehicle)"
                >
                  Guardar
                </button>
                <button
                  @click="eliminarVehiculo(vehicle)"
                  class="btn btn-dark btn-block btn-sm text-white"
                >
                  Eliminar vehículo
                </button>
                <button
                  type="button"
                  class="btn btn-light btn-block btn-sm"
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
              </div>
            </div>
          </div>
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
                  <h4 class="modal-title text-center font-weight-bold" id="exampleModalLabel">
                    ¿Cómo Ingresar la Información del vehículo?
                  </h4>
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
                    Para ingresar los datos del vehículo se tienen dos opciones:
                  </h5>
                  <p>
                    <br />
                    1. En dado caso que no se conozcan todos los datos del
                    vehículo, se debe ingresar a través del botón "Ingresar a
                    RUNT".
                  </p>
                  <p>
                    2. Debe ingresar la placa del vehículo
                    y la cédula del propietario del mismo, como se muestra en la
                    imagen.</p>
                  <p>
                    Una vez en la página del RUNT se debe presionar sobre las
                    pestañas "Datos Técnicos del Vehículo" y "Poliza SOAT",
                    posteriormente presionar las teclas "Ctrl + A" esto
                    permitirá seleccionar toda la información de la pantalla y
                    finalmente copiar dicho contenido. Después, se pega esta
                    información en el área de texto y se presiona la opción
                    "Validar información de RUNT". Finalmente se selecciona una
                    foto y se presiona el botón "Guardar Vehículo".
                  </p>
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
//import FooterwithBackground from "../components/FooterwithBackground.vue";
import Header from "../components/Header.vue";
import vehicleCo from "../controller/VehicleController";
import Foto from "@/assets/car.jpg";
import AuthSC from "../serviceClients/AuthServiceClient";
import VehiclesByUser from "../components/VehiclesByUser.vue";
import { EventBus } from "@/EventBus.js";
import FooterwithBackground from "../components/FooterwithBackground.vue";

export default {
  name: "RegistrarVehiculo",
  components: {
    FooterwithBackground,
    Header,
    VehiclesByUser,
  },

  data: function () {
    return {
      showModal: false,
      Foto: Foto,
      selectedVhcPic: null,

      DatosRunt: "",
      modalaviso: "",

      vehicle: {
        id: null,
        owner: null,
        license_plate: "",
        vehicle_type: null,
        model: "",
        year: null,
        color: "",
        registry: "",
        capacity: null,
        brand: "",
        service_type: "",
        body: "",
        soat_exp: "",
        engine: null,
        gas_type: "",
      },
    };
  },
  mounted() {
    this.getVehicleDB();
  },

  methods: {
    getVehicleDB() {
      EventBus.$on("vehicle", (vehicle) => {
        try {
          this.vehicle = vehicle;
          document.getElementById("validationDefaultfecha").disabled = true;
        } catch (error) {}
      });
    },

    reRender() {
      this.$refs["myComp"].showVehicles();
    },

    llenarFormulario() {
      console.log(this.DatosRunt);
      this.vehicle = vehicleCo.obtenerDatosRUNT(this.vehicle, this.DatosRunt);
    },

    eliminarVehiculo(vehicle) {
      vehicleCo.eliminarVehiculo(vehicle.id);
    },

    guardarVehiculo(vehicle) {
      vehicleCo.guardarVehiculo(vehicle);
    },

    habilitarCampos() {
      document.getElementById("validationDefaultfecha").disabled = false;
    },

    onVhcPicSelected() {
      /*this.selectedVhcPic = document.getElementById("vhcPicPicker").files;

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
      }*/
    },
  },
};
</script>

<style>
#vhcPicture {
  width: 250px;
  height: 250px;
}
</style>
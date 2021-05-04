<template>
  <div>
    <Header></Header>
    <VehiclesByUser ref="myComp" state="Choose Vehicle" />
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
          <div class="col-md-12 offset-md-0 col-lg-7 offset-lg-1 mb-4">
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
                        v-model="vehicle.license_plate"
                        disabled
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <p for="validationDefaultmarca">Marca</p>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="validationDefaultmarca2"
                        v-model="vehicle.brand"
                        disabled
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <p for="validationDefault01">No de pasajeros</p>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="validationDefaultmarca"
                        v-model="vehicle.capacity"
                        disabled
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <p for="validationDefaultservicio">Tipo de Servicio</p>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="validationDefaultservicio"
                        v-model="vehicle.service_type"
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
                        v-model="vehicle.year"
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
                        v-model="vehicle.body"
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
                        v-model="vehicle.soat_exp"
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
                        v-model="vehicle.vehicle_type"
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
                        v-model="vehicle.model"
                        disabled
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <p for="validationDefaultcilindraje">Cilindraje</p>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="validationDefaultcilindraje"
                        v-model="vehicle.engine"
                        disabled
                      />
                    </div>
                    <div class="col-md-3 mb-3">
                      <p for="validationDefaultcolor">Color</p>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="validationDefaultcolor"
                        v-model="vehicle.color"
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
                        v-model="vehicle.gas_type"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-12 mb-1">
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
                        class="btn btn-dark btn-block btn-sm text-center mb-2"
                        rel="noopener noreferrer"
                      >
                        Ingresar a RUNT
                      </a>
                    </div>
                    <div class="col-12">
                      <a
                        @click="llenarFormulario"
                        target="_blank"
                        type="button"
                        class="btn btn-dark btn-block btn-sm text-center text-white"
                      >
                        Validar información de RUNT
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-3 mb-4">
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
                    type="button"
                    class="btn btn-dark btn-block text-white mb-2"
                    data-toggle="modal"
                    data-target="#modalVehicles"
                    data-display="static"  
                    @click="reRender()"
                  >
                  Ver Mis Vehículos
                  </a>
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
                  @click="guardarVehiculo(vehicle)"
                  type="button"
                  class="btn btn-dark btn-block text-white"
                >
                  Guardar vehículo
                </a>
                <a
                  @click="eliminarVehiculo(vehicle)"
                  type="button"
                  class="btn btn-dark btn-block text-white"
                >
                  Eliminar vehículo
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
//import FooterwithBackground from "../components/FooterwithBackground.vue";
import Header from "../components/Header.vue";
import vehicleCo from "../controller/VehicleController";
import Foto from "@/assets/car.jpg";
import AuthSC from "../serviceClients/AuthServiceClient";
import VehiclesByUser from "../components/VehiclesByUser.vue"
import { EventBus } from "@/EventBus.js";
import FooterwithBackground from "../components/FooterwithBackground.vue";

export default {
  name: "RegistrarVehiculo",
  components: {
    FooterwithBackground,
    Header,
    VehiclesByUser
  },

  data: function() {
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
          this.vehicle = vehicle
          document.getElementById(
        "validationDefaultfecha"
      ).disabled = true
        } catch (error) {
        }
    });    
    },

      reRender() {
      this.$refs["myComp"].showVehicles();
    },


    llenarFormulario(){
      console.log(this.DatosRunt)
      this.vehicle = vehicleCo.obtenerDatosRUNT(this.vehicle,this.DatosRunt)
    },

    eliminarVehiculo(vehicle){
      vehicleCo.eliminarVehiculo(vehicle.id)
    },

    guardarVehiculo(vehicle) {
      vehicleCo.guardarVehiculo(vehicle)        
    },

    habilitarCampos() {
      document.getElementById(
        "validationDefaultfecha"
      ).disabled = false;
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

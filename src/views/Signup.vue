<template>
  <div>
    <div class="fixed-top">
      <nav id="Banner" class="navbar navbar-expand-lg">
        <div class="col-auto">
          <a id="Titulo" class="navbar-brand text-white" href="#">
            <img
              src="~@/assets/logo.png"
              width="40"
              height="40"
              alt=""
              loading="lazy"
            />
            Wheels US
          </a>
        </div>
        <button
          class="navbar-toggler navbar-light bg-light"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto"></ul>
          <ul class="navbar-nav mr-right">
            <li class="nav-item active">
              <router-link to="about-us" class="nav-link text-white"
                >Acerca de nosotros</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link text-white"
                >Ingresar</router-link
              >
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="container-fluid mb-5">
      <div class="row">
        <div class="col-12 col-lg-4 offset-lg-4 mt-5">
          <div class="card mb-5">
            <div class="form-col text-dark align-items-center">
              <div class="card-body">
                <img class="logo mb-4" alt="logo" src="~@/assets/logo.png" />
                <h5>Ingresa tus datos</h5>
                <div class="col-auto">
                  <div class="form-group">
                    <label class="text-dark text-left" for="name">Nombre</label>
                    <input
                      v-model="newUser.userName"
                      type="text"
                      class="form-control"
                      placeholder="Nombre completo"
                      name="name"
                      id="inputName"
                      required
                    />
                  </div>
                </div>
                <div class="col-auto">
                  <div class="form-group">
                    <label class="text-dark" for="phone"></label>
                    <input
                      v-model="newUser.userPhone"
                      type="tel"
                      class="form-control"
                      placeholder="Telefono"
                      name="phone"
                      pattern="[0-9]{10}"
                      id="inputPhone"
                      required
                    />
                  </div>
                </div>
                <div class="col-auto">
                  <div class="form-row">
                    <div class="col">
                      <input
                        v-model="email"
                        type="text"
                        class="form-control"
                        placeholder="Usuario"
                        name="user"
                        id="inputUser"
                        required
                      />
                    </div>
                    <div class="col">
                      <label for="staticEmail"> @unal.edu.co </label>
                    </div>
                  </div>
                </div>
                <div class="col-auto">
                  <div class="form-row">
                    <div class="col">
                      <label for="psw"></label>
                      <input
                        v-model="newUser.password"
                        type="password"
                        class="form-control"
                        placeholder="Contraseña"
                        name="psw"
                        id="inputPsw"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="col-auto">
                  <div class="form-row">
                    <div class="col">
                      <label for="pswRepeat"></label>
                      <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        placeholder="Confirmar contraseña"
                        name="pswRepeat"
                        id="inputpswRepeat"
                        required
                      />
                    </div>
                  </div>
                </div>
                <p>
                  Al crear una cuenta estas de acuerdo con nuestros
                  <a href="#" style="color: #06416d">Terminos y Condiciones</a>.
                </p>

                <button
                  class="btn btn-dark btn-block"
                  id="submitBtn"
                  @click="signup"
                >
                  Registrarse
                </button>
                <a
                  href="#"
                  type="button"
                  class="btn btn-danger btn-block"
                  id="cancelBtn"
                  @click="goToLogin"
                >
                  Cancelar
                </a>
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
import AuthServiceClient from "../serviceClients/AuthServiceClient";
export default {
  name: "Signup",
  components: {
    FooterwithBackground,
  },

  data() {
    return {
      newUser: {
        userName: "",
        userPhone: "",
        userMail: "",
        password: "",
        userDoc: "",
        universityId: "",
        userAddress: "",
        registryDatetime: "",
        picture: "",
        Rh: "",
      },
      email: "",
      domain: "@unal.edu.co",
      password: "",
    };
  },
  methods: {
    goToLogin() {
      this.$router.push("/");
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
      console.log(str);
      return str;
    },

    signup() {
      this.newUser.userMail = this.email + this.domain;
      this.newUser.registryDatetime = this.getFormattedDate();
      if (this.newUser.password != this.password) {
        this.$bvToast.toast("Verifica la contraseña", {
          title: "Las contraseñas no coinciden",
          autoHideDelay: 2000,
          appendToast: true,
          variant: "danger",
          solid: true,
        });
      } else {
        AuthServiceClient.registerUser(this.newUser, (response) => {
          if (response === 201) {
            this.$router.push("/");
          } else {
            this.$bvToast.toast(
              "Ocurrio un error registrando al usuario " +
                this.newUser.userMail,
              {
                title: "Error en el Registro",
                autoHideDelay: 2000,
                appendToast: true,
                variant: "danger",
                solid: true,
              }
            );
          }
        });
      }
    },
  },
};
</script>

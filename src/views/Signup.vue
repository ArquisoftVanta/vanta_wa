<template>
  <div>
    <Header></Header>
    <div class="container-fluid text-center">
      <div class="row">
        <div class="col-12 col-lg-4 offset-lg-4">
          <div class="card border border-dark shadow">
            <div class="form-col text-dark align-items-center">
              <div class="card-body">
                <!-- <img class="logo mb-4" alt="logo" src="~@/assets/logo.png" /> -->
                <h5 class="text-muted">Únete a vanta</h5>
                <h2 class="mb-3 font-weight-bold">Crea tu cuenta</h2>
                <form @submit.prevent="signup">
                  <div class="col-auto">
                    <div class="form-group">
                      <div class="input-group input-group-sm mb-2">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-sm"
                            >Nombre</span
                          >
                        </div>
                        <input
                          v-model="newUser.userName"
                          type="text"
                          class="form-control"
                          placeholder="Nombre completo"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-auto">
                    <div class="form-group">
                      <div class="input-group input-group-sm mb-2">
                        <input
                          v-model="email"
                          type="text"
                          name="user"
                          class="form-control"
                          placeholder="Usuario institucional"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-sm"
                          required
                        />
                        <div class="input-group-append">
                          <span class="input-group-text">@unal.edu.co</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-auto">
                    <div class="form-group">
                      <div class="input-group input-group-sm mb-2">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-sm"
                            >Teléfono/Celular</span
                          >
                        </div>
                        <input
                          v-model="newUser.userPhone"
                          type="phone"
                          class="form-control"
                          placeholder="Número de teléfono o celular"
                          pattern="[0-9]{10}"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-auto">
                    <div class="form-group">
                      <div class="input-group input-group-sm mb-2">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-sm"
                            >Contraseña</span
                          >
                        </div>
                        <input
                          v-model="password"
                          type="password"
                          class="form-control"
                          placeholder="Contraseña"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-auto">
                    <div class="form-group">
                      <div class="input-group input-group-sm mb-2">
                        <div class="input-group-prepend">
                          <span
                            class="input-group-text"
                            id="inputGroup-sizing-sm"
                            >Confirmación</span
                          >
                        </div>
                        <input
                          v-model="newUser.password"
                          type="password"
                          class="form-control"
                          placeholder="Repite la contraseña"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-auto">
                    <p>
                      <small
                        >Al crear una cuenta estas de acuerdo con nuestros
                        <a href="about-us">Terminos y Condiciones</a>.</small
                      >
                    </p>
                  </div>
                  <div class="row justify-content-md-center">
                    <vue-recaptcha
                      sitekey="6LdrIGUbAAAAAJ4mAo5Am81ADakb6t9lQQK_47Aj"
                      @verify="mxVerify"
                    ></vue-recaptcha>
                  </div>
                  <button type="submit" class="btn btn-warning btn-block">
                    Registrarse
                  </button>
                  <button
                    href="#"
                    type="button"
                    class="btn btn-dark btn-block btn-sm"
                    id="cancelBtn"
                    @click="goToLogin"
                  >
                    Cancelar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthServiceClient from "../serviceClients/AuthServiceClient";
import Header from "../components/Header";
import VueRecaptcha from "vue-recaptcha";
export default {
  name: "Signup",
  components: {
    Header,
    VueRecaptcha,
  },

  data() {
    return {
      recaptcha: null,
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
    mxVerify(response) {
      this.recaptcha = response;
    },
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
      if (this.recaptcha != null) {
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
            let name = response;
            if (name.userMail === this.newUser.userMail) {
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
      }
    },
  },
  beforeCreate() {
    if (localStorage.getItem("token")) {
      this.$router.push("/home");
    }
  },
};
</script>
<style scoped>
.input-group-text {
  min-width: 9vw !important;
}
</style>

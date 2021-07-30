<template>
  <div>
    <Header></Header>
    <div class="container-fluid text-dark text-center mb-0 mb-md-0">
      <div class="row text-center d-flex justify-content-around flex-wrap">
        <div
          class="col-12 col-sm-12 col-md-4 mr-1 ml-1 mb-5 mb-md-0 d-flex justify-content-center align-content-center flex-wrap"
        >
          <div class="text text-warning mt-4 mt-lg-0">
            <div class="text-center text-wrap">
              <h1 class="mb-3 pt-3 display-2 font-weight-bold">VANTA</h1>
              <p class="pb-3 lead">
                Una comunidad dispuesta a viajar junto a ti y llegar a cualquier
                lugar a tu lado.
              </p>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-warning btn-lg mt-2"
            @click="goToSignUp"
          >
            Registrate
          </button>
        </div>
        <div class="col-12 col-sm-12 col-md-4 mt-0 mt-md-5 mb-5">
          <div class="login-card card">
            <div class="card-body text-dark border-light rounded border shadow">
              <img
                class="logo mt- mb-2 mr-0 mr-md-5 ml-0 ml-md-5"
                width="200"
                src="~@/assets/logo.png"
                alt="logo"
              />
              <h3 class="mb-4 lead">
                Ingresa a tu cuenta
              </h3>
              <form @submit.prevent="login">
                <div class="form-group text-left">
                  <div class="input-group input-group-sm">
                    <input
                      v-model="userMail"
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
                <div class="form-group text-left">
                  <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-sm"
                        >Contraseña</span
                      >
                    </div>
                    <input
                      v-model="credentials.password"
                      type="password"
                      class="form-control"
                      placeholder="Contraseña"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing"
                      required
                    />
                  </div>
                </div>

                <vue-recaptcha
                  sitekey="6LdrIGUbAAAAAJ4mAo5Am81ADakb6t9lQQK_47Aj"
                  @verify="mxVerify"
                ></vue-recaptcha>

                <button type="submit" class="mt-4 mb-2 btn btn-dark btn-block">
                  Ingresar
                </button>
              </form>
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
import Header from "../components/Header.vue";
import VueRecaptcha from "vue-recaptcha";

export default {
  name: "Login",
  components: {
    FooterwithBackground,
    Header,
    VueRecaptcha,
  },

  data() {
    return {
      recaptcha: null,
      credentials: {
        userMail: "",
        password: "",
      },
      userMail: "",
      logging: false,
    };
  },
  methods: {
    mxVerify(response) {
      this.recaptcha = response;
    },

    login(event) {
      if (this.recaptcha != null) {
        this.credentials.userMail = this.userMail + "@unal.edu.co";
        AuthServiceClient.loginUser(
          this.credentials,
          () => {
            this.$router.push("home");
            this.$store.commit("updateUser", {
              userMail: this.credentials.userMail,
            });
            /*UserSC.getUser((data) => {
            //this.$store.commit("updateUser", data);
          });*/
          },
          (text) => {
            this.credentials.userMail = "";
            this.$bvToast.toast(text, {
              title: "Error de Autenticación",
              autoHideDelay: 2000,
              appendToast: true,
              variant: "danger",
              solid: true,
            });
          }
        );
        event.preventDefault();
      }
    },
    goToSignUp() {
      this.$router.push("/signup");
    },
  },
  beforeCreate() {
    if (localStorage.getItem("token")) {
      this.$router.push("/home");
    }
  },
};
</script>

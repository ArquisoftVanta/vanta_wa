<template>
  <div>
    <Header></Header>
    <div class="container-fluid text-dark mt-0 mb-5">
      <div class="row">
        <div
          class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-5 offset-md-3 offset-lg-1 mt-0 mt-lg-0 mb-3 mb-xl-5"
        >
          <div class="login-card card">
            <div class="card-body text-dark border-light shadow">
              <img class="logo mt-2 mb-5" src="~@/assets/logo.png" alt="logo" />
              <h5 class="text-muted mb-4">Ingresa a tu cuenta Vanta</h5>
              <form @submit="login">
                <div class="form-group text-left">
                  <div class="input-group input-group">
                    <input
                      v-model="userMail"
                      type="text"
                      name="user"
                      class="form-control"
                      placeholder="Usuario institucional"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing"
                      required
                    />
                    <div class="input-group-append">
                      <span class="input-group-text">@unal.edu.co</span>
                    </div>
                  </div>
                </div>
                <div class="form-group text-left">
                  <div class="input-group input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing"
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
                <button type="submit" class="mt-4 mb-2 btn btn-dark btn-block">
                  Ingresar
                </button>
              </form>
            </div>
          </div>
        </div>
        <div
          class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 offset-md-3 offset-lg-1 mt-0 mt-lg-0 pb-5 mb-5 mb-md-0"
        >
          <div class="text mt-4 mt-lg-0">
            <div class="text-center text-wrap">
              <h1 class="mb-3 font-weight-bold">VANTA</h1>
              <h5 class="">
                Una comunidad dispuesta a viajar junto a ti y 
                llegar a cualquier lugar.
              </h5>
              <!-- <h5 class="d-block d-md-none">
                Viaja en comunidad a cualquier lugar.
              </h5> -->
            </div>
          </div>
          <button
            type="button"
            class="btn btn-dark btn-lg mt-3"
            @click="goToSignUp"
          >
            ¡Únete!
          </button>
        </div>
      </div>
    </div>
    <FooterwithBackground></FooterwithBackground>
  </div>
</template>

<script>
import FooterwithBackground from "../components/FooterwithBackground";
import AuthServiceClient from "../serviceClients/AuthServiceClient";
import UserSC from "../serviceClients/UserServiceClient";
import Header from "../components/Header";

export default {
  name: "Login",
  components: {
    FooterwithBackground,
    Header
  },

  data() {
    return {
      credentials: {
        userMail: "",
        password: "",
      },
      userMail: "",
      logging: false,
    };
  },
  methods: {
    login(event) {
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
    },
    goToSignUp() {
      this.$router.push("/signup");
    },
  },
};
</script>

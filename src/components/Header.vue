<template>
  <div class="fixed-top">
    <nav id="Banner" class="navbar navbar-expand-sm container-fluid text-right">
      <div class="col-auto">
        <a class="navbar-brand text-dark" href="" @click="goToHome">
          <img src="~@/assets/logo.png" alt="vanta_logo" height="40" loading="lazy" />
        </a>
      </div>
      <button
        class="navbar-toggler navbar-dark bg-dark"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse flex-grow-1" id="navbarNav">
        <ul class="navbar-nav ml-auto flex-nowrap">
          <!-- <li class="nav-item" v-if="authenticated">
            <a href="#" class="nav-link disabled menu-item text-dark font-weight-bold"
              >Hola Francisco{{ user.userName }}
            </a>
          </li> -->
        </ul>
        <div v-if="authenticated">
          <div v-if="currentRouteName == 'driver' || currentRouteName == 'passenger'" class="btn-group dropleft mr-1">
            <button
              type="button"
              class="btn btn-light rounded-lg border border-dark"
              data-toggle="dropdown"
              data-display="static"
              aria-haspopup="true"
              @click="goToHome"
              aria-expanded="false"
            >
              <img
                class=""
                src="~@/assets/return.png"
                width="30"
                height="30"
                alt="return"
              />
            </button>
          </div>
          <div v-else-if="currentRouteName == 'createService' || currentRouteName == 'route-services'" class="btn-group dropleft mr-1">
            <button
              type="button"
              class="btn btn-light rounded-lg border border-dark"
              data-toggle="dropdown"
              data-display="static"
              aria-haspopup="true"
              @click="goToDriver"
              aria-expanded="false"
            >
              <img
                class=""
                src="~@/assets/return.png"
                width="30"
                height="30"
                alt="return"
              />
            </button>
          </div>
          <div v-else-if="currentRouteName == 'nomination-services' || currentRouteName == 'postService'" class="btn-group dropleft mr-1">
            <button
              type="button"
              class="btn btn-light rounded-lg border border-dark"
              data-toggle="dropdown"
              data-display="static"
              aria-haspopup="true"
              @click="goToPassenger"
              aria-expanded="false"
            >
              <img
                class=""
                src="~@/assets/return.png"
                width="30"
                height="30"
                alt="return"
              />
            </button>
          </div>
          <div class="btn-group dropleft mr-1">
            <button
              type="button"
              class="btn btn-light rounded-lg border border-dark"
              data-toggle="dropdown"
              data-display="static"
              aria-haspopup="true"
              v-on:click="toogleList"
              aria-expanded="false"
            >
              <img
                class=""
                src="~@/assets/mail.png"
                width="30"
                height="30"
                alt="notifications"
              />
            </button>
          </div>
          <div class="btn-group dropleft mr-1">
            <button
              type="button"
              class="btn btn-light rounded-lg border border-dark"
              data-toggle="dropdown"
              data-display="static"
              aria-haspopup="true"
              @click="getNotifications"
              aria-expanded="false"
            >
              <img
                class=""
                src="~@/assets/notification.png"
                width="30"
                height="30"
                alt="notifications"
              />
              <span
                v-if="notifications.length > 0"
                class="ml-2 badge badge-danger font-weight-bold"
                >{{ notifications.length }}</span
              >
            </button>
            <div
              v-if="notifications.length >= 0"
              class="dropdown-menu dropdown-menu-lg-left rounded-lg"
            >
              <div class="row">
                <div class="col-auto">
                  <button
                    class="header-button dropdown-item rounded-lg"
                    @click="deleteNotifications"
                  >
                    Eliminar notificación
                    <img
                      src="~@/assets/delete.png"
                      width="30"
                      height="30"
                      alt="Borrar Notificaciones"
                    />
                  </button>
                </div>
              </div>
              <div class="header-button dropdown-divider"></div>
              <div v-for="(notification, index) in notifications" :key="index">
                <button
                  class="dropdown-item rounded-lg"
                  type="button"
                  @click="goToNotification(notification.direction)"
                >
                  {{ notification.message }}
                </button>
              </div>
            </div>
          </div>
          <div class="btn-group dropleft">
            <button
              type="button"
              class="btn btn-light rounded-lg border border-dark"
              data-toggle="dropdown"
              data-display="static"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                class=""
                src="~@/assets/profile.png"
                width="30"
                height="30"
                alt="usuario"
              />
            </button>
            <div class="dropdown-menu dropdown-menu-lg-left">
              <button
                class="header-button dropdown-item rounded-lg btn btn-light"
                @click="goToProfile"
                type="button"
              >
                Perfil
              </button>
              <button
                class="header-button dropdown-item rounded-lg btn btn-light"
                @click="goToVehicleRegistration"
                type="button"
              >
                Vehículo
              </button>
              <div class="header-button dropdown-divider rounded-lg"></div>
              <button class="dropdown-item btn btn-light" @click="closeSession" type="button">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="currentRouteName == 'signup'">
            <ul class="navbar-nav">
              <li class="nav-item">
                <button type="button" class="btn btn-sm btn-light">
                  <router-link
                    to="/"
                    class="nav-link text-dark"
                    >Ingresar</router-link
                  >
                </button>
              </li>
            </ul>
          </div>
          <div v-else-if="currentRouteName == 'login'">
            <ul class="navbar-nav">
              <li class="nav-item">
                <button type="button" class="btn btn-sm btn-light">
                  <router-link
                    to="/signup"
                    class="nav-link text-dark"
                    >Registrarse</router-link
                  >
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div v-if="authenticated">
      <ChatList :showList="showList"></ChatList>
    </div>
  </div>
</template>

<script>
import ChatList from "../components/ListaChat";
import UserSC from "../serviceClients/UserServiceClient";
import NotificationSC from "../serviceClients/NotificationServiceClient";

export default {
  name: "Header",
  props: {
    nombre: String,
  },
  components: {
    ChatList,
  },
  data() {
    return {
      notifications: [],
      showList: false,
    };
  },
  created() {},

  mounted() {
    if (!this.$store.state.user) {
      UserSC.getUser((data) => {
        this.$store.commit("updateUser", data.user_mail);
        console.log(data.user_mail);
      });       
    }

    this.getNotifications();

    /*const db = firebase.firestore();
    db.collection("notifications").onSnapshot((snap) => {
      this.notifications = [];
      snap.forEach((doc) => {
        let notification = doc.data();
        notification.id = doc.id;
        if (this.user.idUser == notification.idUser) {
          this.notifications.push(notification);
        }
      });
    });*/
  },

  methods: {
    toogleList(){
      this.showList = !this.showList;
    },
    goToHome() {
      this.$router.push("home");
    },
    goToDriver() {
      this.$router.push("driver");
    },
    goToVehicleRegistration() {
      this.$router.push("vehicle-registration");
    },
    closeSession() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    goToProfile() {
      this.$router.push("profile");
    },
    goToCreateService() {
      this.$router.push("create-service");
    },
    goToPostService() {
      this.$router.push("post-service");
    },
    goToPassenger() {
      this.$router.push("passenger");
    },
    getNotifications() {
      NotificationSC.getNotification((data) => {
        this.notifications = data;
      });
    },
    goToNotification(value) {
      this.$router.push(value);
    },
    deleteNotifications() {
      NotificationSC.deleteNotification();
    },
  },
  computed: {
    authenticated() {
      return localStorage.getItem("token");
    },
    user() {
      return this.$store.state.user;
    },
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>

<style>
#Banner {
  background: linear-gradient(45deg,#FFC800,#FFC700, #FFD84D);
}
</style>
<template>
  <div class="fixed-top header-pos">
    <nav id="Banner" class="navbar navbar-expand-lg">
      <div class="col-auto">
        <a
          id="Titulo"
          class="navbar-brand text-white"
          href=""
          @click="goToHome"
        >
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
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse flex-grow-1" id="navbarNav">
        <ul class="navbar-nav ml-auto flex-nowrap">
          <li class="nav-item active">
            <router-link to="about-us" class="nav-link text-white" href=""
              >Acerca de nosotros<span class="sr-only"></span
            ></router-link>
          </li>
          <li class="nav-item" v-if="authenticated">
            <a
              href=""
              @click="goToHome"
              class="nav-link menu-item nav-active text-white"
              >Inicio</a
            >
          </li>
          <li class="nav-item" v-if="authenticated">
            <a href="#" class="nav-link menu-item text-white"
              >Hola {{ user.userName }}
            </a>
          </li>
        </ul>
        <div v-if="authenticated">
          <div class="btn-group dropleft my-2 my-lg-0">
            <button
              type="button"
              class="btn btn-light"
              data-toggle="dropdown"
              data-display="static"
              aria-haspopup="true"
              @click="getNotifications"
              aria-expanded="false"
            >
              <img
                class="notifications"
                src="~@/assets/bell.png"
                width="30"
                height="30"
                alt="notifications"
              />
            </button>
            <div class="dropdown-menu dropdown-menu-lg-left">
              <div class="row">
                <div class="col-8">
                  <h5 style="margin-top: 4%">Notificaciones</h5>
                </div>
                <div class="col-4">
                  <a @click="deleteNotifications"
                    ><img
                      src="~@/assets/trash.png"
                      width="30"
                      height="30"
                      alt="Borrar Notificaciones"
                  /></a>
                </div>
              </div>
              <div class="header-button dropdown-divider"></div>
              <div v-for="(notification, index) in notifications" :key="index">
                <button
                  class="dropdown-item"
                  type="button"
                  @click="goToNotification(notification.destination)"
                >
                  {{ notification.data }}
                </button>
              </div>
            </div>
          </div>
          <div class="btn-group dropleft my-2 my-lg-0">
            <button
              type="button"
              class="btn btn-light"
              data-toggle="dropdown"
              data-display="static"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                class="person"
                src="~@/assets/person.png"
                width="30"
                height="30"
                alt="persona"
              />
            </button>
            <div class="dropdown-menu dropdown-menu-lg-left">
              <button
                class="header-button dropdown-item"
                @click="goToProfile"
                type="button"
              >
                Mi perfil
              </button>
              <button
                class="header-button dropdown-item"
                @click="goToVehicleRegistration"
                type="button"
              >
                Registrar vehiculo
              </button>
              <div class="header-button dropdown-divider"></div>
              <button class="dropdown-item" @click="closeSession" type="button">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <ul class="navbar-nav mr-right">
            <li class="nav-item">
              <router-link to="/login" class="nav-link text-white"
                >Ingresar</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div v-if="authenticated">
      <ChatList></ChatList>
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
    };
  },
  created() {},

  mounted() {
    if (!this.$store.state.user) {
      UserSC.getUser((data) => {
        this.$store.commit("updateUser", data);
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
    goToHome() {
      this.$router.push("home");
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
  },
};
</script>

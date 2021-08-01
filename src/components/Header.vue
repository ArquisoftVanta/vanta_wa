<template>
  <div class="mb-3">
    <nav id="Banner" class="navbar navbar-expand-sm text-right mr-0 ml-0">
      <a class="navbar-brand text-dark" href="" @click="goToHome">
        <img
          src="~@/assets/logo.png"
          alt="vanta_logo"
          height="30"
          loading="lazy"
        />
      </a>
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
        <ul class="navbar-nav ml-auto flex-nowrap"></ul>
        <div
          v-if="
            authenticated &&
              (currentRouteName != 'login' || currentRouteName != 'signup')
          "
        >
          <!-- Back button -->
          <div
            v-if="
              currentRouteName == 'driver' || currentRouteName == 'passenger'
            "
            class="btn-group dropleft mr-1"
          >
            <button class="btn btn-dark" @click="goToHome">
              <img
                class=""
                src="~@/assets/return.png"
                width="30"
                height="30"
                alt="return"
              />
            </button>
          </div>
          <div
            v-else-if="
              currentRouteName == 'createService' ||
                currentRouteName == 'route-services'
            "
            class="btn-group dropleft mr-1"
          >
            <button class="btn btn-dark" @click="goToDriver">
              <img
                class=""
                src="~@/assets/return.png"
                width="30"
                height="30"
                alt="return"
              />
            </button>
          </div>
          <div
            v-else-if="
              currentRouteName == 'nomination-services' ||
                currentRouteName == 'postService'
            "
            class="btn-group dropleft mr-1"
          >
            <button class="btn btn-dark" @click="goToPassenger">
              <img
                class=""
                src="~@/assets/return.png"
                width="30"
                height="30"
                alt="return"
              />
            </button>
          </div>
          <div
            v-else-if="
              currentRouteName == 'profile' ||
                currentRouteName == 'vehicleRegistration'
            "
            class="btn-group dropleft mr-1"
          >
            <button class="btn btn-dark" @click="goToHome">
              <img
                class=""
                src="~@/assets/return.png"
                width="30"
                height="30"
                alt="return"
              />
            </button>
          </div>
          <!-- /Back button -->

          <!-- Messages button -->
          <div class="btn-group dropdown mr-1">
            <button
              type="button"
              class="btn btn-dark dropdown-toggle"
              data-toggle="dropdown"
              data-display="static"
              aria-haspopup="true"
              aria-expanded="false"
              @click="getConversations"
            >
              <img
                class=""
                src="~@/assets/mail.png"
                width="30"
                height="30"
                alt="messages"
              />
            </button>
            <div class="dropdown-menu">
              <h6 class="dropdown-header lead text-wrap">
                Mensajes
              </h6>
              <div class="header-button dropdown-divider"></div>
              <button
                type="button"
                class="dropdown-item btn btn-dark"
                v-for="(contact, index) in contacts"
                :key="index"
                @click="toogleChat(contact.user, contact.convId)"
              >
                {{ contact.user }}
              </button>
            </div>
          </div>
          <!-- /Messages button -->

          <!-- Notification button -->
          <div class="btn-group dropleft mr-1">
            <button
              type="button"
              class="btn btn-dark dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              @click="getNotifications"
              disabled
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
            <div class="dropdown-menu">
              <h6 class="dropdown-header lead text-wrap">
                Notificaciones
              </h6>
              <div class="header-button dropdown-divider"></div>
              <button
                class="dropdown-item btn btn-dark"
                @click="deleteNotifications"
              >
                Eliminar notificación
              </button>
              <div
                v-if="notifications.length > 0"
                class="dropdown-divider"
              ></div>
              <div v-for="(notification, index) in notifications" :key="index">
                <button
                  class="dropdown-item btn btn-dark"
                  type="button"
                  @click="goToNotification(notification.direction)"
                >
                  {{ notification.message }}
                </button>
              </div>
            </div>
          </div>
          <!-- /Notification button -->

          <!-- Profile button -->
          <div class="btn-group dropleft">
            <button
              class="btn btn-dark dropdown-toggle"
              type="button"
              data-toggle="dropdown"
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
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <h6 class="dropdown-header lead text-wrap">
                Ingresaste como <strong>{{ userMail }}</strong>
              </h6>
              <div class="header-button dropdown-divider"></div>
              <button
                class="dropdown-item btn btn-dark"
                @click="goToProfile"
                type="button"
              >
                Informacion
              </button>
              <button
                class="dropdown-item btn btn-dark"
                @click="goToVehicleRegistration"
                type="button"
              >
                Vehículos
              </button>
              <div class="dropdown-divider"></div>
              <button
                class="dropdown-item btn btn-dark"
                @click="closeSession"
                type="button"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
          <!-- /Profile button -->
        </div>
        <div v-else>
          <div v-if="currentRouteName == 'signup'">
            <ul class="navbar-nav">
              <li class="nav-item">
                <button type="button" class="btn btn-sm btn-dark">
                  <router-link to="/" class="nav-link text-white"
                    >Ingresar</router-link
                  >
                </button>
              </li>
            </ul>
          </div>
          <div v-else-if="currentRouteName == 'login'">
            <ul class="navbar-nav">
              <li class="nav-item">
                <button type="button" class="btn btn-sm btn-dark">
                  <router-link to="/signup" class="nav-link text-white"
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
      <Chat
        :collapse1="collapse1"
        :conversation="conversation"
        :userMail="userMail"
        :userName="userName"
        :convId="convId"
      ></Chat>
    </div>
  </div>
</template>

<script>
import Chat from "../components/Chat";
import ChatSC from "../serviceClients/ChatServiceClient";
import UserSC from "../serviceClients/UserServiceClient";
import NotificationSC from "../serviceClients/NotificationServiceClient";

export default {
  name: "Header",
  props: {
    nombre: String,
  },
  components: {
    Chat,
  },
  data() {
    return {
      contacts: [],
      conversation: [],
      collapse1: { display: "none" },
      userName: "",
      convId: "",
      driverMail: "",
      driver: false,

      notifications: [],
      showList: false,
      userMail: "",
    };
  },
  mounted() {
    this.userMail = localStorage.getItem("mail");
    if (!this.$store.state.user) {
      UserSC.getUser((data) => {
        this.$store.commit("updateUser", data.user_mail);
      });
    }
    this.getConversations();
  },
  methods: {
    toogleChat(contact, convId) {
      this.collapse1.display = "block";

      this.userName = contact;
      this.convId = convId;
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
    getConversations() {
      var email = localStorage.getItem("mail");

      ChatSC.getConversationsList(email, (data) => {
        this.contacts = [];
        data.forEach((element) => {
          if (element.user1 == email) {
            this.contacts.push({ user: element.user2, convId: element._id });
          } else {
            this.contacts.push({ user: element.user1, convId: element._id });
          }
        });
      });
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
  background: linear-gradient(45deg, #ffc800, #ffc700, #ffd84d);
}
</style>

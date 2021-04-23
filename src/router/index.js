import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./../views/Login.vue";
import Signup from "./../views/Signup.vue";
import Profile from "./../views/Profile.vue";
import VehicleRegistration from "./../views/VehicleRegistration.vue";
import Home from "./../views/Home.vue";
import DriverProfile from "@/views/DriverProfile.vue";
import AboutUS from "./../views/AboutUS.vue";
import CreateService from "./../views/CreateService.vue";
import PostService from "./../views/PostService.vue";
import Passenger from "./../views/Passenger.vue";
import Driver from "./../views/Driver.vue";
import RideRegistration from "./../views/RideRegistration.vue";
import Chat from "./../components/Chat.vue";
import Burbujas from "./../components/Burbujas.vue";
import Lista from "./../components/ListaChat.vue";
import PassengerProfile from "./../views/PassengerProfile.vue";
import ServicesDriver from "./../views/ServicesDriver.vue";
import ServicesPassenger from "./../views/ServicesPassenger.vue";
import ServiceEnded from './../views/ServiceEnded.vue'

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "login", component: Login },
  /* estoy haciendo pruebas de aqui */
  { path: "/bur", name: "bur", component: Burbujas },
  { path: "/chat", name: "chat", component: Chat },
  { path: "/lista", name: "lista", component: Lista },

  /* hasta aqui */
  { path: "/signup", name: "signup", component: Signup },
  { path: "/profile", name: "profile", component: Profile },
  {
    path: "/ride-registration",
    name: "rideRegistration",
    component: RideRegistration,
  },
  {
    path: "/vehicle-registration",
    name: "vehicleRegistration",
    component: VehicleRegistration,
  },
  { path: "/home", name: "home", component: Home },
  { path: "/driver-profile", name: "driver-profile", component: DriverProfile },
  { path: "/about-us", name: "aboutUs", component: AboutUS },
  { path: "/post-service", name: "postService", component: PostService },
  { path: "/create-service", name: "createService", component: CreateService },
  { path: "/passenger", name: "passenger", component: Passenger },
  { path: "/driver", name: "driver", component: Driver, children: []},
  {
    path: "/passenger-profile",
    name: "passenger-profile",
    component: PassengerProfile,
  },
  {
    path: "/route-services",
    name: "route-services",
    component: ServicesDriver
  },
  {
    path: "/nomination-services",
    name: "nomination-services",
    component: ServicesPassenger
  },
  { path: "/service-ended", name: "serviceEnded", component: ServiceEnded, children: []},

];

const router = new VueRouter({
  mode: "history",
  routes,
});

/*router.beforeEach((to, from, next) => {

  if (
    to.name !== "login" &&
    to.name !== "signup" &&
    to.name !== "aboutUs" &&
    !localStorage.getItem("token")
  ) {
    next({ name: "login" });
  } else {
    next();
  }
});*/

export default router;

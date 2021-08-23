<template>
  <div id="home">
    <Header></Header>
    <div class="container-fluid mb-5">
      <div class="row justify-content-lg-around">
        <div class="col-12 col-lg-5 mb-3 mb-lg-0">
          <div
            class="card bg-dark shadow text-left text-md-center mr-0 ml-0"
            type="button"
            @click="goToDrive"
          >
            <img class="card-img-top" src="~@/assets/new1.jpg" alt="driver" />
            <div class="card-body">
              <h1 class="card-title text-warning text-left text-md-center lead">
                Conductor
              </h1>
              <p class="card-text text-light mb-2">
                Como
                <strong class="text-warning">conductor</strong>
                puedes crear servicios y viajar acompañado.
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-5 mb-3 mb-lg-0">
          <div
            class="card bg-dark shadow text-left text-md-center mr-0 ml-0"
            type="button"
            @click="goToPassenger"
          >
            <img
              class="card-img-top"
              src="~@/assets/passenger.jpg"
              alt="passenger"
            />
            <div class="card-body">
              <h1 class="card-title text-warning text-left text-md-center lead">
                Pasajero
              </h1>
              <p class="card-text text-light mb-2">
                Como
                <strong class="text-warning">pasajero</strong>
                puedes postularte a cualquier servicio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterwithBackground></FooterwithBackground>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import FooterwithBackground from "../components/FooterwithBackground.vue";
import main from "../main.js"
import firebase from "firebase";
export default {
  name: "Home",
  props: {
    nombre: String,
  },
  components: {
    Header,
    FooterwithBackground,
  },
  data() {
    return {};
  },
  methods: {
    goToPassenger() {
     this.$router.push("/passenger");
    },
    goToDrive() {
      this.$router.push("/driver");
    },
  },
  beforeCreate() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/");
      }
    }
    ,
    mounted(){
    main.giveToken();    
    let user = {
    email: localStorage.getItem("mail"),
    token: localStorage.getItem("token_navigator"),
    }
    const db = firebase.firestore();
    db.collection("usernavigator").where(
              "email",
              "==",
              user.email).get().then((snap) => {
              if (snap.docs.length == 0){
              db.collection("usernavigator").doc().set(user)
              }else{
                snap.forEach(element => {
                const a = db.collection("usernavigator").doc(element.id);
                a.update({
                token: localStorage.getItem("token_navigator"),
                });
              })
              }
            })
  },
};
</script>
<style></style>

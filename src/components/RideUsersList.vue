<template>
  <div>
    <div class="accordion" id="accordionExample">
      <div class="card" v-for="(route, index) in routesMade" :key="index">
        <div class="card-header" id="headingOne">
          <h2 class="mb-0">
            <button
              class="btn btn-link btn-block text-left"
              type="button"
              data-toggle="collapse"
              :data-target="`#data${route.id}`"
              aria-expanded="true"
              :aria-controls="`data${route.id}`"
              style="color: #06416d"
            >
              <div>
                Origen:
                {{ route.originDriver.address.split(",")[0] }}
              </div>
              <div>
                Destino:
                {{ route.destinationDriver.address.split(",")[0] }}
              </div>
              <div>
                Fecha:
                {{ route.date }}
              </div>
            </button>
          </h2>
        </div>
        <div
          :id="`data${route.id}`"
          class="collapse"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            <div v-for="(rate, index1) in rates" :key="index1">
              <div v-if="rate.rideId == route.id">
                <div class="row">
                  <div class="col-8">
                    <p>{{ rate.name }}</p>
                  </div>
                  <div class="rate-btn col-4">
                    <b-button variant="primary" @click="rateUser(rate)"
                      >Califcar</b-button
                    >
                  </div>
                </div>

                <div class="row">
                  <b-form-rating
                    v-model="rate.grade"
                    variant="info"
                    class="mb-2"
                  ></b-form-rating>
                </div>

                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import RateSC from "../serviceClients/RateServiceClient";

export default {
  name: "RideUsersList",
  data() {
    return {
      routesMade: [],
      rates: [],
      value: 0,
      state: Boolean,
    };
  },
  created() {
    this.getRoutesMade();
  },
  methods: {
    getRoutesMade() {
      const db = firebase.firestore();
      db.collection("driverRoute")
        .where("dataDriver.driverMail", "==", this.$store.state.user.userMail)
        .where("servicePerformed", "==", true)
        .get()
        .then((snap) => {
          this.routesMade = [];
          snap.forEach((doc) => {
            let route = doc.data();
            route.id = doc.id;
            this.routesMade.push(route);
            this.addUserRate(route);
          });
          if (this.routesMade.length == 0) {
            this.getRoutesMadebyPassenger();
          }
        });
    },
    getRoutesMadebyPassenger() {
      this.routesMade = [];
      const db = firebase.firestore();
      for (let i = 65; i < 69; i++) {
        db.collection("driverRoute")
          .where(
            "passengers." + String.fromCharCode(i) + ".email",
            "==",
            this.$store.state.user.userMail
          )
          .where("servicePerformed", "==", true)
          .get()
          .then((snap) => {
            snap.forEach((doc) => {
              let route = doc.data();
              route.id = doc.id;
              this.routesMade.push(route);
              this.addUserRateSincePassenger(route);
            });
          });
      }
    },
    addUserRate(route) {
      for (let i = 65; i < 69; i++) {
        let passenger = route.passengers[String.fromCharCode(i)];
        if (passenger.id !== "") {
          this.rates.push({
            grader: this.$store.state.user.userMail,
            graded: passenger.email,
            grade: 0,
            rideId: route.id,
            name: passenger.name,
          });
        }
      }
    },
    addUserRateSincePassenger(route) {
      for (let i = 65; i < 69; i++) {
        let passenger = route.passengers[String.fromCharCode(i)];
        if (
          passenger.id !== "" &&
          passenger.email !== this.$store.state.user.userMail
        ) {
          this.rates.push({
            grader: this.$store.state.user.userMail,
            graded: passenger.email,
            grade: 0,
            rideId: route.id,
            name: passenger.name,
          });
        }
      }
      this.rates.push({
        grader: this.$store.state.user.userMail,
        graded: route.dataDriver.driverMail,
        grade: 0,
        rideId: route.id,
        name: route.dataDriver.driverName,
      });
    },
    rateUser(rate) {
      var rating = {
        grader: rate.grader,
        graded: rate.graded,
        grade: rate.grade,
        rideId: rate.rideId,
      };
      RateSC.createRate(rating, () => {
        this.$bvToast.toast(
          "Se ha calificado correctamente el usuario " + rate.name,
          {
            title: "Calificación exitosa",
            autoHideDelay: 4000,
            appendToast: true,
            variant: "success",
            solid: true,
          }
        );
      });
    },
  },
  computed: {},
};
</script>

<style>
.rate-btn {
  padding-bottom: 10px;
}
</style>
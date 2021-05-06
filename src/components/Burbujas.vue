<template>
  <div class="row">
    <div class="col-6">
      <div
        class="btn btn-light btn-block text-wrap mb-1 pb-0 pt-2 text-left"
        disabled
        v-if="sender != userMail"
      >
        <p>{{ message }}</p>
      </div>
    </div>
    <div class="col-6">
      <div
        class="btn btn-dark btn-block text-wrap mb-1 pb-0 pt-2 text-right"
        disabled
        v-if="sender == userMail"
      >
        <p class="">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
//import UserSC from "../serviceClients/UserServiceClient";

export default {
  name: "Burbuja",
  props: {
    sender: String,
    message: String,
  },
  //pasar cor,
  data() {
    return {
      userMail: "",
    };
  },
  mounted() {
    //this.getUserDB();
    this.userMail = this.$store.state.user;
  },
  methods: {},
};
</script>

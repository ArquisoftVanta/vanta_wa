<template>
  <div class="row">
    <div class="col-6">
      <div
        class="btn btn-light btn-block text-wrap mb-1 pb-0 pt-2 text-left"
        disabled
        v-if="type != user.userMail"
      >
        <p>{{ message }}</p>
      </div>
    </div>
    <div class="col-6">
      <div
        class="btn btn-dark btn-block text-wrap mb-1 pb-0 pt-2 text-right"
        disabled
        v-if="type == user.userMail"
      >
        <p class="">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserSC from "../serviceClients/UserServiceClient";

export default {
  name: "Burbuja",
  props: {
    type: String,
    message: String,
  },
  //pasar cor,
  data() {
    return {
      user: {
        userName: "",
        userDoc: "",
        userPhone: "",
        universityId: "",
        userMail: "",
        userAddress: "",
        password: "",
        registryDatetime: "",
        picture: "",
        vehicleModel: [],
        Rh: "",
      },
    };
  },
  mounted() {
    this.getUserDB();
  },
  methods: {
    getUserDB() {
      UserSC.getUser((data) => {
        this.user = data;
      });
    },
  },
};
</script>

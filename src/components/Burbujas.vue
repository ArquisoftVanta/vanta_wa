<template>
  <div class="row">
    <div class="col-9">
      <div
        class="btn btn-light btn-block text-wrap pt-1 pb-1 text-left mb-1"
        disabled
        v-if="sender != userMail"
      >
        {{ message }}
      </div>
    </div>
    <div class="col-9 offset-3">
      <div
        class="btn btn-dark btn-block text-wrap pt-1 pb-1 text-right mb-1"
        disabled
        v-if="sender == userMail"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Burbuja",
  props: {
    sender: String,
    message: String,
  },
  //Pasar coordenadas,
  data() {
    return {
      userMail: "",
    };
  },
  mounted() {
    this.userMail = localStorage.getItem("mail");
  },
  methods: {},
};
</script>

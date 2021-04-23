<template>
  <div>
    <div class="row">
      <div class="col">
        <img
          src="../assets/person.png"
          class="img-thumbnail align-self-center h-25"
          alt=" Imagen de perfil"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label for="profile01">Nombre</label>
        <input
          v-model="userProfile.userName"
          type="text"
          class="form-control form-control-sm text-center"
          id="profile01"
          placeholder="Nombres completos"
          readonly
        />
      </div>
      <div class="col">
        <label for="profile02">Correo</label>
        <input
          v-model="userProfile.userMail"
          type="text"
          class="form-control form-control-sm text-center"
          id="profile02"
          placeholder="Nombres completos"
          readonly
        />
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col">
        <label for="profile03">Telefono</label>
        <input
          v-model="userProfile.userPhone"
          type="text"
          class="form-control form-control-sm text-center"
          id="profile03"
          placeholder="Nombres completos"
          readonly
        />
      </div>
      <div class="col">
        <label for="profile04">Calificación</label>
        <input
          v-model="userProfile.rate"
          type="text"
          class="form-control form-control-sm text-center"
          id="profile04"
          placeholder="Nombres completos"
          readonly
        />
      </div>
    </div>
  </div>
</template>

<script>
import UserSC from "../serviceClients/UserServiceClient";
export default {
  name: "FastProfile",
  props: {
    userMail: String,
  },
  data() {
    return {
      userProfile: {
        picture: "",
        userName: "",
        userMail: "",
        userPhone: "",
        rate: "",
      },
    };
  },
  mounted() {
    this.getFastProfileDB(this.userMail);
  },
  methods: {
    getFastProfileDB(userMail) {
      UserSC.getFastProfile(userMail, (data) => {
        this.userProfile = data;
      });
    },
  },
};
</script>
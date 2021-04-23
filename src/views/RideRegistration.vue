<template>
  <div>
    <nav id="Banner" class="navbar navbar-expand-sm fixed-top">
      <div class="col-auto">
        <a id="Titulo" class="navbar-brand text-white" href="#">
          <img
            src="~@/assets/carrito.png"
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
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav mr-right">
          <li class="nav-item active">
            <a class="nav-link text-white" href="#"
              >Acerca de <span class="sr-only"></span
            ></a>
          </li>
          <li>
            <router-link to="/" class="nav-link text-white"
              >Iniciar sesión</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <div class="row mb-3">
        <div class="col">
          <form>
            <div class="card-body">
              <div class="col-auto">
                <h2>Postula tu viaje</h2>
                <div class="form-group">
                  <label for="salida"></label>
                  <input
                    v-model="lugarSalida"
                    type="text"
                    class="form-control"
                    placeholder="Lugar de salida "
                    name="salida"
                    id="inputName"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="destino"></label>
                  <input
                    v-model="destino"
                    type="text"
                    class="form-control"
                    placeholder="Lugar de destino"
                    name="destino"
                    id="inputPhone"
                    required
                  />
                </div>
                <div class="col-auto">
                  <div class="form-row">
                    <div class="col">
                      <input
                        v-model="user"
                        type="date"
                        class="form-control"
                        placeholder="Fecha  "
                        name="user"
                        id="inputUser"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="hora"></label>
                  <input
                    v-model="hora"
                    type="time"
                    class="form-control"
                    placeholder="Hora"
                    name="hora"
                    id="inputName"
                    required
                  />
                </div>

                <div class="col-auto" position="center">
                  <a
                    href="#"
                    type="button"
                    class="btn btn-light"
                    id="cancelBtn"
                    style="margin: 2% 2% 2% 2%"
                  >
                    Cancelar
                  </a>
                  <button
                    type="submit"
                    class="btn btn-outline-dark btn-block"
                    name="submitBtn"
                    id="submitBtn"
                    style="margin: 2% 2% 2% 2%"
                    @click="goTo"
                  >
                    Postularme
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="col">
          <h2></h2>
          <label for="comentarios"
            >Deje aquí sus comentarios para la postulacion</label
          >
          <textarea
            class="form-control"
            rows="5"
            id="comentarios"
            name="comentarios"
          ></textarea>
          <pre class="mt-3 mb-0">{{ text }}</pre>
        </div>
        <div class="col">.col3</div>
      </div>
    </div>

    <FooterwithBackground></FooterwithBackground>
  </div>
</template>

<script>
import FooterwithBackground from "../components/FooterwithBackground.vue";
export default {
  name: "Signup",
  components: {
    FooterwithBackground,
  },
  data() {
    return {
      phone: null,
    };
  },
  methods: {
    goTo() {
      this.$router.push("home");
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
h2 {
  margin: 5% 0% 3%;
  color: black;
}

.signup {
  opacity: 0.8;
  position: center;
  width: 30%;
  margin: 5% 0% 0% 35%;
}
/*
input[type=text]{
  position: center;
  width: 90%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
  background-color: #ddd;
  outline: gray;
}

Full-width input fields */
input[type="password"],
#inputName,
input[type="tel"],
input[type="number"],
input[type="text"],
:focus {
  position: center;
  width: 90%;
  padding: 15px;
  margin: 2px 0 2px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

#inputUser {
  position: left;
  width: 100%;
  padding: 10px;
  margin: 0 10px 25px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

.rowBtn {
  position: center;
  margin: 0% 0% 0% 35%;
}

#Banner {
  background-color: #06416d;
  margin-bottom: 50%;
}
</style>

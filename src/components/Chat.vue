<template>
  <div id="home">
    <Header></Header>
    <div class="container-fluid fixed-bottom">
      <div class="row">
        <div class="col-12">
          <div v-bind:style="collapse1" id="collapseChat">
            <div
              class="chatbody z-index-3 col-12 col-md-6 offset-md-6 col-lg-4 offset-lg-8"
            >
              <button
                class=" col-12 btn btn-dark border border-light text-white shadow"
                @click="toogleChat()"
              >
                {{ userName }}
              </button>

              <div class="card card-body messages-body border border-dark shadow">
                <Burbuja
                  v-for="(message, index) in conversation"
                  :key="index"
                  :type="message.sender"
                  :message="message.msg"
                ></Burbuja>
              </div>

              <div class="input-group">
                <input
                  type="text"
                  class="form-control border border-dark shadow"
                  id="message"
                  placeholder="Escriba su mensaje"
                  aria-label="Escriba su mensaje"
                  aria-describedby="button-addon2"
                  v-model="textMsg"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-primary"
                    type="submit"
                    id="button-addon2"
                    accesskey="”intro″"
                    @click="sendMsg"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Burbuja from "../components/Burbujas.vue";
import firebase from "firebase";

export default {
  name: "Chat",
  props: {
    collapse1: Object,
    conversation: Array,
    userMail: String,
    userName: String,
    idDoc: String,
  },
  components: { Burbuja },
  data() {
    return {
      textMsg: "",
      nuevo: "nuevo",
    };
  },

  mounted() {
    var input = document.getElementById("message");
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("button-addon2").click();
      }
    });
  },

  methods: {
    toogleChat() {
      if (this.collapse1.display == "block") {
        this.collapse1.display = "none";
      } else if (this.collapse1.display == "none") {
        this.collapse1.display = "block";
      }
    },
    sendMsg() {
      const db = firebase.firestore();
      var washingtonRef = db.collection("Chat").doc(this.idDoc);
      if (this.textMsg) {
        this.conversation.push({ sender: this.userMail, msg: this.textMsg });

        washingtonRef.update({
          mensajes: this.conversation,
        });

        //this.conversation.push({ sender: 1, msg: this.textMsg });

        this.textMsg = "";
      }
    },
  },
};

// Initialize Firebase
</script>

<style>
.messages-body {
  height: 300px;
  overflow: auto;
}
.chatbody {
  bottom: 59px;
}
</style>

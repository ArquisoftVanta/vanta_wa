<template>
  <div id="home">
    <div class="container-fluid fixed-bottom mb-5">
      <div class="row ">
        <div class="col-12 col-md-6 offset-md-6 col-lg-4 offset-lg-8">
          <div class="card" v-bind:style="collapse">
            <div
              class="card-header d-flex justify-content-between align-items-center"
            >
              {{ userName }}
              <div class="btn btn-sm btn-dark" @click="toogleChat()">
                Ocultar conversación
              </div>
            </div>
            <div class="card-body messages-body overflow-auto">
              <Burbuja
                v-for="(message, index) in conversation"
                :key="index"
                :sender="message.sender"
                :message="message.content"
              ></Burbuja>
            </div>
            <div class="card-footer">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="message"
                  placeholder="Escriba su mensaje"
                  aria-label="Escriba su mensaje"
                  aria-describedby="button-addon2"
                  v-model="textMsg"
                  autocomplete="off"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-dark"
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
import ChatSC from "../serviceClients/ChatServiceClient";
import io from "socket.io-client";

export default {
  name: "Chat",
  props: {
    collapse: Object,
    userMail: String,
    userName: String,
    convId: String,
  },
  components: { Burbuja },
  data() {
    return {
      textMsg: "",
      nuevo: "nuevo",
      conversation: [],
      socket: null,
    };
  },
  watch: {
    convId: function(newValue, oldValue) {
      this.convId = newValue;
      this.getConversation();

      var usr = this.$store.state.user;
      var cht = this.convId;
      this.socket.auth = { usr, cht };
      this.socket.connect();
    },
  },

  mounted() {
    var input = document.getElementById("message");
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("button-addon2").click();
      }
    });
    this.createSocket();
  },

  methods: {
    createSocket() {
      this.socket = io("http://44.195.120.118:30000", {
        autoConnect: false,
        transports: ["websocket"],
      });
      let self = this;
      // Evento
      this.socket.on("private message", function({ content, user }) {
        self.getConversation();
      });
    },
    getConversation() {
      ChatSC.getConversation(
        localStorage.getItem("mail"),
        this.convId,
        (data) => {
          this.conversation = data.conversation;
        }
      );
    },
    toogleChat() {
      /* this.getConversation(); */
      if (this.collapse.display == "block") {
        this.collapse.display = "none";
      } else if (this.collapse.display == "none") {
        this.collapse.display = "block";
      }
    },
    sendMsg() {
      let self = this;
      ChatSC.sendMessage(
        this.convId,
        this.$store.state.user,
        this.textMsg,
        (data) => {
          this.socket.emit("private message", {
            content: self.textMsg,
            user: self.$store.state.user,
            chatId: self.convId,
          });

          var email = this.$store.state.user;
          this.textMsg = "";
          // Actualizar chat
          ChatSC.getConversation(email, this.convId, (data) => {
            this.conversation = data.conversation;
          });
        }
      );
    },
  },
};
</script>

<style>
.messages-body {
  height: 35vh;
  overflow: auto;
}
</style>

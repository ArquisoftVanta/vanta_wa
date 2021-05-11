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
                class="col-12 btn btn-dark border border-light text-white shadow"
                @click="toogleChat()"
              >
                {{ userName }}
              </button>

              <div
                class="card card-body messages-body border border-dark shadow"
                id="chatBody"
              >
                <Burbuja
                  v-for="(message, index) in conversation"
                  :key="index"
                  :sender="message.sender"
                  :message="message.content"
                ></Burbuja>
                <div id="target"></div>
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
//import firebase from "firebase";
import ChatSC from "../serviceClients/ChatServiceClient";
import io from "socket.io-client";

export default {
  name: "Chat",
  props: {
    collapse1: Object,
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
    convId: function (newValue, oldValue) {
      this.convId = newValue;
      this.getConversation();

      var usr = this.$store.state.user;
      var cht = this.convId;
      this.socket.auth = { usr, cht };
      this.socket.connect();
      console.log(this.socket);
    },
  },

  mounted() {
    var input = document.getElementById("message");
    input.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("button-addon2").click();
      }
    });
    this.getConversation();
    this.toBottom();
    this.createSocket();
  },

  methods: {
    createSocket() {
      this.socket = io("http://localhost:8600", { autoConnect: false });
      let self = this;
      // Evento
      this.socket.on("private message", function ({ content, user }) {
        self.getConversation();
      });
    },
    getConversation() {
      ChatSC.getConversation(
        this.$store.state.user,
        this.convId,
        (data) => {
          this.conversation = data.conversation;
        }
      );
    },
    toogleChat() {
      if (this.collapse1.display == "block") {
        this.collapse1.display = "none";
      } else if (this.collapse1.display == "none") {
        this.collapse1.display = "block";
      }
    },
    toBottom() {
      var target = document.getElementById("target");
      target.style.minHeight = "200px";
      var div = document.getElementById("chatBody");
      /*       div.scrollIntoView({
        block: "end",
        behavior: "smooth",
        inline: "start",
      }); */
      div.scrollTop = div.scrollHeight;
      target.style.minHeight = "0px";
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
            this.toBottom();
          });
        }
      );

      /*       const db = firebase.firestore();
      var washingtonRef = db.collection("Chat").doc(this.idDoc);
      if (this.textMsg) {
        this.conversation.push({ sender: this.userMail, msg: this.textMsg });

        washingtonRef.update({
          mensajes: this.conversation,
        });

        //this.conversation.push({ sender: 1, msg: this.textMsg });

        this.textMsg = "";
      } */
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
#target {
  min-height: 0px;
  background-color: white;
}
</style>

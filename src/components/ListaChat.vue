<template>
  <div class="container-fluid">
    <div class="row justify-content-end">
      <div class="col-6 col-md-2 text-center text-white">
        <a
          class="btn btn-dark btn-block mt-1 pt-1 pl-1 pb-1 pr-1 border border-light shadow"
          @click="toogleList"
        >
          Mensajes
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 offset-md-3 text-center mt-2 mb-2">
        <div
          class="list-group list-contacts bg-dark text-white pt-2 pb-1 pl-1 pr-1 border border-light shadow-sm"
          v-bind:style="collapselist"
        >
          <h3 id="title-contacts" type="button" @click="toogleList">
            Conversaciones disponibles
          </h3>
          <button
            type="button"
            v-for="(contact, index) in contacts"
            :key="index"
            class="list-group-item list-group-item-action font-weight-bold"
            @click="toogleChat(contact)"
          >
            {{ contact }}
          </button>
        </div>
      </div>
    </div>
    <Chat
      :collapse1="collapse1"
      :conversation="conversation4"
      :userMail="user.userMail"
      :userName="userName"
      :idDoc="idDoc"
    ></Chat>
  </div>
</template>
<script>
import Chat from "../components/Chat";
import UserSC from "../serviceClients/UserServiceClient";
import ChatSC from "../serviceClients/ChatServiceClient";
import firebase from "firebase";

export default {
  name: "ChatList",
  props: {},
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
      contacts: [],

      conversation4: [],

      collapse1: { display: "none" },
      collapselist: { display: "none" },
      userName: "",
      idDoc: "",
      viejo: "viejo",
      driverMail: "",
      driver: false,
    };
  },
  created() {
    this.getUserDB();
  },

  mounted() {},
  updated() {},
  components: {
    Chat,
  },
  methods: {
    toogleList() {
      if (this.collapselist.display == "block") {
        this.collapselist.display = "none";
      } else if (this.collapse1.display == "none") {
        this.getConversations();
        this.collapselist.display = "block";
      }
    },
    toogleChat(contact) {
      const db = firebase.firestore();

      if (this.collapse1.display == "block") {
        this.collapse1.display = "none";
      } else if (this.collapse1.display == "none") {
        this.collapse1.display = "block";
      }
      this.userName = contact;
      /*
      var pas;
      if (this.driver) {
        pas = this.user.userMail + contact;
      } else {
        pas = contact + this.user.userMail;
      }

      this.idDoc = pas;

      var self = this;

      db.collection("Chat")
        .doc(pas)
        .onSnapshot(function (doc) {
          self.conversation4 = doc.data().mensajes;
        }); */
    },
    getConversations() {
      //var email = this.$store.state.user;
      var email = "enderson@unal.edu.co";
      ChatSC.getConversations((data) => {
        data.forEach((element) => {
          this.contacts.push({ user: element.user1, convId: element._id });
        });
      }, email);
    },

    getUserDB() {
      UserSC.getUser((data) => {
        this.user = data;
      });
    },
    createChats(contacts) {
      const db = firebase.firestore();
      var i;

      for (i = 0; i < contacts.length; i++) {
        let pas;
        pas = this.user.userMail + contacts[i].email;

        db.collection("Chat").doc(pas).set({
          mensajes: [],
        });
      }
    },
    isDriver() {
      const db = firebase.firestore();
      var self = this;

      db.collection("driverRoute")
        .where("routeActive", "==", true)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots

            self.driverMail = doc.data().dataDriver.driverMail;

            if (doc.data().dataDriver.driverMail == self.user.userMail) {
              self.driver = true;
              for (let i = 65; i < 69; i++) {
                let passenger = doc.data().passengers[String.fromCharCode(i)];
                if (passenger.name !== "") {
                  self.contacts.push({
                    name: passenger.name,
                    email: passenger.email,
                  });
                }
                self.createChats(self.contacts);
              }
              console.log(self.contacts);
            } else {
              for (let i = 65; i < 69; i++) {
                let passenger = doc.data().passengers[String.fromCharCode(i)];
                if (passenger.email == self.user.userMail) {
                  self.contacts.push({
                    name: doc.data().dataDriver.driverName,
                    email: doc.data().dataDriver.driverMail,
                  });
                }
                self.createChats(self.contacts);
              }
            }
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    },
  },
};
</script>
<style>
.list-item {
  color: black;
}
</style>
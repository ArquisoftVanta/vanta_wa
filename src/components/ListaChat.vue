<template>
  <div class="container-fluid">
    <div class="row justify-content-end">
      <div class="col-12 col-md-4 offset-md-3 text-center mt-2 mb-2">
        <div
          v-if="showList"
          class="pt-1 pb-1 list-group list-contacts bg-dark text-white border border-light shadow-sm"
        >
          <h5 class="mb-0">Conversaciones disponibles</h5>
          <button
            type="button"
            v-for="(contact, index) in contacts"
            :key="index"
            class="list-group-item list-group-item-action font-weight-bold"
            @click="toogleChat(contact.user, contact.convId)"
          >
            {{ contact.user }}
          </button>
        </div>
      </div>
    </div>
    <Chat
      :collapse1="collapse1"
      :conversation="conversation4"
      :userMail="user.userMail"
      :userName="userName"
      :convId="convId"
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
  props: ["showList"],
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
      userName: "",
      convId: "",
      driverMail: "",
      driver: false,
    };
  },
  created() {
    //this.getUserDB();
  },

  mounted() {
    this.getConversations();
  },
  updated() {},
  components: {
    Chat,
  },
  methods: {
    toogleChat(contact, convId) {
      /*       if (this.collapse1.display == "block") {
        this.collapse1.display = "none";
      } else if (this.collapse1.display == "none") {
        this.collapse1.display = "block";
      } */
      this.collapse1.display = "block";

      this.userName = contact;
      this.convId = convId;
    },
    getConversations() {
      var email = this.$store.state.user.userMail;
      console.log(email);

      ChatSC.getConversationsList(email, (data) => {
        this.contacts = [];
        data.forEach((element) => {
          if (element.user1 == email) {
            this.contacts.push({ user: element.user2, convId: element._id });
          } else {
            this.contacts.push({ user: element.user1, convId: element._id });
          }
        });
      });
    },

    /*    
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
    }, */
  },
};
</script>

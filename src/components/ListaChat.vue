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

  mounted() {
    if (!this.$store.state.user) {
      UserSC.getUser((data) => {
        this.$store.commit("updateUser", data.user_mail);
        this.getConversations();
      });
    }
  },
  components: {
    Chat,
  },
  methods: {
    toogleChat(contact, convId) {
      this.collapse1.display = "block";

      this.userName = contact;
      this.convId = convId;
    },
    getConversations() {
      var email = this.$store.state.user;
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
  },
};
</script>

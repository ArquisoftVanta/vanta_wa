import AuthSC from "../serviceClients/AuthServiceClient";
import UserSC from "../serviceClients/UserServiceClient";

function getUser(callback) {
    AuthSC.getUserMailByToken((response) => {
        UserSC.getUser(response, (data) => {
            /*if (!this.$store.state.user) {
                this.$store.commit("updateUser", data);
            }*/
            callback(data)
        });
    });
}

function updateUser(user, callback) {
    AuthSC.getUserMailByToken((response) => {
        UserSC.updateUser(user, (data) => {
            callback(data)
        })
    });

}




export default {
    getUser,
    updateUser

}
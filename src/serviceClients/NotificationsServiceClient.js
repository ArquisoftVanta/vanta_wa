import firebase from "firebase";
const axios = require("axios");
var emailA;
var titleA;

function send() {
    console.log(titleA)
    return emailA, titleA
}

function createNotification(email, title, body) {
    emailA = titleA
    titleA = body
    const db = firebase.firestore();
    const messaging = firebase.messaging();

    db.collection("usernavigator").where(
        "email",
        "==",
        email).get().then((snap) => {
        snap.forEach(element => {
            db.collection("usernavigator").doc(element.id).get().then((data) => {
                axios({
                    method: 'POST',
                    url: 'https://fcm.googleapis.com/fcm/send',
                    headers: {
                        'Authorization': 'key=AAAAgcRWRRY:APA91bECjL2s9kfacqI08_Ntz2Gl3ATVNdyQoFs0ASSOuotBgkinwnQLT8OUOZm7GLJkhaBEvlFPGbwbZVfQzpoXfoGj9r_zVKj8zvWV2CYYS1TJJhdM9xp93GSjl6XAFzI6w6Zkwbq-',
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "data": {
                            "notification": {
                                "title": title + " te envió un mensaje:",
                                "body": body,
                                "icon": "https://i.ibb.co/Lxr9z3D/logo.png"

                            }
                        },
                        "to": data.data().token
                    }

                }).then((res) => {
                    console.log(res);
                }).catch((res2) => {
                    console.log(res2)
                })
            });
        })

    })

}

export default {
    createNotification,
    send
}
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyAPoQCAkJr6IqI9As8n9rq8lLtWObSl3yw",
    authDomain: "vanta-132d2.firebaseapp.com",
    databaseURL: "https://vanta-132d2-default-rtdb.firebaseio.com/",
    projectId: "vanta-132d2",
    storageBucket: "vanta-132d2.appspot.com",
    messagingSenderId: "557344769302",
    appId: "1:557344769302:web:7c3ff58d300d60fbb5fc37",
    measurementId: "G-07FD4P162Z"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


/*messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        //icon: 'http://localhost/notificaciones/img/icon.png'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});*/
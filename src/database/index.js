// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app')
const serviceKey = require("../../service_key.json");
const admin = require('firebase-admin');


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCHbpReZLKcHhVx8cf9FgayA6YCmVAHIk4",
    authDomain: "vue-express-backend.firebaseapp.com",
    projectId: "vue-express-backend",
    storageBucket: "vue-express-backend.appspot.com",
    messagingSenderId: "234556098177",
    appId: "1:234556098177:web:be4baa14a18d36b1d42f80",
    measurementId: "G-NLZWBS9W6Y"
};


admin.initializeApp({
    credential: admin.credential.cert(serviceKey),
    databaseURL: firebaseConfig
});

const db = admin.firestore();

module.exports = db

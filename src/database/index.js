// Import the functions you need from the SDKs you need

require('dotenv').config();
const serviceKey = require("../../service_key.json");
const admin = require('firebase-admin');


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};


admin.initializeApp({
    credential: admin.credential.cert(serviceKey),
    databaseURL: firebaseConfig
});

const db = admin.firestore();

module.exports = db

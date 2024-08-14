// firebase.js
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const dotenv = require("dotenv");
dotenv.config();
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain:  process.env.authDomain,
    projectId:  process.env.projectId,
    storageBucket:  process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId:  process.env.appId,
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
if (storage) {
    console.log("Firebase storage connected successfully");
}
module.exports = { storage };

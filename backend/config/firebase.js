// firebase.js
const initializeApp = require("firebase/app");
const getStorage = require('firebase/storage');

const firebaseConfig = {
    apiKey: process.env.firebaseAPI,
    authDomain: process.env.firebaseProjectID+'.firebaseapp.com',
    projectId: process.env.firebaseProjectID,
    storageBucket: process.env.firebaseProjectID+".appspot.com/library",
    messagingSenderId: process.env.firebaseMessagingSenderID,
    appId: "1:"+process.env.firebaseMessagingSenderID+":web:f342178005906f5947ee06"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
if(storage){
    console.log("Firebase storage connected successfully");
}
module.exports={storage};

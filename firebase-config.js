// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBvHmysF2Cneuca0rN8Xqcx-5i7cfYtkk",
  authDomain: "photofeed-ce4a7.firebaseapp.com",
  projectId: "photofeed-ce4a7",
  storageBucket: "photofeed-ce4a7.appspot.com",
  messagingSenderId: "955271059561",
  appId: "1:955271059561:web:38ce5059bc24068848eaf8",
  measurementId: "G-6N83D6KPWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
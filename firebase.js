import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDAnBNdufwLlMW4bZHK0mUgncmIezNSMTg",
  authDomain: "minha-loja-digital1.firebaseapp.com",
  projectId: "minha-loja-digital1",
  storageBucket: "minha-loja-digital1.firebasestorage.app",
  messagingSenderId: "119834670597",
  appId: "1:119834670597:web:577f0ef6602d4618678e6c"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

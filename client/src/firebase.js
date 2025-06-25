// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2Hc0kqVjfDOqr77zRm8E6_ZgH_u8VPkE",
  authDomain: "healstay-51f3f.firebaseapp.com",
  projectId: "healstay-51f3f",
  storageBucket: "healstay-51f3f.firebasestorage.app",
  messagingSenderId: "911923766229",
  appId: "1:911923766229:web:3a95675698cc8d31e5d35c",
  measurementId: "G-SPQBLFLKH8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

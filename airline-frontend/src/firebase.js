// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAlMVvLdxaFLOfbR0gjmGMpg5hX-6NQkHk",
  authDomain: "flyhigh-auth.firebaseapp.com",
  projectId: "flyhigh-auth",
  storageBucket: "flyhigh-auth.firebasestorage.app",
  messagingSenderId: "189200457126",
  appId: "1:189200457126:web:2908142e5d5395befd0367",
  measurementId: "G-7Q5X0KXT26",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase

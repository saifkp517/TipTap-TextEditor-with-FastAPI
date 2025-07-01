
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApIfWzATuu3aYegudNeu0-3rxXMlgASPo",
  authDomain: "firba-2780f.firebaseapp.com",
  projectId: "firba-2780f",
  storageBucket: "firba-2780f.firebasestorage.app",
  messagingSenderId: "765595891719",
  appId: "1:765595891719:web:16d4d26135151bb69fd2a2",
  measurementId: "G-FGN0KZEDR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
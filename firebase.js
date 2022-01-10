// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj9FsSD65uZiq8nAYS_wYSGJZ4p9N4oYE",
  authDomain: "gappnadero.firebaseapp.com",
  projectId: "gappnadero",
  storageBucket: "gappnadero.appspot.com",
  messagingSenderId: "857340731134",
  appId: "1:857340731134:web:2ac02cba9c848ff21c0faf",
  measurementId: "G-JSGNJFR7X1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export default db;

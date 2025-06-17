import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAy7SQMQhMokDTehflTUbEHoahUEHU8LE",
  authDomain: "applogin-70e48.firebaseapp.com",
  databaseURL: "https://applogin-70e48-default-rtdb.firebaseio.com",
  projectId: "applogin-70e48",
  storageBucket: "applogin-70e48.appspot.com",
  messagingSenderId: "488434513391",
  appId: "1:488434513391:web:b7b5c92d6e9fe3ed48f21a",
  measurementId: "G-ZQPK4F7MPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, app };
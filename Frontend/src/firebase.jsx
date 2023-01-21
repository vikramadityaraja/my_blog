
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7gMsQNjANDdZXwoR3914mz8GuTpYMUng",
  authDomain: "fir-cca4a.firebaseapp.com",
  projectId: "fir-cca4a",
  storageBucket: "fir-cca4a.appspot.com",
  messagingSenderId: "350017126441",
  appId: "1:350017126441:web:ef7e9e84e434cd4eee9c38"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();

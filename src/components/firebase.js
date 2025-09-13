import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCMO83C6gLh4l-WP96gQksc3Zsnk0bZQyU",
  authDomain: "prwa-72e15.firebaseapp.com",
  projectId: "prwa-72e15",
  storageBucket: "prwa-72e15.firebasestorage.app",
  messagingSenderId: "224827601390",
  appId: "1:224827601390:web:ed47ab629ac126bd431eff",
  measurementId: "G-TX5NE0ZESS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

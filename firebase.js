import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// import dotenv from 'dotenv';
// dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyC5YhwwJ-yMAgA5fsrqhGDIKg69imrnXJQ",
  authDomain: "grim--chat.firebaseapp.com",
  projectId: "grim--chat",
  storageBucket: "grim--chat.appspot.com",
  messagingSenderId: "377915894274",
  appId: "1:377915894274:web:af0c25947e2e053729551b",
  measurementId: "G-5E1HXX8C2H"
};

let app;

try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  if (!/already exists/.test(error.message)) {
    console.error("Firebase initialization error", error.stack);
  }
}

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
export const storage = getStorage(app);

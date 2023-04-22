/** @format */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2VxcAr80foavjtLN5dQOtbiVRoYUmMsU",
  authDomain: "dr-azza-clinc.firebaseapp.com",
  projectId: "dr-azza-clinc",
  storageBucket: "dr-azza-clinc.appspot.com",
  messagingSenderId: "377768825451",
  appId: "1:377768825451:web:ca33503277fd045ed3572e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

/** @format */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMLFL2VwOrTSgRu1YQpvWkgjdqvWQmZZU",
  authDomain: "atsc-demo.firebaseapp.com",
  projectId: "atsc-demo",
  storageBucket: "atsc-demo.appspot.com",
  messagingSenderId: "325056493148",
  appId: "1:325056493148:web:5a7332449621cf0a15d899",
  measurementId: "G-V2R5KS1YLH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


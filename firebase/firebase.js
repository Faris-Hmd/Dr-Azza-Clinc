/** @format */
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { connectStorageEmulator, getStorage } from "firebase/storage";

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
export const auth = getAuth(app);
export const storage = getStorage(app);

export const db = getFirestore(app);

// if (process.env.NODE_ENV === "development") {
//   connectStorageEmulator(storage, "localhost", 9199);
//   if (!db._settingsFrozen) {
//     console.log(db._settingsFrozen);
//     connectFirestoreEmulator(db, "localhost", 8080);
//   }
// }
// if (process.env.NODE_ENV === "development") {
//   connectFirestoreEmulator(db, "localhost", 3000);
// }

// connectFirestoreEmulator(db, "http://127.0.0.1", 3000);

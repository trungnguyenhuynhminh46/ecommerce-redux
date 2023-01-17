// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8WDFNMR-UDR2tr2fA4ZogV8LCCQlnD70",
  authDomain: "ecommerse-redux.firebaseapp.com",
  projectId: "ecommerse-redux",
  storageBucket: "ecommerse-redux.appspot.com",
  messagingSenderId: "928146238388",
  appId: "1:928146238388:web:cbe82d52780926bf28e0e1",
  measurementId: "G-YGWHD1E5HV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export default app;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD25Ee0VqD46WagSHN6uDEX6bSTJlZbk1M",
  authDomain: "ryokka-359c6.firebaseapp.com",
  projectId: "ryokka-359c6",
  storageBucket: "ryokka-359c6.appspot.com",
  messagingSenderId: "232276598228",
  appId: "1:232276598228:web:4203b933b203caafea4a41",
  measurementId: "G-L4GX0G78MJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {app, analytics, storage, auth};
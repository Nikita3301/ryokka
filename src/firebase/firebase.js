// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBT_wYfT_oGo485BC7WYL0SKyMWpwRgmZs",
  authDomain: "landscape-3301.firebaseapp.com",
  projectId: "landscape-3301",
  storageBucket: "landscape-3301.appspot.com",
  messagingSenderId: "612140298741",
  appId: "1:612140298741:web:15cde165857f99d9b5f0bc",
  measurementId: "G-VGJ2VSFTNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {app, analytics, storage, auth};
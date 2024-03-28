// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARCSI9Mos7D0QwiC1qpcf-yh6XB7cnm-Q",
  authDomain: "poppin-b3b1b.firebaseapp.com",
  projectId: "poppin-b3b1b",
  storageBucket: "poppin-b3b1b.appspot.com",
  messagingSenderId: "768882281",
  appId: "1:768882281:web:ddd10aa97fbe5d91bf94f8",
  measurementId: "G-RYT372K10B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth };
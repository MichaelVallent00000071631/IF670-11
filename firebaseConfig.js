// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0tT6zPxxum1elNWug0j4lJLVItMIS2-8",
  authDomain: "if670-11-michael.firebaseapp.com",
  projectId: "if670-11-michael",
  storageBucket: "if670-11-michael.firebasestorage.app",
  messagingSenderId: "907767442735",
  appId: "1:907767442735:web:b54866831afa6f067705da",
  measurementId: "G-Z3ENVRK86S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
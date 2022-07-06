// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGFKZd5ilieyKVHCzRSam3KMUl4Oj7X6A",
  authDomain: "ratyng-system-nccim.firebaseapp.com",
  projectId: "ratyng-system-nccim",
  storageBucket: "ratyng-system-nccim.appspot.com",
  messagingSenderId: "653458018305",
  appId: "1:653458018305:web:11f162efe7da109f07b000",
  measurementId: "G-FFNQ37GC6P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

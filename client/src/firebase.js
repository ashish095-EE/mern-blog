/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-c1f0c.firebaseapp.com",
  projectId: "mern-blog-c1f0c",
  storageBucket: "mern-blog-c1f0c.appspot.com",
  messagingSenderId: "281982337375",
  appId: "1:281982337375:web:a90f4b8c3bafd3410376ea"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
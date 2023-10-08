// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRf1lXhbXG7P1ComWmSTB5uabNJJYwUmQ",
  authDomain: "vite-contact0.firebaseapp.com",
  projectId: "vite-contact0",
  storageBucket: "vite-contact0.appspot.com",
  messagingSenderId: "912130823784",
  appId: "1:912130823784:web:7ca25404291c8a7530cddd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
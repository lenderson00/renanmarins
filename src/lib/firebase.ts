// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP4388t7rytmcNaa3xDFxdpNPE0PsnEgs",
  authDomain: "renanmarins-c1b81.firebaseapp.com",
  projectId: "renanmarins-c1b81",
  storageBucket: "renanmarins-c1b81.appspot.com",
  messagingSenderId: "1038784538605",
  appId: "1:1038784538605:web:8b62150348e7c7f23529e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app)
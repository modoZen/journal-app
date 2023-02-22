// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhr7hnA7s9WLb3Zl_NaGeZHx5_F45B0FM",
  authDomain: "journalapp-backend-7cbb7.firebaseapp.com",
  projectId: "journalapp-backend-7cbb7",
  storageBucket: "journalapp-backend-7cbb7.appspot.com",
  messagingSenderId: "363191969263",
  appId: "1:363191969263:web:411ff7c52b50f5df56c21a"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
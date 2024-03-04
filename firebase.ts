// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAATy9oG8WendYn8PjHfmMTnESpN_mKBxk",
  authDomain: "myblog-40637.firebaseapp.com",
  projectId: "myblog-40637",
  storageBucket: "myblog-40637.appspot.com",
  messagingSenderId: "717421681141",
  appId: "1:717421681141:web:6435b75aaad1ede20ee8bc",
  measurementId: "G-RSPR8W5WKJ",
  databaseURL: "https://myblog-40637-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

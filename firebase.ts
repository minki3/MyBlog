// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const API_KEY = process.env.NEXT_PUBLIC_REACT_APP_APIKEY;
const AUTH_DOMAIN = process.env.NEXT_PUBLIC_REACT_APP_AUTH_DOMAIN;
const PROJECT_ID = process.env.NEXT_PUBLIC_REACT_APP_PROJECT_ID;
const STORAGE_BUCKET = process.env.NEXT_PUBLIC_REACT_APP_STORAGE_BUCKET;
const MESSAGING_SENDER_ID =
  process.env.NEXT_PUBLIC_REACT_APP_MESSAGING_SENDER_ID;
const APP_ID = process.env.NEXT_PUBLIC_REACT_APP_APP_ID;
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_REACT_APP_MEASUREMENT_ID;
const DATABASE_URL = process.env.NEXT_PUBLIC_REACT_APP_DATABASE_URL;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
  databaseURL: DATABASE_URL,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const cloudDb = getFirestore(app);
export const storage = getStorage(app);

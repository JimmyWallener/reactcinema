// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const {
  VITE_API_KEY,
  VITE_DOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGE,
  VITE_MESSAGING_ID,
  VITE_APP_ID,
  VITE_M_ID,
} = import.meta.env;
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE,
  messagingSenderId: VITE_MESSAGING_ID,
  appId: VITE_APP_ID,
  measurementId: VITE_M_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
const analytics = getAnalytics(app);

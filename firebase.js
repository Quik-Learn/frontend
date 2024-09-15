// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCF-LLkPbUmW0BUgxR7k2EO6EvVRQ3HqBM',
  authDomain: 'quicklearn-ed7c2.firebaseapp.com',
  projectId: 'quicklearn-ed7c2',
  storageBucket: 'quicklearn-ed7c2.appspot.com',
  messagingSenderId: '1045961025017',
  appId: '1:1045961025017:web:4850a26a791e9e3b0c4928',
  measurementId: 'G-QTC41V7GTY',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authProvider = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, signOut } from 'firebase/auth';
//import { getAuth, setPersistence, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: `${process.env.EXPO_PUBLIC_FIREBASEAPIKEY}`,
  authDomain: "myread-e4ff3.firebaseapp.com",
  projectId: "myread-e4ff3",
  storageBucket: "myread-e4ff3.appspot.com",
  messagingSenderId: "531031709887",
  appId: "1:531031709887:web:e8dd4f5e5af0206afece0a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Sign out error:', error.message);
  };
};
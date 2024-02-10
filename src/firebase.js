import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6IEukFCa1uItuzU67gbT4lyPkn_sAA3U",
  authDomain: "practice-5f034.firebaseapp.com",
  projectId: "practice-5f034",
  storageBucket: "practice-5f034.appspot.com",
  messagingSenderId: "1027551580068",
  appId: "1:1027551580068:web:cd4d1c1e0d9c9726653b31"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()

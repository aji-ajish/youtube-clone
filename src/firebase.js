// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgs7tMvBrkb3dDQ59Lc67YxQHGpyd5MYM",
  authDomain: "yt-clone-a8394.firebaseapp.com",
  projectId: "yt-clone-a8394",
  storageBucket: "yt-clone-a8394.appspot.com",
  messagingSenderId: "398110980512",
  appId: "1:398110980512:web:03c697af88fe25a1988cc5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
const timeStamp = serverTimestamp();

export { app, db, auth, provider, timeStamp };

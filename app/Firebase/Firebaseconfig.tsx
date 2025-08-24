"use client"

import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBLCAoAcEwOoC0i7LiOMT5U0IA5yDP1230",
    authDomain: "d-hub-d0a4d.firebaseapp.com",
    projectId: "d-hub-d0a4d",
    storageBucket: "d-hub-d0a4d.firebasestorage.app",
    messagingSenderId: "722472463047",
    appId: "1:722472463047:web:60f425342f2be78b19ece2",
    measurementId: "G-M19RLWFP29"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export function getAuthInstance(app: FirebaseApp) {
    return getAuth(app);
}

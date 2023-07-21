import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD-LFu0p7Td0nhx876CA4YREkNjJ9rswJo",
    authDomain: "intient-videoapp.firebaseapp.com",
    projectId: "intient-videoapp",
    storageBucket: "intient-videoapp.appspot.com",
    messagingSenderId: "775834917993",
    appId: "1:775834917993:web:91bea60c1093cffb8096f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app;
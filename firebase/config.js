import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firebase"; 

const firebaseConfig = {
  apiKey: "AIzaSyDmgkgyY-K-L6y2QQAN572STmNHJVWDlYQ",
  authDomain: "estagitech.firebaseapp.com",
  projectId: "estagitech",
  storageBucket: "estagitech.appspot.com",
  messagingSenderId: "648956985200",
  appId: "1:648956985200:web:a353c0c97b9db1dc3c99b5",
  measurementId: "G-2RQQZEEP2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};
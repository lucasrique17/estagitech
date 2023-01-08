import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";
 
const firebaseConfig = {
  apiKey: "AIzaSyANvGDbtgfmMLD2U4Nd6sD-9v8qe0ibaQM",
  authDomain: "estagitech-8df26.firebaseapp.com",
  projectId: "estagitech-8df26",
  storageBucket: "estagitech-8df26.appspot.com",
  messagingSenderId: "978548429311",
  appId: "1:978548429311:web:b64199bb23c840d1de97ca",
  measurementId: "G-GET5NEPDPJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage};
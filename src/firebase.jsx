import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCMNbkZ8sfkQN_A-x7kLDWRe7BdEdsw_k",
  authDomain: "countdown-board-30383.firebaseapp.com",
  projectId: "countdown-board-30383",
  storageBucket: "countdown-board-30383.appspot.com",
  messagingSenderId: "321902465382",
  appId: "1:321902465382:web:54352c971eec051635f8a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

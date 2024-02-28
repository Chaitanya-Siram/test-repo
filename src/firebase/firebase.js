import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCDop_-m40ElnSaMA9BKz11NODUVe3P71E",
  authDomain: "alphamproject-d510a.firebaseapp.com",
  projectId: "alphamproject-d510a",
  storageBucket: "alphamproject-d510a.appspot.com",
  messagingSenderId: "746227732847",
  appId: "1:746227732847:web:4bf4c2d8b89d5c5b27189a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
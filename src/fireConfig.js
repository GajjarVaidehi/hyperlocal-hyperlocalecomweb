import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxFDJaJp5PBl1SK6dHzUD-GBQOb5jeuEc",
  authDomain: "hyperlocal-f3ce3.firebaseapp.com",
  projectId: "hyperlocal-f3ce3",
  storageBucket: "hyperlocal-f3ce3.appspot.com",
  messagingSenderId: "255782627143",
  appId: "1:255782627143:web:4a84fdee65b82756c1ce62",
  measurementId: "G-XW6W1W001M"
};

const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app)

export default fireDB
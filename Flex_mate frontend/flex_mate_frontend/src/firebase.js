import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBal7679DpIo2bq3FyM_9Tnd8NE-8SNW5Q",
  authDomain: "sigma-boy-3b2dc.firebaseapp.com",
  projectId: "sigma-boy-3b2dc",
  storageBucket: "sigma-boy-3b2dc.appspot.com",
  messagingSenderId: "309301826315",
  appId: "1:309301826315:web:0c18fb60db1482698d480e",
  measurementId: "G-S9HHF0P5YQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider };

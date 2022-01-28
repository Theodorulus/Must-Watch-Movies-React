import "firebase/compat/auth"
import firebase from "firebase/compat/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyC3blxDXIJrE1cd4XYpyolbCa9K9XNKwkY",
  authDomain: "must-watch-movies-6c729.firebaseapp.com",
  projectId: "must-watch-movies-6c729",
  storageBucket: "must-watch-movies-6c729.appspot.com",
  messagingSenderId: "301552211037",
  appId: "1:301552211037:web:4868f126259992c7faa9b4",
  measurementId: "G-NL0XX31EBY"
};

const app = firebase.initializeApp(firebaseConfig);
export const appAuth = app.auth()
export const db = getDatabase(app)

export default app;
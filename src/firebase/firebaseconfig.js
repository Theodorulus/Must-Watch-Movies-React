import "firebase/compat/auth"
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyADu0r_L__EIHsMxbLgE-kXgDIcKziAk2Q",
  authDomain: "react-must-watch.firebaseapp.com",
  projectId: "react-must-watch",
  storageBucket: "react-must-watch.appspot.com",
  messagingSenderId: "611997508917",
  appId: "1:611997508917:web:d7f17ec96b1a7187d9187c"
};

const app = firebase.initializeApp(firebaseConfig);
export const appAuth = app.auth()
export const firestore = app.firestore()

export default app;
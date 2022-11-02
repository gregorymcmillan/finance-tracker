import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCL05gM-Lk0qmi7XVLLbHEc4wPV_YzWhwE",
  authDomain: "finance-tracker-76ae4.firebaseapp.com",
  projectId: "finance-tracker-76ae4",
  storageBucket: "finance-tracker-76ae4.appspot.com",
  messagingSenderId: "564718456299",
  appId: "1:564718456299:web:c6ae4217a8970b35ae5dae",
};

//init firebase
firebase.initializeApp(firebaseConfig);

// init service
const projectFirestore = firebase.firestore();
const auth = firebase.auth();
// auth.onAuthStateChanged(user => {
//   // Check for user status
// });

export { projectFirestore, auth };

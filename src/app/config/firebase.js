import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkvl-cXC7vTSM9f-XLEzPvmfsW1xLKet0",
  authDomain: "revents-bfc19.firebaseapp.com",
  projectId: "revents-bfc19",
  storageBucket: "revents-bfc19.appspot.com",
  messagingSenderId: "597559524465",
  appId: "1:597559524465:web:36dbd9a0e797336ce6efd0",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;

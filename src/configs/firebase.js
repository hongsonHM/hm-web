import firebase from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOw_EkK08FaujxPP5CKKuKUJeuLsoEIgw",
  authDomain: "hm-app-e9f20.firebaseapp.com",
  projectId: "hm-app-e9f20",
  storageBucket: "hm-app-e9f20.appspot.com",
  messagingSenderId: "733685053605",
  appId: "1:733685053605:web:5d8dbc6a68c31389a2b54c",
  measurementId: "G-05M0298V2M"
};

firebase.initializeApp(firebaseConfig)

export default firebase
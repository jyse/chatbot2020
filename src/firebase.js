import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgQpACgYFuv--eqiRA0GDLTi6Sjtlb6jI",
  authDomain: "chatbotgur.firebaseapp.com",
  databaseURL: "https://chatbotgur.firebaseio.com",
  projectId: "chatbotgur",
  storageBucket: "chatbotgur.appspot.com",
  messagingSenderId: "747298048183",
  appId: "1:747298048183:web:bc605d5f7546cd94936532",
  measurementId: "G-5EKWHMC95M",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

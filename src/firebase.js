import firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "eisvmdashboard.firebaseapp.com",
  databaseURL: "https://eisvmdashboard.firebaseio.com",
  projectId: "eisvmdashboard",
  storageBucket: "eisvmdashboard.appspot.com",
  messagingSenderId: "63344224834"
};

firebase.initializeApp(config);

export default firebase;

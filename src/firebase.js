import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDduNIqEeTRlSdIO6z7g60AARZL6X8F43g",
    authDomain: "alla-altayer.firebaseapp.com",
    databaseURL: "https://alla-altayer-default-rtdb.firebaseio.com",
    projectId: "alla-altayer",
    storageBucket: "alla-altayer.appspot.com",
    messagingSenderId: "350833262972",
    appId: "1:350833262972:web:1ffbc90351d268724da4f9",
    measurementId: "G-TPSLNS78EV"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
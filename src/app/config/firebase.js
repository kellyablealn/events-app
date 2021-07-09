import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBfLeC_uK6mcVCxYbv80hM0DEWmW7L1VKw",
    authDomain: "events-app-44ca6.firebaseapp.com",
    projectId: "events-app-44ca6",
    storageBucket: "events-app-44ca6.appspot.com",
    messagingSenderId: "36047510049",
    appId: "1:36047510049:web:82517e0012445140f76160"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;

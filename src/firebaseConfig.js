import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const FirebaseConfig = {
    apiKey: "AIzaSyBCf5_nCpPdQ8OqvcwWcf9LPKn-Fwm0eFc",
    authDomain: "glassco-a65ae.firebaseapp.com",
    projectId: "glassco-a65ae",
    storageBucket: "glassco-a65ae.appspot.com",
    messagingSenderId: "1019406044442",
    appId: "1:1019406044442:web:534fb90c62acaa46d3f0a3",
    measurementId: "G-97VQD1RFM0"
};

const app = initializeApp(FirebaseConfig);
const firestore = getFirestore(app);

export const auth = getAuth(app);

export {app, firestore} ;
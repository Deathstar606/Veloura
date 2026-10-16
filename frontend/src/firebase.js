// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDeBZD3huXjRTsm4cYGN2qlHxz-qqFhQCg",
  authDomain: "veloura-ab34a.firebaseapp.com",
  projectId: "veloura-ab34a",
  storageBucket: "veloura-ab34a.firebasestorage.app",
  messagingSenderId: "545646436419",
  appId: "1:545646436419:web:080465cb5f503760afb4f6",
  measurementId: "G-9LC54Y02DH"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
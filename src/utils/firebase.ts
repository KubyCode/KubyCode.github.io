import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcuu6byd9A32Dx5iOVEUEI25HyyFf-3dU",
  authDomain: "TU_PROJECT.firebaseapp.com",
  projectId: "1:887921915537:web:a7e85a0abd7798e2a4b130",
  storageBucket: "TU_PROJECT.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDMzAHqfo-svL8Z1TNBRK6PxsW6VEK-5os",
  authDomain: "sahill-trial.firebaseapp.com",
  projectId: "sahill-trial",
  storageBucket: "sahill-trial.firebasestorage.app",
  messagingSenderId: "1885629881585",
  appId: "1:1885629881585:web:82c18f4a09425e25508de0",
  measurementId: "G-YBGTESJMHK",
  databaseURL: "https://sahill-trial-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

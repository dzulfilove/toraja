// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIvbcK0Ud5g_W7zNEvD91FTHQvIl-9Li8",
  authDomain: "budaya-toraja.firebaseapp.com",
  projectId: "budaya-toraja",
  storageBucket: "budaya-toraja.firebasestorage.app",
  messagingSenderId: "1085772087456",
  appId: "1:1085772087456:web:ca4d4ae298be36e6e789c5",
  measurementId: "G-PGY1ZQ2BQQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const analytics = getAnalytics(app);
export { storage };

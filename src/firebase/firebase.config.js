// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnPlfgUIzVClWoIiIYh8nIX2Fb9vYBVlU",
  authDomain: "user-email-password-auth-d85c0.firebaseapp.com",
  projectId: "user-email-password-auth-d85c0",
  storageBucket: "user-email-password-auth-d85c0.appspot.com",
  messagingSenderId: "890262671663",
  appId: "1:890262671663:web:b65c763c9391f49c5391da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
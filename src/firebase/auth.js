import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import { auth } from "./config";

// Google provider
const googleProvider = new GoogleAuthProvider();


// 🔐 Signup (Email/Password)
export const signupUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};


// 🔐 Login (Email/Password)
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};


// 🔓 Logout
export const logoutUser = () => {
  return signOut(auth);
};


// 🌐 Google Login
export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};
import { db } from "./config";
import { doc, setDoc, getDoc } from "firebase/firestore";


// 👤 Create user in Firestore (after signup)
export const createUserDocument = async (user, role = "user") => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  const userData = {
    uid: user.uid,
    email: user.email,
    role: role,
    createdAt: new Date()
  };

  await setDoc(userRef, userData);
};


// 📥 Get user data (role check ke liye)
export const getUserDocument = async (uid) => {
  if (!uid) return null;

  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    return snapshot.data();
  } else {
    return null;
  }
};
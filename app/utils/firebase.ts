import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signOut as firebaseSignOut, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw1Ccfr34WB351RmVqf5dP8a_08HTjiyk",
  authDomain: "birthday-app-2bcd2.firebaseapp.com",
  databaseURL: "https://birthday-app-2bcd2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "birthday-app-2bcd2",
  storageBucket: "birthday-app-2bcd2.firebasestorage.app",
  messagingSenderId: "783120276987",
  appId: "1:783120276987:web:8b8eeaff035980e0423f5e",
  measurementId: "G-5247WDS7H5",
};

// Initialize Firebase app
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth and Google Auth Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Sign out function
const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

// Export Firebase utilities
export { app, db, auth, googleProvider, signOut };

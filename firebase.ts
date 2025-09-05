import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
// FIX: Changed import path from 'firebase/storage' to '@firebase/storage' to resolve module export errors, which can occur with certain project dependency setups.
import { getStorage } from "@firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// IMPORTANT: Replace this with your own Firebase project's configuration.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "G-YOUR_MEASUREMENT_ID"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

// Enable offline persistence to improve resilience against network issues.
// This allows the app to work with cached data when offline and syncs
// changes when the connection is restored.
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      // This can happen if multiple tabs are open.
      console.warn('Firestore persistence failed: Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the features required to enable persistence.
      console.warn('Firestore persistence not available in this browser.');
    }
  });


// Conditionally initialize Analytics only if it's supported in the environment.
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

export { db, storage };
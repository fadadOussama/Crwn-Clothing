import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, writeBatch, collection, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// apiKey: "AIzaSyCbf0ock9UqKI7KEF5YjrzBBnKrnroZ--Q",
// authDomain: "crwn-clothing-6b724.firebaseapp.com",
// projectId: "crwn-clothing-6b724",
// storageBucket: "crwn-clothing-6b724.appspot.com",
// messagingSenderId: "75334200361",
// appId: "1:75334200361:web:ad1832148bf38594ec4038",

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Create New Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Access Firebase Auth
export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// Pointer Directly To Firestore Database
export const db = getFirestore();

// Send data to firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collecionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collecionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const categoriesAndDocumentLoader = async () => {
  // Get ref of collection by adding db & name of collection
  const collectionRef = collection(db, "categories");

  // Retrieve multiple documents with one request by querying documents in a collection.
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((resultData, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    resultData[title.toLowerCase()] = items;

    return resultData;
  }, {});

  return categoryMap;
};

categoriesAndDocumentLoader();

export const createUserDocFromAuth = async (userAuth, additionalValues = {}) => {
  // check if we have data
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalValues,
      });
    } catch (error) {
      console.log("error creating user", error);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email && !password) {
    return;
  }

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email && !password) {
    return;
  }

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const handleAuthChange = (callback) => onAuthStateChanged(auth, callback);

import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import {getAuth, signInwithRedirect, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAxd1pN9rp8SnX4xtFt_BDbGLPM9lKslnQ",
    authDomain: "crwn-clothing-db-9ab2f.firebaseapp.com",
    projectId: "crwn-clothing-db-9ab2f",
    storageBucket: "crwn-clothing-db-9ab2f.appspot.com",
    messagingSenderId: "828444196892",
    appId: "1:828444196892:web:30a9b67c3afe0428d15fd9",
    measurementId: "G-7NPH316FW8"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);


  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
});





export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (userAuth, additionalData) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
}
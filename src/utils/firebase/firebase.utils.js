import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import {getAuth, 
        GoogleAuthProvider, 
        signInWithPopup, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        signOut, 
        onAuthStateChanged,
      } from 'firebase/auth';

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


  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
});





export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);


export const db = getFirestore(firebaseApp);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => { 
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);
  

  objectsToAdd.forEach(object => {
    const newDocRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(newDocRef, object);
  });

  await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const {title, items} = docSnapshot.data();
      acc[title.toLowerCase()] =  items;
      return acc;
    }, {}); 
    return categoryMap;
}
    


export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  

  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch(error) {
      console.log('Error creating user', error.message);
    }
  }
return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await createUserWithEmailAndPassword(auth, email, password);
  };

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
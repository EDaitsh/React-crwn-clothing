import { initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
 } from 'firebase/auth'

 import{
      getFirestore,
      doc,
      getDoc,
      setDoc
 } from 'firebase/firestore'

 const firebaseConfig = {
   apiKey: "AIzaSyDe_-yi1d-uzahpBSjPLkDINVgZlLMyvCk",
   authDomain: "crwn-clothing-db-96330.firebaseapp.com",
   projectId: "crwn-clothing-db-96330",
   storageBucket: "crwn-clothing-db-96330.appspot.com",
   messagingSenderId: "660905636411",
   appId: "1:660905636411:web:787a28be3f58855657a21e"
 };
 
 // Initialize Firebase
 const firebaseApp = initializeApp(firebaseConfig);

 const provider = new GoogleAuthProvider();
 provider.setCustomParameters({
    prompt: "select_account"
 });

 export const auth = getAuth();
 export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
 export const signWithGoogleRedirect = () => signInWithRedirect(auth, provider);

 export const db = getFirestore();

 export const createUserDocumentFromAuth = async(
   userAuth,
   additionalInformation = {}
   ) => {
   const userDocRef = doc(db, 'users', userAuth.uid);
   console.log(userDocRef);

   const userSnapshot = await getDoc(userDocRef);
   console.log(userSnapshot);
   console.log(userSnapshot.exists());

   if(!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createAt = new Date();

      try{
         await setDoc(userDocRef, {
            displayName,
            email,
            createAt,
            ...additionalInformation,
         });
      } catch (error){
         console.log('error creating the user', error.message);
      }
   }

   return userDocRef;
 }

 export const createAuthUserWithEmailAndPassword = async(email, password) => {
   if(!email || !password)   return;
   return await createUserWithEmailAndPassword(auth, email,password);
 }
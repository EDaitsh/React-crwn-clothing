import { initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    NextOrObserver,
    User

 } from 'firebase/auth'

 import{
      getFirestore,
      doc,
      getDoc,
      setDoc,
      collection,
      writeBatch,
      query,
      getDocs,
      QueryDocumentSnapshot
 } from 'firebase/firestore'

import { Category } from '../../store/categories/category.types'; 

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

export type ObjectToAdd = {
   title: string
}

 export const addCollectionAndDocuments = async<T extends ObjectToAdd>(
      collectionKey: string, 
      objectsToAdd: T[]
   ): Promise<void> => {
   const collectionRef = collection(db, collectionKey);
   const batch = writeBatch(db);

   objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
   });

   await batch.commit();
   //console.log("Done");
 };

 export const getCategoriesAndDocuments= async(): Promise<Category[]> => {
   const collectionRef = collection(db, 'categories');
   const q = query(collectionRef);

   const querySnapshot = await getDocs(q);
   return querySnapshot.docs.map(
      docSnapshot => docSnapshot.data() as Category
   );
   
 }

 export type AdditionalInformation = {
   displayName?: string;
 }

 export type UserData = {
   createAt: Date;
   displayName: string;
   email: string;
 }

 export const createUserDocumentFromAuth = async(
   userAuth: User,
   additionalInformation = {} as AdditionalInformation
   ): Promise<void | QueryDocumentSnapshot<UserData>> => {

   if(!userAuth) return;
   const userDocRef = doc(db, 'users', userAuth.uid);
   //console.log(userDocRef);

   const userSnapshot = await getDoc(userDocRef);
   //console.log(userSnapshot);
   //console.log(userSnapshot.exists());

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
         //console.log('error creating the user', error.message);
      }
   }

   return userSnapshot as QueryDocumentSnapshot<UserData>;
 }

 export const createAuthUserWithEmailAndPassword = async(email: string, password: string) => {
   if(!email || !password)   return;
   return await createUserWithEmailAndPassword(auth, email,password);
 }

 export const signInAuthUserWithEmailAndPassword = async(email: string, password: string) => {
   if(!email || !password)   return;
   return await signInWithEmailAndPassword(auth, email,password);
 }


export const signOutUser = async() =>  await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => 
   onAuthStateChanged(auth, callback);

export const getCurrentUser =(): Promise<User | null> => {
   return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
         auth,
         (userAuth) => {
            unsubscribe();
            resolve(userAuth);
         },
         reject
      )
   })
}
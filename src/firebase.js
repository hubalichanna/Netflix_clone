import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCAWZlqwi9dNKVDFUE33B4wGVtDNT1V_tg",
  authDomain: "netflix-clone-75bac.firebaseapp.com",
  projectId: "netflix-clone-75bac",
  storageBucket: "netflix-clone-75bac.firebasestorage.app",
  messagingSenderId: "293086925193",
  appId: "1:293086925193:web:32afa5f852cbc55d0c1158"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db, "user"),{
        uid: user.uid,
        name,
        authProvider: "local",
        email,

       });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}


const login = async(email, password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth,db, login, signup, logout};
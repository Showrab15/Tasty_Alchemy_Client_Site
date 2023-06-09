import React, { createContext, useEffect, useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';


export const AuthContext = createContext(null)
const auth = getAuth(app);

// google
const googleProvider = new GoogleAuthProvider();

const gitHubProvider = new GithubAuthProvider()




const AuthProvider = ( {children}) => {

    const [user , setUser] = useState(null);
const [loading, setLoading] = useState(true)

const createUser = (email,password)=>{
    setLoading(true)
 return createUserWithEmailAndPassword(auth,email,password)
}

const signIn = (email, password)=>{
    setLoading(true)
   return signInWithEmailAndPassword(auth, email, password)
}

const signInWithGoogle =()=>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider)

}

const signInWithGithub = () =>{
    setLoading(true)
   return signInWithPopup(auth, gitHubProvider)
  
}

const userUpdateProfile =(user, name, photo)=>{
        setLoading(true)

   return updateProfile(user,{
        displayName: name,
        photoURL : photo
    })
}

const logOut = ()=>{
    setLoading(true)
 return signOut(auth);
}



useEffect(()=>{
  const unsubscribe =   onAuthStateChanged(auth, loggedUser =>{
        setUser(loggedUser);
        setLoading(false)
    })

    return ()=>{
        unsubscribe();
    }

}, [])

    const authInformation ={
        user,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        loading,
        signInWithGithub,
        userUpdateProfile


    }
    return (
        <AuthContext.Provider value={authInformation}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
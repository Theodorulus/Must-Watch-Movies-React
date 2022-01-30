import React, { useContext, useState, useEffect } from 'react';
import { appAuth } from '../firebase/firebaseconfig'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function register(email, password) {
        return appAuth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return appAuth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return appAuth.signOut()
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = appAuth.onAuthStateChanged(user => {
            setLoading(false)
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])
    

    const value = {
        currentUser, 
        register,
        login,
        logout,
        updateEmail,
        updatePassword
    }
  
    return (
      <AuthContext.Provider value={value}>
          {!loading && children}
      </AuthContext.Provider>
  );
};

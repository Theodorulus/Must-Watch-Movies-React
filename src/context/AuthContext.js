import React, { useContext, useState, useEffect } from 'react';
import { appAuth } from '../firebase/firebaseconfig'
// import { useLocation } from 'react-router-dom'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    // const { pathname } = useLocation()

    function register(email, password) {
        return appAuth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return appAuth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return appAuth.signOut()
    }

    useEffect(() => {
        const unsubscribe = appAuth.onAuthStateChanged(user => {
            setLoading(false)
            setCurrentUser(user)
        })

        return unsubscribe
    }, []) //[pathname])
    

    const value = {
        currentUser, 
        register,
        login,
        logout
    }
  
    return (
      <AuthContext.Provider value={value}>
          {!loading && children}
      </AuthContext.Provider>
  );
};

import './App.css';
import React from 'react';
import { Register } from "./components/auth/Register"
import { Login } from "./components/auth/Login"
import { Profile } from "./components/auth/Profile"
import { UpdateProfile } from "./components/auth/UpdateProfile"
import { Header } from "./components/Header"
import { AuthProvider, useAuth } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { Watchlist } from "./components/movies/Watchlist"
import { Watched } from "./components/movies/Watched"

function App() {

  function PrivateRoute({children}) {
    const {currentUser} = useAuth()
    console.log(currentUser)
    return currentUser? children : <Navigate to="/login"/>
  }
  
  return (
    <>
    <AuthProvider>
      <Router>
          <Header />
          <Routes>
            <Route path="/" element={
              <PrivateRoute><Watchlist/></PrivateRoute>
            }/>

            <Route path="/watched" element={
              <PrivateRoute><Watched/></PrivateRoute>
            }/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={
              <PrivateRoute><Profile/></PrivateRoute>
            }/>
            <Route path="/update-profile" element={
              <PrivateRoute><UpdateProfile/></PrivateRoute>
            }/>
          </Routes>
      </Router>
    </AuthProvider>
      
    </>
  );
}

export default App;

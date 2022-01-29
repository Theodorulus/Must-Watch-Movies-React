import './App.css';
import React,  { useRef, useState } from 'react';
import { Register } from "./components/auth/Register"
import { Login } from "./components/auth/Login"
import { Logout } from "./components/auth/Logout"
import { Header } from "./components/Header"
import { AuthProvider, useAuth } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import { Watchlist } from "./components/movies/Watchlist"
import { Watched } from "./components/movies/Watched"
import { Button } from 'react-bootstrap'

function App() {

  function PrivateComponent({children}) {
    const {currentUser} = useAuth()
    return currentUser? children : null
  }

  function PrivateRoute({children}) {
    const {currentUser} = useAuth()
    return currentUser? children : <Navigate to="/login"/>
  }

  function PublicComponent({children}) {
    const {currentUser} = useAuth()
    return !currentUser? children : <Navigate to="/"/>
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

            {/* <Route path="/watched" element={
              <PrivateRoute><Watched/></PrivateRoute>
            }/> */}
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
          {/* <PrivateComponent><Logout/></PrivateComponent> */}
      </Router>
    </AuthProvider>
      
    </>
  );
}

export default App;

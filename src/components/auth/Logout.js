import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

export const Logout = () => {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
  
    async function handleLogout() {
        setError('')
        try {
              await logout()
              navigate('/login')
        } catch {
            setError('Failed to log out')
        }
    }
    
    return (
    <>
        <div className='text-center text-light mt-2 '>
            <Link to="/profile" className="text-decoration-none text-light">{currentUser.email}</Link>
            <Button variant="link" onClick={handleLogout} className="btn btn-secondary text-decoration-none text-light"> Logout </Button>
        </div>
        
    </>
    );
};

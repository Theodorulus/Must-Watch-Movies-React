import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logout } from './auth/Logout'

export const Header = () => {

    function PrivateComponent({children}) {
        const {currentUser} = useAuth()
        console.log(currentUser)
        return currentUser? children : null
    }

    return (
        <header>
            <PrivateComponent>
                <div className="container">
                    <div className="inner-content">
                        <div className="brand">
                            <Link to="/">Watchlist</Link>
                        </div>
                        <ul className="nav-links">
                            <li>
                                <Link to="/">Watchlist</Link>
                            </li>
                            <li>
                                <Link to="/watched">Watched</Link>
                            </li>
                            <li>
                                <Logout/>
                            </li>
                        </ul>
                    </div>
                </div>
            </PrivateComponent>
        </header>
    );
};

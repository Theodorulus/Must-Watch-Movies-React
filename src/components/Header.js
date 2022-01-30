import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logout } from './auth/Logout'

export const Header = () => {

    function PrivateComponent({children}) {
        const {currentUser} = useAuth()
        return currentUser? children : null
    }

    return (
        <header>
            <PrivateComponent>
                {/* <div className="container">
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
                </div> */}
                <nav className='navbar navbar-expand-sm navbar-dark bg-dark px-5'>
                    <div className="brand">
                        <Link to="/">Watchlist</Link>
                    </div>
                    <button
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        class="navbar-toggler"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className='navbar-toggler-icon'/>
                    </button>
                    <div className='collapse navbar-collapse ' id="navbarNav">
                        <ul className="navbar-nav ms-auto ">
                            <li className='nav-item active'>
                                <Link to="/" className="nav-link active">Watchlist</Link>
                            </li>
                            <li className='nav-item active'>
                                <Link to="/watched" className="nav-link active">Watched</Link>
                            </li>
                            <li className='nav-item active'>
                                <Logout/>
                            </li>
                        </ul>
                    </div>
                </nav>

            </PrivateComponent>
        </header>
    );
};

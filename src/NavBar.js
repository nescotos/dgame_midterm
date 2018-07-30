import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar is-dark is-fixed-top">
                <div id="navbarExampleTransparentExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link to="/" className="navbar-item">Home</Link>
                        <Link to="/registration" className="navbar-item">Registration</Link>
                        <Link to="/top" className="navbar-item">Top 10</Link>
                        <Link to="/about" className="navbar-item">About</Link>
                    </div>
                </div>
            </nav>
        )
    }
} 

export default NavBar;
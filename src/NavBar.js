import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar is-dark is-fixed-top">
                <div id="navbarExampleTransparentExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a to="/" className="navbar-item">Home</a>
                        <a to="/contract" className="navbar-item">Top 10</a>
                        <a to="/" className="navbar-item">About</a>
                    </div>
                </div>
            </nav>
        )
    }
} 

export default NavBar;
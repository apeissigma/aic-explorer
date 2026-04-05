import React from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import '../css/Navbar.css'

function Navbar() {
    return (
        <nav>
            <button>
                <NavLink to="/" className="nav-link"> Home </NavLink>
            </button>
            <button>
                <NavLink to="/Favorites" className="nav-link"> Favorites </NavLink>
            </button>
        </nav>
    )
}

export default Navbar; 
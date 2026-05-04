import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import "../css/Navbar.css"

function Navbar() {
    return (
        <nav>
            <NavLink to="/" className="nav-logo"><img src="/img/logo.png" alt="Art Intitute of Chicago logo" height="56" width="56"></img></NavLink>
            <NavLink to="/Favorites" className="nav-btn">Favorites</NavLink>
        </nav>
    );
}

export default Navbar;
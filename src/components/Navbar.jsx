import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import "../css/Navbar.css"

function Navbar() {
    return (
        <nav>
            <button><NavLink to="/" >Home</NavLink></button>
            <button><NavLink to="/Favorites" >Favorites</NavLink></button>
        </nav>
    );
}

export default Navbar;
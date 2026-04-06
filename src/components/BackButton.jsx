import { useNavigation } from "react-router";
import { NavLink, Route, Routes } from "react-router-dom";

function BackButton() {
    return (
        <>
        {/* todo: implement back button */}
        <button><NavLink to="/" >&#8592; Back</NavLink></button>
        </>
    )
}

export default BackButton; 
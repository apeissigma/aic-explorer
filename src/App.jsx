import "./css/App.css";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Artwork from "./pages/Artwork";
import Navbar from "./components/Navbar";
import { FavoriteProvider } from "./contexts/FavoriteContext";
import { Routes, Route } from "react-router-dom";

function App() {  
  return (
    <FavoriteProvider>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/artwork/:id" element={<Artwork />} /> 
        </Routes>
    </FavoriteProvider>
  );
}

export default App
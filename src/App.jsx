import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
//import { AppProvider } from "./contexts/AppContext";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

//import { getArtworks, searchArtworks } from "./services/api";


function App() {  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
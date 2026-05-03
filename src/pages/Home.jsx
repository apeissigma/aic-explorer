import '../css/App.css'
import '../css/SearchBar.css'
import ArtCard from '../components/ArtCard.jsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getArtworks, searchArtworks, getPopularArtworks } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  //load popular art with getPopularArtworks on page load
  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const artworks = await getPopularArtworks();
        setArtworks(artworks);
      } catch (err) {
        console.log(err);
        setError(`${err}: Failed to load...`);
      } finally {
        setLoading(false);
      }
    };
    loadArtworks();
  }, []);

  //handle search submit, navigate to /search/query (Search.jsx)
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; //don't search empty queries
    navigate(`/search/${encodeURIComponent(searchQuery.trim())}`); 
  };

  return (
    <>
      <div className="search-bar">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>

      <main>
        <div className="hero">
          <h1>Explore the Art Institute of Chicago's Collection</h1>
        </div>
        
        
        {error && <div className="error-message">{error}</div>}

        <div className="popular-works">
          <h2>Selected Works</h2>
          {loading ? (
          <div className="loading">Loading...</div>
          ) : (
          <div className="artwork-grid">
            {artworks.map((artwork) => (
                <ArtCard key={artwork.id} artwork={artwork} />
              ))}
          </div>
          )}
        </div>
        
      </main>
    </>
  )
}

export default Home; 
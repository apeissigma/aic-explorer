import '../css/App.css'
import '../css/SearchBar.css'
import ArtCard from '../components/ArtCard.jsx'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { searchArtworks } from "../services/api";

function Search() {
  const { query } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return; //if no query exists, return early
    //load results for query
    const loadResults = async () => {
      setLoading(true);
      try {
        const results = await searchArtworks(query);
        setArtworks(results);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadResults();
  }, [query]); //rerun when url query changes

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; //don't search empty queries
    navigate(`/search/${encodeURIComponent(searchQuery)}`); //navigate to new url, triggers useEffect to load results
  };

  return (
    <>
      <div className="search-bar">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search by title, artist, or keyword"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>

      <main>
        <div className="hero">
          <h1>Results for "{query}"</h1>
        </div>
        
        {error && <div className="error-message">{error}</div>}

        {loading ? (
            <div className="loading">Loading...</div>
        ) : (
            <div className="artwork-grid">
                {artworks.map((artwork) => (
                    <ArtCard key={artwork.id} artwork={artwork} />
                ))}
            </div>
        )}
      </main>
    </>
  )
}

export default Search; 
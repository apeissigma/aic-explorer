import '../css/App.css'
import ArtCard from '../components/ArtCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { searchArtworks } from "../services/api";

function Search() {
  const { query } = useParams();
  const navigate = useNavigate();
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

  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <h3>Collections search</h3>
          <h1 className="hero-text">Results for "{query}"</h1>
          <SearchBar />
        </div>
      </div>
      
      <main>
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
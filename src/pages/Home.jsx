import '../css/App.css'
import '../css/Home.css'
import ArtCard from '../components/ArtCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getArtworks, searchArtworks, getPopularArtworks, getId, getDailyWork } from "../services/api";

function Home() {
  const navigate = useNavigate();
  
  //load popular art with getPopularArtworks on page load
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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

  //load daily work with getDailyWork
  const [dailyWork, setDailyWork] = useState(null);
  const [dailyError, setDailyError] = useState(null);
  const [dailyLoading, setDailyLoading] = useState(true);
  useEffect(() => {
    const loadDailyWork = async () => {
      try {
        const artwork = await getDailyWork();
        setDailyWork(artwork);
      } catch (err) {
        console.log(err);
        setDailyError(`${err}: Failed to load...`);
      } finally {
        setDailyLoading(false);
      }
    };
    loadDailyWork();
  }, []);

  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-text">AIC Explorer</h1>
          <p>Explore thousands of artworks in the museum's collection, from Ancient Greek sculptures to French Impressionist paintings, and more from around the world.</p>
          <SearchBar />
        </div>
      </div>

      <main>
        {error && <div className="error-message">{error}</div>}

        <section className="daily-work">
          <h2>Daily Work</h2>
          {dailyError && <div className="error-message">{dailyError}</div>}
          {dailyLoading ? (
            <div className="loading">Loading...</div>
          ) : dailyWork ? (
            dailyWork && <ArtCard artwork={dailyWork} className="large"/>
          ) : (
            <div className="error-message">No daily work available.</div>
          )}
        </section>

        <section className="popular-works">
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
        </section>
        
      </main>
    </>
  )
}

export default Home; 
import './css/App.css'
import './css/ArtCard.css'
import { useEffect, useState } from 'react'
//import ArtCard from './components/ArtCard'
import { getArtworksArray } from "./services/api";




function ArtCard({artwork}) {
  const img_id = artwork.image_id;
  const img_url = img_id 
    ? `https://www.artic.edu/iiif/2/${img_id}/full/843,/0/default.jpg`
    : 'https://via.placeholder.com/200x200?text=No+Image';

  return (
    <div className="art-card" data-title={artwork.title}>
      <div className="art-img">
        <img src={img_url} alt={artwork.title || 'Artwork'} />
      </div>
    </div>
  )
}

function Main() {
    const [artworks, setArtworks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadArtworks = async () => {
        try {
          const artworks = await getArtworksArray();
          setArtworks(artworks);
        } catch (err) {
          console.log(err);
          setError("Failed to load art...");
        } finally {
          setLoading(false);
        }
      };

      loadArtworks();
    }, []);

  return (
    <main>
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        artworks && artworks.length > 0 ? (
          console.log(artworks),
          artworks.map((artwork) => (
            <ArtCard key={artwork.id} artwork={artwork} />
          ))
        ) : (
          <div>No artworks found</div>
        )
      )}
    </main>
  )
}

function App() {
  return (
    <>
      <Main />
    </>
  )
}

export default App

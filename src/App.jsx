import './css/App.css'
import './css/ArtCard.css'
import { useEffect, useState } from 'react'
//import ArtCard from './components/ArtCard'
import { getArtworks } from "./services/api";




function ArtCard({artwork}) {
  const img_id = artwork.image_id;
  const img_url = img_id 
    ? `https://www.artic.edu/iiif/2/${img_id}/full/843,/0/default.jpg`
    : 'https://via.placeholder.com/200x200?text=No+Image';

  return (
    <div className="art-card">
      <div className="art-img">
      <img src={img_url} alt={artwork.title}/>
      </div>
      <div className="art-info">
          <p>{artwork.id}</p>
          <p>{artwork.title}</p>
          <p>Artist: {artwork.artist_title}</p>
          <p>Date: {artwork.date_start===artwork.date_end ? `${artwork.date_start}` : `${artwork.date_start}-${artwork.date_end}`}</p>
          <p>Color: {artwork.color ? `HSL(${artwork.color.h}%, ${artwork.color.l}%, ${artwork.color.s}%)` : 'No color data'}</p>
          <p>Medium: {artwork.medium_display}</p>
          <p>Style: {artwork.style_title ? `${artwork.style_title}` : 'No style data'}</p>
          <p>{artwork.is_on_view ? 'On view' : 'Currently off view'}</p>
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
          const artworks = await getArtworks();
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

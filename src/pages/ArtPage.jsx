import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getId } from "../services/api";
import '../css/ArtPage.css'


function ArtPage() {
    const { id } = useParams(); 
    const [artwork, setArtwork] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const loadArtwork = async () => {
        try {
          const artwork = await getId(id);
          setArtwork(artwork);
        } catch (err) {
          console.log(err);
          setError(`${err}: Failed to load...`);
        } finally {
          setLoading(false);
        }
      };
      loadArtwork();
    }, []);

    const img_id = artwork.image_id;
    const img_url = img_id 
    ? `https://www.artic.edu/iiif/2/${img_id}/full/843,/0/default.jpg`
    : 'https://via.placeholder.com/200x200?text=No+Image';

  return (
    <div className="artpage">
      <div className="art-img">
        <img src={img_url} alt={artwork.title}/>
      </div>
      <div className="art-info">
          <p>{artwork.id}</p>
          <h1>{artwork.title}</h1>
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

export default ArtPage;
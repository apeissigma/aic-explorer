import '../css/Artwork.css'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getId } from "../services/api.js";

function Artwork() {
    const navigate = useNavigate();
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
    // !!! todo: add actual no-img image
    const img_url = img_id 
    ? `https://www.artic.edu/iiif/2/${img_id}/full/843,/0/default.jpg`
    : 'https://ideaweb.com.tw/storage/2023/12/%E4%B8%8B%E8%BC%89.webp';

    var bgColor = artwork.color ? `HSL(${artwork.color.h}, ${artwork.color.l}%, ${artwork.color.s}%)` : '#d7d7d7';

  return (
    <main className="artpage">
      <button onClick={() => navigate(-1)}>&#8592; Back</button>
      <div className="content">
        <div className="art-img">
          <img src={img_url} alt={artwork.title}/>
          <div className="color-block" style={{ backgroundColor: bgColor }}></div>
        </div>
        <div className="art-info">
            <p>{id}</p>
            <h1>{artwork.title}</h1>
            <p>Artist: {artwork.artist_title}</p>
            <p>Date: {artwork.date_start===artwork.date_end ? `${artwork.date_start}` : `${artwork.date_start}-${artwork.date_end}`}</p>
            <p>Medium: {artwork.medium_display}</p>
            <p>Style: {artwork.style_title ? `${artwork.style_title}` : 'No style data'}</p>
            <p>{artwork.is_on_view ? 'On view' : 'Currently off view'}</p>
            {artwork.description ? artwork.description : 'No description data'}
        </div>
      </div>
    </main>
  )
}

export default Artwork;
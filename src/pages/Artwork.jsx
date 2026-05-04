import "../css/App.css"
import '../css/Artwork.css'
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
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

      <button onClick={() => navigate(-1)} className="nav-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="40" height="40" fill="none"/><line x1="216" y1="128" x2="40" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="112 56 40 128 112 200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
        Back
      </button>

      <div className="content">

        <div className="art-img">
          <img src={img_url} alt={artwork.title}/>
        </div>

        <div className="art-info">
            <div className="main-info">
              <h1>{artwork.title}</h1>
              <Link to={artwork.artist_title ? `/artist/${artwork.artist_id}` : "#"}>
                <p><a>{artwork.artist_display ? artwork.artist_display : "n/a"}</a></p>
              </Link>
              <p>{artwork.date_start===artwork.date_end ? `${artwork.date_start}` : `${artwork.date_start}–${artwork.date_end}`}</p>
            </div>
            
            <div className="art-description" >
              <h2>Artwork Description</h2>
              <div dangerouslySetInnerHTML={{ __html: artwork.description }} />
            </div>
            

            <div className="art-data">
              <h2>Artwork Details</h2>
              <p><strong>Id  </strong>{id}</p>
              <p><strong>Title  </strong>{artwork.title}</p>
              <Link to={artwork.artist_title ? `/artist/${artwork.artist_id}` : "#"}>
                <p><strong>Artist  </strong><a>{artwork.artist_title ? artwork.artist_title : "n/a"}</a></p>
              </Link>
              <p><strong>Date  </strong> {artwork.date_start===artwork.date_end ? `${artwork.date_start}` : `${artwork.date_start}-${artwork.date_end}`}</p>
              <p><strong>Place of Creatoin  </strong>{artwork.place_of_origin}</p>
              <p><strong>Style  </strong> {artwork.style_title ? `${artwork.style_title}` : 'n/a'}</p>
              <p><strong>Medium  </strong>{artwork.medium_display}</p>
              <p><strong>Dimensions  </strong>{artwork.dimensions}</p>
              <p><strong>Department  </strong>{artwork.department_title}</p>
              <p>{artwork.is_on_view ? 'On view' : 'Currently off view'}</p>
            </div>

        </div>

      </div>

    </main>
  )
}

export default Artwork;

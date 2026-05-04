import "../css/App.css"
import '../css/Artist.css'
import ArtCard from "../components/ArtCard.jsx"
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getArtist, getArtworkByArtist } from "../services/api.js";

function Artist() {
    const navigate = useNavigate();
    const { artist_id } = useParams(); 

    const [artist, setArtist] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadArtist = async () => {
        try {
            const artist = await getArtist(artist_id);
            setArtist(artist);
        } catch (err) {
            console.log(err);
            setError(`${err}: Failed to load...`);
        } finally {
            setLoading(false);
        }
        };
        loadArtist();
    }, []);

    const [artistWork, setArtistWork] = useState(null);
    const [artistWorkError, setArtistWorkError] = useState(null);
    const [artistWorkLoading, setArtistWorkLoading] = useState(true);
    useEffect(() => {
        const loadArtistWork = async () => {
        try {
            const artwork = await getArtworkByArtist(artist_id);
            setArtistWork(artwork);
        } catch (err) {
            console.log(err);
            setArtistWorkError(`${err}: Failed to load...`);
        } finally {
            setArtistWorkLoading(false);
        }
        };
        loadArtistWork();
    }, []);

    /*
    const img_id = artist.image_id;
    // !!! todo: add actual no-img image
    const img_url = img_id 
    ? `https://www.artic.edu/iiif/2/${img_id}/full/843,/0/default.jpg`
    : 'https://ideaweb.com.tw/storage/2023/12/%E4%B8%8B%E8%BC%89.webp';
    */

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!artist) return null;

    return (
    <main className="artist-page">
        
        <button onClick={() => navigate(-1)} className="nav-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="40" height="40" fill="none"/><line x1="216" y1="128" x2="40" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="112 56 40 128 112 200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
            Back
        </button>

        <div className="content">
            <div className="artist-info">
                <div className="main-artist-info">
                    <h1>{artist.title}</h1>
                    <p>{artist.birth_date} - {artist.death_date}</p>
                </div>

                <div className="artist-description">
                    <div dangerouslySetInnerHTML={{ __html: artist.description }} />
                </div>
            </div>
        </div>

        <div className="artist-work">
            <h2>Artworks by {artist.title}</h2>
            {artistWorkError && <div className="error-message">{artistWorkError}</div>}
            {artistWorkLoading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="artwork-grid">
                    {artistWork.map((work) => (
                        <ArtCard key={work.id} artwork={work} />
                    ))}
                </div>
            )}
        </div>
    </main>

    
)}

export default Artist;

/*
<main className="artpage">

      <button onClick={() => navigate(-1)}>&#8592; Back</button>

      <div className="content">

        <div className="art-img">
          <img src={img_url} alt={artwork.title}/>
          <div className="color-block" style={{ backgroundColor: bgColor }}></div>
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
*/
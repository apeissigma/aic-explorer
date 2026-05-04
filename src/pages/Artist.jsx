import "../css/App.css"
import '../css/Artwork.css'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getArtist } from "../services/api.js";

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
    <main>
        <button onClick={() => navigate(-1)}>&#8592; Back</button>
        <div className="content">
            <div className="artist-info">
                <p>{artist.id}</p>
                <h2>{artist.title}</h2>
                <p>{artist.birth_date} - {artist.death_date}</p>
                <p>{artist.description}</p>
            </div>
        </div>
    </main>
)}

export default Artist;
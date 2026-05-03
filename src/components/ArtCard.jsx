import "../css/ArtCard.css"
import { Link } from "react-router-dom";
import { useFavoriteContext } from "../contexts/FavoriteContext";

function ArtCard({artwork}) {
  const {isFavorite, addToFavorites, removeFromFavorites} = useFavoriteContext();
  const favorite = isFavorite(artwork.id); //favorite status

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(artwork.id);
    } else {
      addToFavorites(artwork);
    } 
  }

  const id = artwork.id; 
  const img_id = artwork.image_id;
  // !!! todo: add actual no-img image
  const img_url = img_id 
    ? `https://www.artic.edu/iiif/2/${img_id}/full/843,/0/default.jpg`
    : 'https://ideaweb.com.tw/storage/2023/12/%E4%B8%8B%E8%BC%89.webp';


  var bgColor = artwork.color ? `HSL(${artwork.color.h}, ${artwork.color.l}%, ${artwork.color.s}%)` : '#d7d7d7';

  return (
    <div className="art-card">
      <Link to={`Artwork/${id}`}>

          <div className="card-img" style={{ backgroundColor: bgColor }}>
            <img src={img_url} alt={artwork.title}/>
            <button onClick={onFavoriteClick}
                    className={`favorite-btn ${favorite ? "active" : "inactive"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none"/>
                <path fill="currentColor" 
                      d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"/>
              </svg>
            </button>
          </div>

          <div className="card-info">
              <h2>{artwork.title}</h2>
              <p>Artist: {artwork.artist_title ? artwork.artist_title : "n/a"}</p>
              <p>Date: {artwork.date_start===artwork.date_end ? `${artwork.date_start}` : `${artwork.date_start}-${artwork.date_end}`}</p>
              <div className="status">
                <span className={`view-status ${artwork.is_on_view ? "true" : "false"}`}>● </span>
                {artwork.is_on_view ? 'On view' : 'Currently off view'}
              </div>
          </div>

        </Link>

      </div>
      
    )
}
export default ArtCard
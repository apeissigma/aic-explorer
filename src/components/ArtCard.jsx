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
          <div className="card-img">
            <img src={img_url} alt={artwork.title}/>
          </div>
          <div className="card-info">
              <p>{id}</p>
              <div className="color-block" style={{ backgroundColor: bgColor }}></div>
          
              <h2>{artwork.title}</h2>
              <p>{artwork.artist_title ? artwork.artist_title : "n/a"}</p>
              <p>{artwork.date_start===artwork.date_end ? `${artwork.date_start}` : `${artwork.date_start}-${artwork.date_end}`}</p>
              <span className="status">
                <p>
                  <span className={`view-status ${artwork.is_on_view ? "true" : "false"}`}>&#8226; </span>
                  {artwork.is_on_view ? 'On view' : 'Currently off view'}
                </p> 
              </span>

          </div>
          <button><Link to={`ArtPage/${id}`}>View Work</Link></button>
          <button className={`favorite-btn ${favorite ? "active" : "inactive"}`} onClick={onFavoriteClick}>&#9829;</button>
      </div>
      
    )
}
export default ArtCard
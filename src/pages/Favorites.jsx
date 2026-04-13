import '../css/App.css'
import { useFavoriteContext } from "../contexts/FavoriteContext";
import ArtCard from "../components/ArtCard"


function Favorites() {
  const {favorites} = useFavoriteContext();

  if (favorites) {
    return (
      <main>
        <h1>Favorites</h1>
        <div className="artwork-grid">
          {favorites.map((artwork) => (
            <ArtCard artwork={artwork} key={artwork.id} />
          ))}
        </div>
      </main>
      
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorites</h2>
    </div>
  );
}

export default Favorites; 
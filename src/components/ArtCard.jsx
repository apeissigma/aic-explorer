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
export default ArtCard


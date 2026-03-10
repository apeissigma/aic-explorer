function ArtCard({artwork}) {
  const img_id = artwork.image_id;
  const img_url = `https://www.artic.edu/iiif/2/${img_id}/full/843,/0/default.jpg`;

  return (
    <div className="art-card">
      <div className="art-img">
      <img src={img_url} alt={artwork.title} width="200"/>
      </div>
      <div className="art-info">
          <p>{artwork.id}</p>
          <p>{artwork.title}</p>
          <p>{artwork.artist_title}</p>
          <p>{`${artwork.date_start}-${artwork.date_end}`}</p>
            <p>Color: {artwork.color ? `HSL(${artwork.color.h}, ${artwork.color.l}%, ${artwork.color.s}%)` : 'No color data'}</p>
            <p>{artwork.medium_display}</p>
            <p>{artwork.style_title}</p>
            <p>{`Is on view: ${artwork.is_on_view}`}</p>
      </div>
    </div>
    )
}
export default ArtCard
const BASE_URL = "https://api.artic.edu/api/v1/artworks";
const QUERY = "1960-01-01..1970-12-31"; //example query for artworks created between 1960 and 1970
const LIMIT = 100; 
const FIELDS = [
    "id",
    "image_id",
    "title",
    "artist_title",
    "date_start",
    "date_end",
    "medium_display",
    "color",
    "style_title",
    "is_on_view",
];
const FIELDSTRING = FIELDS.join(",");

//base_url + ?fields= + fieldsstring + /search?q= + query + &limit= + limit

export const getArtworks = async () => {
    try {
        const response = await fetch(`${BASE_URL}/129884`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.data); 
        return [data.data]; //wraps in an array
    } catch (err) {
        console.error("Error fetching artwork:", err);
        throw err;
    }
    
}

export const getArtworksArray = async () => {
    const url = `${BASE_URL}?fields=${FIELDSTRING}/search?q=${QUERY}&limit=${LIMIT}`
    const response = await fetch(url);
    const data = await response.json();
    return data.data; //collection endpoint returns an array of artworks in the "data" property
}

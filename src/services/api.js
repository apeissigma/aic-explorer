const BASE_URL = "https://api.artic.edu/api/v1/artworks";
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

export const getArtworks = async () => {
    const url = `${BASE_URL}?page=1&fields=${FIELDSTRING}&limit=${LIMIT}`
    console.log(url);
    try {
        const response = await fetch(url); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data; 

    } catch (err) {
        console.error("Error fetching artwork:", err);
        throw err;
    }
}

export const searchArtworks = async (query) => {
    const searchUrl = `${BASE_URL}/search/?q=${query}&fields=${FIELDSTRING}&limit=${LIMIT}`
    try {
        const response = await fetch(searchUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (err) {
        console.error("Error fetching artwork:", err);
        throw err;
    }
}

//base_url + '?fields=' + fieldsstring + '/search?q=';' + query + '&limit=' + limit
//`${BASE_URL}?fields=${FIELDSTRING}/search?q=${QUERY}&limit=${LIMIT}`

/*
export const getArtworksArray = async () => {
    const url = `${BASE_URL}?fields=${FIELDSTRING}&limit=${LIMIT}`
    const response = await fetch(url);
    const data = await response.json();
    return data.data; //collection endpoint returns an array of artworks in the "data" property
}
*/
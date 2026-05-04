const BASE_URL = "https://api.artic.edu/api/v1/artworks";
const LIMIT = 100; 
const FIELDS = [
    "id",
    "image_id",
    "title",
    "artist_id",
    "artist_title",
    "artist_display",
    "date_start",
    "date_end",
    "medium_display",
    "description",
    "color",
    "style_title",
    "is_on_view",
    "is_boosted"
];
const FIELDSTRING = FIELDS.join(",");

const POPULAR_IDS = [
    129884,
    28560,
    21023,
    27992,
    111628,
    89503,
    16568,
    6565
]
const POPULAR_IDS_STRING = POPULAR_IDS.join(",");

const ARTISTFIELDS = [
    "id",
    "title",
    "birth_date",
    "dead_date",
    "description",
]
const ARTISTFIELDS_STRING = ARTISTFIELDS.join(",");

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
    const encodedQuery = encodeURIComponent(query); //encode to handle spaces and special characters
    const searchUrl = `${BASE_URL}/search/?q=${encodedQuery}&fields=${FIELDSTRING}&limit=${LIMIT}`;
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

export const getId = async (query) => {
    const searchUrl = `${BASE_URL}/${query}`
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

//https://api.artic.edu/api/v1/artworks?is_boosted=true&fields=id,image_id,title,artist_title,artist_display,date_start,date_end,medium_display,description,color,style_title,is_on_view&limit=100
export const getPopularArtworks = async () => { 
    const url = `${BASE_URL}?ids=${POPULAR_IDS_STRING}&fields=${FIELDSTRING}`
    console.log(url);
    try {
        const response = await fetch(url); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data; 
    } catch (err) {
        console.error("Error fetching artwork: ", err);
        throw err;
    }
}

export const getArtist = async (query_id) => {
    const url = `https://api.artic.edu/api/v1/artists/${query_id}?fields=${ARTISTFIELDS_STRING}`
    console.log(url);
    try {
        const response = await fetch(url); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data; 
    } catch (err) {
        console.error("Error fetching artist data: ", err);
        throw err;
    }
}

//base_url + '?fields=' + fieldsstring + '/search?q=';' + query + '&limit=' + limit
//`${BASE_URL}?fields=${FIELDSTRING}/search?q=${QUERY}&limit=${LIMIT}`
//https://api.artic.edu/api/v1/artworks/129884

/*
export const getArtworksArray = async () => {
    const url = `${BASE_URL}?fields=${FIELDSTRING}&limit=${LIMIT}`
    const response = await fetch(url);
    const data = await response.json();
    return data.data; //collection endpoint returns an array of artworks in the "data" property
}
*/
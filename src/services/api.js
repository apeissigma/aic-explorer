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
    "place_of_origin",
    "medium_display",
    "description",
    "color",
    "dimensions",
    "department_title",
    "style_title",
    "is_on_view",
    "is_boosted"
];
const FIELDSTRING = FIELDS.join(",");

const POPULAR_IDS = [
    
    28560, //bedroom van gogh
    129884, //starry night and astronauts
    21023, //buddha
    27992, //la grande jatte
    111628, //nighthawks
    16568, //waterlillies
    6565, //american gothic
    28067 //the old guitarist
]
const POPULAR_IDS_STRING = POPULAR_IDS.join(",");

const DAILY_IDS = [
    100227, //two candles gerhard richter
    274572, //untitled nam june paik
    79593, //Ciphers and Constellations in Love with a Woman miro
    136120, //noguchi expanding universe
    99789, //joseph cornell
    238759, //wojnarowicz
    155991, //ellsworth kelly
    240939, //charles white
    42969, //chagall
    4884, //francis bacon
    249012, //okeefe delaney
    24548, //shiva
    
    20684 //paris street
]

const ARTISTFIELDS = [
    "id",
    "title",
    "birth_date",
    "death_date",
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
    const url = `${BASE_URL}?ids=${POPULAR_IDS_STRING}&fields=${FIELDSTRING}&limit=8`
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

export const getDailyWork = async () => {
    const today = new Date();
    const fullDate = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate(); 

    const index = fullDate % DAILY_IDS.length;
    const dailyId = DAILY_IDS[index];

    const url = `${BASE_URL}/${dailyId}?fields=${FIELDSTRING}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (err) {
        console.error("Error fetching daily artwork: ", err);
        throw err;
    }
}
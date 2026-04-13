import { createContext, useState, useContext, useEffect } from 'react'

const FavoriteContext = createContext();

export const useFavoriteContext = () => useContext(FavoriteContext);

//anything inside provider will be treated as children
export const FavoriteProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);

    //check if any favorites in local storage
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");

        //read in favorites, parse string into array
        if (storedFavorites) setFavorites(JSON.parse(storedFavorites))
    }, [])

    //update storage when state changes, convert favorites into string
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (artwork) => {
        //take previous value and add new artwork
        setFavorites(prev => [...prev, artwork]);
    }

    const removeFromFavorites = (artworkId) => {
        //generate new array with all values except the one to remove
        setFavorites(prev => prev.filter(artwork => artwork.id !== artworkId));
    }

    const isFavorite = (artworkId) => {
        return favorites.some(artwork => artwork.id === artworkId);
    }

    //values globally available to children, accessed in the context provider
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <FavoriteContext.Provider value={value}>
        {children}
    </FavoriteContext.Provider>
}
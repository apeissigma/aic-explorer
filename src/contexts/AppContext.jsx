// import {createContext, useState, useContext, useEffect} from "react"

// const AppContext = createContext()

// export const useAppContext = () => useContext(AppContext)

// export const AppProvider = ({children}) => {
//     const [favorites, setFavorites] = useState([])

//     useEffect(() => {
//         const storedFavorites = localStorage.getItem("favorites")

//         if (storedFavorites) setFavorites(JSON.parse(storedFavorites))
//     }, [])

//     useEffect(() => {
//         localStorage.setItem('favorites', JSON.stringify(favorites))
//     }, [favorites])

//     const addToFavorites = (artwork) => {
//         setFavorites(prev => [...prev, artwork])
//     }

//     const removeFromFavorites = (artworkId) => {
//         setFavorites(prev => prev.filter(artwork => artwork.id !== artworkId))
//     }
    
//     const isFavorite = (artworkId) => {
//         return favorites.some(artwork => artwork.id === artworkId)
//     }

//     const value = {
//         favorites,
//         addToFavorites,
//         removeFromFavorites,
//         isFavorite
//     }

//     return <AppContext.Provider value={value}>
//         {children}
//     </AppContext.Provider>
// }
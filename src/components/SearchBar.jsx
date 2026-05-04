import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/SearchBar.css';

function SearchBar({ defaultValue = "" }) {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    //handle search submit, navigate to /search/query (Search.jsx)
    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return; //don't search empty queries
        navigate(`/search/${encodeURIComponent(searchQuery.trim())}`); 
    };

    return (
        <div className="search-bar">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search by artwork, artist, or keyword"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
    )
}

export default SearchBar; 
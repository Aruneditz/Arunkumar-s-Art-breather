import { useState, useEffect } from 'react';
import { SearchIcon, XIcon } from './Icons';
import './SearchBar.css';

/**
 * SearchBar Component
 * 
 * Allows users to search for products by title.
 * 
 * Props:
 * - onSearch: Callback function that receives search query
 * - placeholder: Placeholder text for input
 * 
 * React Concepts Used:
 * - useState: For managing search input value
 * - useEffect: For debouncing search (optional, can be added for better performance)
 * - Event handlers: onChange for input field
 * - Controlled component: Input value is managed by React state
 */
function SearchBar({ onSearch, placeholder = "Search artworks by title..." }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <span className="search-icon">
          <SearchIcon size={18} />
        </span>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          aria-label="Search products"
        />
        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
            title="Clear search"
          >
            <XIcon size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;

import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, XIcon } from './Icons';
import products from '../data/products';
import { searchProducts } from '../utils/searchUtils';
import './SearchBar.css';

/**
 * SearchBar Component
 * 
 * Fully active search and dynamic suggestion system for ART BREATHER:
 * - Real-time matching artwork suggestions based on the existing 34-product catalog
 * - Multi-field search support: title, partial text, category, material, description
 * - Maximum 5 prioritized suggestions
 * - Visual suggestion items: thumbnail, title, category/material tag, price
 * - Keyboard navigation (ArrowDown, ArrowUp, Enter, Escape)
 * - Click suggestion -> navigates directly to /product/:id
 * - Search icon button & Enter key support (direct navigation on 1 match, filtered shop on multiple)
 * - Outside click & clear dismiss
 * - Accessible ARIA attributes and dark artistic aesthetic
 */
function SearchBar({ 
  onSearch, 
  placeholder = "Search artworks by title, category, material..." 
}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Compute up to 5 suggestions dynamically from the 34-product catalog
  const suggestions = useMemo(() => {
    return searchProducts(products, searchQuery, 5);
  }, [searchQuery]);

  // Close dropdown on clicks outside the search container
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSelectedIndex(-1);
    setIsOpen(true);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    if (onSearch) {
      onSearch('');
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSelectSuggestion = (product) => {
    setIsOpen(false);
    setSelectedIndex(-1);
    navigate(`/product/${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    // 1. If an item is active via keyboard arrow navigation
    if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
      handleSelectSuggestion(suggestions[selectedIndex]);
      return;
    }

    // 2. If exactly one suggestion exists
    if (suggestions.length === 1) {
      handleSelectSuggestion(suggestions[0]);
      return;
    }

    // 3. If exact product title match exists in catalog
    const exactMatch = products.find(
      p => p.title.toLowerCase() === trimmed.toLowerCase()
    );
    if (exactMatch) {
      handleSelectSuggestion(exactMatch);
      return;
    }

    // 4. Multiple matches or general query: apply filter to shop and close dropdown
    setIsOpen(false);
    setSelectedIndex(-1);
    if (onSearch) {
      onSearch(trimmed);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedIndex(prev => (prev + 1) % suggestions.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedIndex(prev => (prev <= 0 ? suggestions.length - 1 : prev - 1));
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const hasQuery = searchQuery.trim().length > 0;
  const showDropdown = isOpen && hasQuery;

  return (
    <div className="search-bar" ref={searchRef}>
      <form 
        className="search-input-container"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchSubmit();
        }}
      >
        <button
          type="submit"
          className="search-icon-btn"
          aria-label="Search artworks"
          title="Search"
        >
          <SearchIcon size={18} />
        </button>
        <input
          ref={inputRef}
          type="text"
          name="artbreather_search"
          id="artbreather-search-input"
          className="search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => {
            if (hasQuery) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-lpignore="true"
          data-form-type="other"
          aria-label="Search artworks"
          role="combobox"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          aria-controls="search-suggestions-list"
          aria-activedescendant={
            selectedIndex >= 0 && suggestions[selectedIndex]
              ? `search-suggestion-${suggestions[selectedIndex].id}`
              : undefined
          }
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
            title="Clear search"
          >
            <XIcon size={16} />
          </button>
        )}
      </form>

      {showDropdown && (
        <div
          id="search-suggestions-list"
          className="search-dropdown"
          role="listbox"
          aria-label="Artwork suggestions"
        >
          {suggestions.length > 0 ? (
            <ul className="suggestions-list">
              {suggestions.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <li
                    key={item.id}
                    id={`search-suggestion-${item.id}`}
                    role="option"
                    aria-selected={isSelected}
                    className={`suggestion-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectSuggestion(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="suggestion-thumb-wrapper">
                      <img
                        src={`/${item.image}`}
                        alt={item.title}
                        className="suggestion-thumb"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="suggestion-info">
                      <span className="suggestion-title">{item.title}</span>
                      <span className="suggestion-tag">
                        {item.category} {item.material && `• ${item.material}`}
                      </span>
                    </div>
                    <span className="suggestion-price">₹{item.price}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="search-empty-state" role="status">
              <p className="search-empty-title">No matching artworks found</p>
              <p className="search-empty-hint">
                Try searching for painting, pencil art, acrylic, or an artwork title
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

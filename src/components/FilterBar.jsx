import { useState } from 'react';
import './FilterBar.css';

/**
 * FilterBar Component
 * 
 * Provides filtering options for products:
 * - Category filter
 * - Material filter
 * - Price range filter
 * 
 * Props:
 * - onFilterChange: Callback function that receives filter state
 * - onSortChange: Callback function that receives sort option
 * 
 * React Concepts Used:
 * - useState: For managing filter and sort state
 * - Event handlers: onChange for select elements
 * - Controlled components: Selects controlled by React state
 * - Object spread: To build filter object
 */
function FilterBar({ onFilterChange, onSortChange }) {
  const [filters, setFilters] = useState({
    category: 'All',
    material: 'All',
    priceRange: 'All'
  });

  const [sortOption, setSortOption] = useState('default');

  const handleCategoryChange = (e) => {
    const newFilters = { ...filters, category: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleMaterialChange = (e) => {
    const newFilters = { ...filters, material: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (e) => {
    const newFilters = { ...filters, priceRange: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    onSortChange(option);
  };

  const handleResetFilters = () => {
    const defaultFilters = {
      category: 'All',
      material: 'All',
      priceRange: 'All'
    };
    setFilters(defaultFilters);
    setSortOption('default');
    onFilterChange(defaultFilters);
    onSortChange('default');
  };

  return (
    <div className="filter-bar">
      <div className="filter-section">
        <h3 className="filter-title">🎨 FILTERS</h3>

        <div className="filter-group">
          <label htmlFor="category-filter" className="filter-label">
            Category
          </label>
          <select
            id="category-filter"
            className="filter-select"
            value={filters.category}
            onChange={handleCategoryChange}
          >
            <option value="All">All Categories</option>
            <option value="Painting">Painting</option>
            <option value="Pencil Drawing">Pencil Drawing</option>
            <option value="Bookmark">Bookmark</option>
            <option value="Illustration">Illustration</option>
            <option value="Crayon">Crayon</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="material-filter" className="filter-label">
            Material
          </label>
          <select
            id="material-filter"
            className="filter-select"
            value={filters.material}
            onChange={handleMaterialChange}
          >
            <option value="All">All Materials</option>
            <option value="Pencil">Pencil</option>
            <option value="Acrylic">Acrylic</option>
            <option value="Mixed Media">Mixed Media</option>
            <option value="Handmade Paper / Mixed Media">Handmade Paper / Mixed Media</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="price-filter" className="filter-label">
            Price Range
          </label>
          <select
            id="price-filter"
            className="filter-select"
            value={filters.priceRange}
            onChange={handlePriceChange}
          >
            <option value="All">All Prices</option>
            <option value="0-200">Under ₹200</option>
            <option value="200-400">₹200 - ₹400</option>
            <option value="400+">Above ₹400</option>
          </select>
        </div>

        <button 
          className="btn btn-outline reset-btn"
          onClick={handleResetFilters}
        >
          Reset Filters
        </button>
      </div>

      <div className="sort-section">
        <h3 className="sort-title">↕️ SORT</h3>

        <div className="sort-group">
          <label htmlFor="sort-select" className="sort-label">
            Sort By
          </label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;

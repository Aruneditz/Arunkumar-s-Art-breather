import { useState } from 'react';
import { 
  FilterIcon, 
  SortIcon, 
  ChevronDownIcon, 
  ChevronUpIcon, 
  RotateCcwIcon, 
  CheckIcon 
} from './Icons';
import './FilterBar.css';

/**
 * FilterBar Component
 * 
 * Provides a modern, collapsible filter and sorting bar for the product catalog:
 * - Compact bar with [ Filter ▾ ] toggle button & styled Sort dropdown
 * - Active filter count badge
 * - Collapsible drawer panel with Category, Material, and Price range filters
 * - Reset and Apply/Done actions
 * - Responsive down to 320px mobile viewports
 * 
 * Props:
 * - onFilterChange: Callback function that receives filter state
 * - onSortChange: Callback function that receives sort option
 */
function FilterBar({ onFilterChange, onSortChange }) {
  const [filters, setFilters] = useState({
    category: 'All',
    material: 'All',
    priceRange: 'All'
  });

  const [sortOption, setSortOption] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Calculate active filter count (excluding 'All')
  const activeFilterCount = 
    (filters.category !== 'All' ? 1 : 0) +
    (filters.material !== 'All' ? 1 : 0) +
    (filters.priceRange !== 'All' ? 1 : 0);

  const toggleFilter = () => {
    setIsFilterOpen(prev => !prev);
  };

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
    <div className="filter-bar-container">
      {/* Top Compact Control Bar */}
      <div className="filter-bar-header">
        <button
          type="button"
          className={`filter-toggle-btn ${isFilterOpen ? 'active' : ''} ${activeFilterCount > 0 ? 'has-filters' : ''}`}
          onClick={toggleFilter}
          aria-expanded={isFilterOpen}
          aria-controls="filter-drawer-panel"
          title={isFilterOpen ? 'Hide filters' : 'Show filters'}
        >
          <span className="filter-btn-left">
            <FilterIcon size={18} className="filter-icon" />
            <span className="filter-btn-text">Filter</span>
            {activeFilterCount > 0 && (
              <span className="filter-count-badge" aria-label={`${activeFilterCount} filters applied`}>
                {activeFilterCount}
              </span>
            )}
          </span>
          <span className="filter-chevron" aria-hidden="true">
            {isFilterOpen ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
          </span>
        </button>

        {/* Sort Selector */}
        <div className="sort-dropdown-wrap">
          <label htmlFor="sort-select" className="sort-icon-label" aria-hidden="true">
            <SortIcon size={16} className="sort-icon" />
          </label>
          <select
            id="sort-select"
            className="styled-sort-select"
            value={sortOption}
            onChange={handleSortChange}
            aria-label="Sort products"
          >
            <option value="default">Sort: Default</option>
            <option value="price-low">Sort: Price Low → High</option>
            <option value="price-high">Sort: Price High → Low</option>
            <option value="name-asc">Sort: Name A → Z</option>
          </select>
          <ChevronDownIcon size={14} className="sort-select-arrow" aria-hidden="true" />
        </div>
      </div>

      {/* Collapsible Filter Panel */}
      <div 
        id="filter-drawer-panel"
        className={`filter-drawer ${isFilterOpen ? 'open' : 'closed'}`}
        aria-hidden={!isFilterOpen}
      >
        <div className="filter-drawer-inner">
          <div className="filter-drawer-grid">
            {/* Category Filter */}
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
              </select>
            </div>

            {/* Material Filter */}
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
                <option value="Crayon">Crayon</option>
                <option value="Handmade Paper / Mixed Media">Handmade Paper / Mixed Media</option>
              </select>
            </div>

            {/* Price Range Filter */}
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
          </div>

          {/* Action Row */}
          <div className="filter-drawer-actions">
            <button 
              type="button"
              className="filter-action-btn reset-btn"
              onClick={handleResetFilters}
              disabled={activeFilterCount === 0 && sortOption === 'default'}
              title="Reset all filters and sorting"
            >
              <RotateCcwIcon size={15} />
              <span>Reset Filters</span>
            </button>

            <button
              type="button"
              className="filter-action-btn done-btn"
              onClick={toggleFilter}
              title="Close filter panel"
            >
              <CheckIcon size={15} />
              <span>Done</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;

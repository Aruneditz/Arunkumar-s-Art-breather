import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ProductGrid from '../components/ProductGrid';
import products from '../data/products';
import './Shop.css';

/**
 * Shop Page Component
 * 
 * Complete shop page with:
 * - Navigation bar
 * - Search functionality
 * - Filter system (category, material, price)
 * - Sorting options
 * - Product grid display
 * - Responsive layout
 * 
 * React Concepts Used:
 * - useState: For managing search query, filters, sort state
 * - useMemo: For optimized filtering/sorting logic
 * - useNavigate: From React Router for navigation to product details
 * - Functions: filterProducts, sortProducts for business logic
 * - Array methods: filter(), sort() for data manipulation
 */
function Shop({ onAddToCart, cartCount = 0 }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    material: 'All',
    priceRange: 'All'
  });
  const [sortOption, setSortOption] = useState('default');

  // Filter and sort products based on current state
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category !== 'All') {
      result = result.filter(product => product.category === filters.category);
    }

    // Apply material filter
    if (filters.material !== 'All') {
      result = result.filter(product => product.material === filters.material);
    }

    // Apply price range filter
    if (filters.priceRange !== 'All') {
      if (filters.priceRange === '0-200') {
        result = result.filter(product => product.price < 200);
      } else if (filters.priceRange === '200-400') {
        result = result.filter(product => product.price >= 200 && product.price <= 400);
      } else if (filters.priceRange === '400+') {
        result = result.filter(product => product.price > 400);
      }
    }

    // Apply sorting
    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [searchQuery, filters, sortOption]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  const handleBuyNow = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="shop-page">
      <Navbar cartCount={cartCount} />

      {/* Page Header */}
      <section className="shop-header">
        <div className="container">
          <h1 className="shop-title">Explore Our Art</h1>
          <p className="shop-subtitle">
            Discover our curated collection of handmade artworks
          </p>
        </div>
      </section>

      {/* Main Shop Content */}
      <section className="shop-content">
        <div className="container">
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />

          {/* Filters and Sorting */}
          <FilterBar
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />

          {/* Results Info */}
          <div className="results-info">
            <p className="results-count">
              Showing <strong>{filteredProducts.length}</strong> artwork{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Product Grid */}
          <ProductGrid
            products={filteredProducts}
            onAddToCart={onAddToCart}
            onBuyNow={handleBuyNow}
            emptyMessage="No artworks found matching your search and filters. Try adjusting your criteria!"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Shop;

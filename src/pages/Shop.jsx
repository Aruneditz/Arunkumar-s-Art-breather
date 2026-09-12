import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ProductGrid from '../components/ProductGrid';
import products from '../data/products';
import './Shop.css';

const ITEMS_PER_PAGE = 10;

/**
 * Shop Page Component
 * 
 * Complete shop page with:
 * - Navigation bar
 * - Search functionality
 * - Filter system (category, material, price)
 * - Sorting options
 * - Paginated product grid display (max 10 products per page)
 * - Custom ART BREATHER dark-themed pagination controls
 * - Responsive layout
 * 
 * React Concepts Used:
 * - useState: For managing search query, filters, sort state, current page
 * - useEffect: For resetting pagination upon filter/search change
 * - useMemo: For optimized filtering/sorting logic and paginated slice
 * - useNavigate: From React Router for navigation to product details
 * - Functions: filterProducts, sortProducts for business logic
 * - Array methods: filter(), sort(), slice() for data manipulation
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
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever search, filters, or sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, sortOption]);

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

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  // Slice products for current page (max 10 products)
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

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
              Showing{' '}
              <strong>
                {filteredProducts.length === 0
                  ? 0
                  : `${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(
                      currentPage * ITEMS_PER_PAGE,
                      filteredProducts.length
                    )}`}
              </strong>{' '}
              of <strong>{filteredProducts.length}</strong> artwork{filteredProducts.length !== 1 ? 's' : ''}
              {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
            </p>
          </div>

          {/* Product Grid */}
          <ProductGrid
            products={paginatedProducts}
            onAddToCart={onAddToCart}
            onBuyNow={handleBuyNow}
            emptyMessage="No artworks found matching your search and filters. Try adjusting your criteria!"
          />

          {/* Unique ART BREATHER Dark-Themed Pagination */}
          {filteredProducts.length > 0 && (
            <div className="artbreather-pagination" role="navigation" aria-label="Shop Pagination">
              <button
                type="button"
                className="pagination-btn pagination-arrow"
                onClick={() => {
                  setCurrentPage(prev => Math.max(prev - 1, 1));
                  window.scrollTo({ top: 280, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                aria-label="Previous Page"
                title="Go to previous page"
              >
                ‹ Previous
              </button>

              <div className="pagination-pages">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    type="button"
                    className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 280, behavior: 'smooth' });
                    }}
                    aria-label={`Go to page ${pageNum}`}
                    aria-current={currentPage === pageNum ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="pagination-btn pagination-arrow"
                onClick={() => {
                  setCurrentPage(prev => Math.min(prev + 1, totalPages));
                  window.scrollTo({ top: 280, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
                title="Go to next page"
              >
                Next ›
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Shop;

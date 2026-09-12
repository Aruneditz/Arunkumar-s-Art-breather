import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

/**
 * ProductCard Component - Phase 9
 * 
 * Displays a single product with:
 * - Clickable card navigating to Product Details page (/product/:id)
 * - Product image with wishlist button
 * - Title and category badge
 * - Material info
 * - Expandable "Product Details" with full description
 * - Price display
 * - Buy Now button (Add to Cart is exclusively on Product Details page)
 * 
 * React Concepts Used:
 * - useState: For wishlist state and expanded description
 * - useNavigate: For navigation to details and Buy Now checkout
 * - Event handling: stopPropagation on buttons to prevent accidental card navigation
 */
function ProductCard({ product, onAddToCart, onBuyNow }) {
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Navigate to product details on card click
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
    window.scrollTo(0, 0);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    setIsInWishlist(!isInWishlist);
  };

  const handleDetailsToggle = (e) => {
    e.stopPropagation();
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    // Navigate directly to Buy Now Checkout with this product
    navigate('/buy-now', { state: { product } });
  };

  return (
    <div 
      className="product-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
        }
      }}
    >
      {/* Image Container */}
      <div className="product-image-container">
        <img
          src={`/${product.image}`}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
        
        {/* Wishlist Button */}
        <button
          className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-label="Toggle wishlist"
        >
          {isInWishlist ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <div className="product-header">
          <h3 className="product-title">{product.title}</h3>
          <span className="product-category">{product.category}</span>
        </div>

        <div className="product-material">
          <span className="material-label">Material:</span>
          <span className="material-value">{product.material}</span>
        </div>

        {/* Product Details Toggle */}
        <button
          className="product-details-toggle"
          onClick={handleDetailsToggle}
        >
          {isDescriptionExpanded ? '▼ Hide Details' : '▶ Product Details'}
        </button>

        {/* Expandable Description */}
        {isDescriptionExpanded && (
          <div 
            className="product-description-expanded"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="product-description-text">{product.description}</p>
          </div>
        )}
      </div>

      {/* Price and Buy Now Action Section */}
      <div className="product-footer">
        <div className="product-price">
          <span className="currency">₹</span>
          <span className="amount">{product.price.toLocaleString('en-IN')}</span>
        </div>
        
        <div className="product-action-buttons">
          <button
            className="btn btn-primary buy-now-btn"
            onClick={handleBuyNow}
            title="Buy Now"
          >
            ⚡ Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

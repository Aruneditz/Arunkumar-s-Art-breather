import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import { ChevronLeftIcon, ChevronRightIcon, SparklesIcon, PaletteIcon } from '../components/Icons';
import products from '../data/products';
import './ProductDetails.css';

/**
 * ProductDetails Page Component
 * 
 * Displays detailed information for a single product:
 * - Multi-image interactive gallery with swipe, arrows, and dot indicators
 * - Product title, category, price, description
 * - Material information
 * - Availability status
 * - Full description in "About this Artwork" section
 * - Recommended products (excluding current product)
 * - Add to Cart and Buy Now buttons
 * 
 * React Concepts Used:
 * - useState: For multi-image gallery active index and touch coordinates
 * - useEffect: To reset gallery index on product route change
 * - useParams: From React Router to get product ID from URL
 * - useNavigate: For navigation between pages
 * - find(): To search for specific product
 * - filter(): To get recommended products (exclude current)
 * - Conditional rendering: Show 404 if product not found
 * - Dynamic route handling
 */
function ProductDetails({ onAddToCart, cartCount = 0 }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the current product
  const product = products.find(p => p.id === parseInt(id));

  // Multi-image gallery state
  const galleryImages = (product?.images && product.images.length > 0) 
    ? product.images 
    : (product ? [product.image] : []);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Touch swipe state for mobile gallery navigation
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Reset to first image whenever product ID changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [id]);

  // If product not found, show 404 message
  if (!product) {
    return (
      <div className="product-details-page">
        <Navbar cartCount={cartCount} />
        <section className="product-not-found">
          <div className="container">
            <h1>Product Not Found</h1>
            <p>The artwork you're looking for doesn't exist or has been removed.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/shop')}
            >
              Back to Shop
            </button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // Get recommended products (all products except current one)
  const recommendedProducts = products.filter(p => p.id !== product.id);

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
    // Scroll to top
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  const handleBuyNow = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  const handleBuyNowOnDetailsPage = () => {
    // Navigate to buy-now checkout page with current product
    navigate('/buy-now', { state: { product } });
  };

  // Gallery Navigation Handlers
  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    setActiveImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    setActiveImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  // Touch Swipe Handlers (min distance 40px)
  const minSwipeDistance = 40;
  const handleTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    if (distance < -minSwipeDistance) {
      // Swiped Right -> move to next image as specified
      handleNextImage();
    } else if (distance > minSwipeDistance) {
      // Swiped Left -> move to previous image as specified
      handlePrevImage();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div className="product-details-page">
      <Navbar cartCount={cartCount} />

      {/* Product Details Section */}
      <section className="product-details">
        <div className="container">
          <div className="product-details-grid">
            {/* Left: Product Image Column with Multi-Image Gallery */}
            <div className="product-details-image-col">
              <div 
                className="product-details-image"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={`/${galleryImages[activeImageIndex] || product.image}`}
                  alt={`${product.title} - View ${activeImageIndex + 1}`}
                  className="details-image"
                />

                {galleryImages.length > 1 && (
                  <>
                    {/* Previous Button */}
                    <button
                      type="button"
                      className="gallery-arrow-btn prev-btn"
                      onClick={handlePrevImage}
                      aria-label="Previous image"
                      title="Previous artwork image"
                    >
                      <ChevronLeftIcon size={22} />
                    </button>

                    {/* Next Button */}
                    <button
                      type="button"
                      className="gallery-arrow-btn next-btn"
                      onClick={handleNextImage}
                      aria-label="Next image"
                      title="Next artwork image"
                    >
                      <ChevronRightIcon size={22} />
                    </button>

                    {/* Active Dot Indicators */}
                    <div className="gallery-dots" role="tablist" aria-label="Artwork view indicators">
                      {galleryImages.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`gallery-dot ${idx === activeImageIndex ? 'active' : ''}`}
                          onClick={() => setActiveImageIndex(idx)}
                          aria-label={`Show artwork view ${idx + 1}`}
                          role="tab"
                          aria-selected={idx === activeImageIndex}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Gallery Thumbnails Strip */}
              {galleryImages.length > 1 && (
                <div className="gallery-thumbnails" aria-label="Artwork thumbnails">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`gallery-thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <img src={`/${img}`} alt={`${product.title} view ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Information */}
            <div className="product-details-info">
              <div className="details-header">
                <span className="details-category">{product.category}</span>
                <h1 className="details-title">{product.title}</h1>
              </div>

              {/* Price Section */}
              <div className="price-section">
                <span className="currency">₹</span>
                <span className="price-amount">{product.price.toLocaleString('en-IN')}</span>
                <span className="availability available">In Stock</span>
              </div>

              {/* Description */}
              <p className="details-description">{product.description}</p>

              {/* Material Info */}
              <div className="material-section">
                <h3 className="section-label">Material</h3>
                <p className="material-info">{product.material}</p>
              </div>

              {/* Key Details */}
              <div className="key-details">
                <div className="detail-item">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{product.category}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Availability:</span>
                  <span className="detail-value available">In Stock</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button 
                  className="btn btn-primary add-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button 
                  className="btn btn-secondary buy-now-btn"
                  onClick={handleBuyNowOnDetailsPage}
                >
                  Buy Now
                </button>
              </div>

              {/* Additional Info */}
              <div className="additional-info">
                <p className="info-text">
                  <SparklesIcon size={18} color="var(--primary-color)" />
                  <span>Each artwork is unique and handmade with care</span>
                </p>
                <p className="info-text">
                  <PaletteIcon size={18} color="var(--primary-color)" />
                  <span>Authenticated original creation by our talented artists</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About This Artwork Section */}
      <section className="about-artwork">
        <div className="container">
          <h2 className="section-title">About This Artwork</h2>
          <div className="about-content">
            <p>{product.description}</p>
            <div className="artwork-details">
              <div className="detail-box">
                <h4>Material</h4>
                <p>{product.material}</p>
              </div>
              <div className="detail-box">
                <h4>Category</h4>
                <p>{product.category}</p>
              </div>
              <div className="detail-box">
                <h4>Price</h4>
                <p>₹{product.price.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Products Section */}
      <section className="recommended-section">
        <div className="container">
          <h2 className="section-title">You May Also Like</h2>
          <p className="section-subtitle">Other beautiful artworks from our collection</p>
          <ProductGrid
            products={recommendedProducts}
            onBuyNow={handleBuyNow}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ProductDetails;

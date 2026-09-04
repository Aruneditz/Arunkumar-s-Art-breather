import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Wishlist.css';

/**
 * Wishlist Page Component
 * 
 * Displays all items the user has added to their wishlist:
 * - Wishlist item grid with images and details
 * - Remove from wishlist functionality
 * - Add to cart from wishlist
 * - Empty state when no items
 * - View product details link
 * 
 * Features:
 * - Retrieve wishlist from localStorage
 * - Add items to cart
 * - Remove items from wishlist
 * - Responsive grid layout
 * - Product details navigation
 * 
 * React Concepts Used:
 * - useState: For managing wishlist state and local data
 * - useEffect: To load wishlist from localStorage
 * - useNavigate: For route navigation
 * - localStorage: For wishlist persistence
 */
function Wishlist({ cartCount = 0, onAddToCart, onRemoveFromWishlist }) {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('artBreatherWishlist');
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    }
    setLoading(false);
  }, []);

  const handleRemoveFromWishlist = (productId) => {
    const updated = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updated);
    localStorage.setItem('artBreatherWishlist', JSON.stringify(updated));
    if (onRemoveFromWishlist) {
      onRemoveFromWishlist(productId);
    }
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
    // Show confirmation
    alert(`${product.title} added to cart!`);
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="wishlist-page">
        <Navbar cartCount={cartCount} />
        <section className="wishlist-content">
          <div className="container">
            <p>Loading your wishlist...</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <Navbar cartCount={cartCount} />

      <section className="wishlist-header">
        <div className="container">
          <h1 className="page-title">My Wishlist</h1>
          <p className="page-subtitle">
            {wishlistItems.length > 0
              ? `${wishlistItems.length} item${wishlistItems.length !== 1 ? 's' : ''} saved for later`
              : 'Your wishlist is empty'}
          </p>
        </div>
      </section>

      <section className="wishlist-content">
        <div className="container">
          {wishlistItems.length === 0 ? (
            <div className="empty-wishlist">
              <div className="empty-icon">❤️</div>
              <h2>Your Wishlist is Empty</h2>
              <p>Save your favorite artworks to view them later.</p>
              <button className="btn btn-primary" onClick={() => navigate('/shop')}>
                Explore Artworks
              </button>
            </div>
          ) : (
            <div className="wishlist-grid">
              {wishlistItems.map((item) => (
                <div key={item.id} className="wishlist-item-card">
                  <div className="wishlist-item-image">
                    <img src={`/${item.image}`} alt={item.title} />
                    <div className="wishlist-item-overlay">
                      <button
                        className="btn btn-primary add-to-cart-btn"
                        onClick={() => handleAddToCart(item)}
                      >
                        🛒 Add to Cart
                      </button>
                      <button
                        className="btn btn-secondary view-details-btn"
                        onClick={() => handleViewDetails(item.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="wishlist-item-info">
                    <h3 className="item-title">{item.title}</h3>
                    <span className="item-category">{item.category}</span>

                    <div className="item-material">
                      <span className="material-label">Material:</span>
                      <span className="material-value">{item.material}</span>
                    </div>

                    <div className="item-price-section">
                      <p className="item-price">₹{item.price}</p>
                      <button
                        className="remove-wishlist-btn"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        title="Remove from wishlist"
                      >
                        ❌ Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="wishlist-cta">
        <div className="container">
          <h2>Didn't Find What You're Looking For?</h2>
          <p>Browse our complete collection of handmade artworks.</p>
          <button className="btn btn-primary" onClick={() => navigate('/shop')}>
            Shop All Artworks
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Wishlist;

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar Component
 * 
 * Responsive navigation bar with:
 * - Brand logo/name
 * - Navigation links (Home, Shop, Wishlist, Cart)
 * - Cart badge showing item count
 * - Mobile menu toggle
 * - Search icon
 * - Login/Profile link with user auth state (Phase 6)
 * 
 * Features:
 * - Responsive design with mobile hamburger menu
 * - Sticky positioning
 * - Cart badge showing items count
 * - Conditional auth display (login/user profile)
 * - Logout functionality
 * - localStorage user session check
 * 
 * React Concepts Used:
 * - useState: For mobile menu state and search state
 * - useEffect: For loading user from localStorage
 * - useNavigate: For logout navigation
 * - Link: From React Router for navigation
 * - Props: Accepts cartCount to display badge
 */
function Navbar({ cartCount = 0 }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('artBreatherUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('artBreatherUser');
    localStorage.removeItem('artBreatherRememberMe');
    setUser(null);
    closeMobileMenu();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🎨</span>
          <span className="brand-text">ART BREATHER</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Main Navigation */}
        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className="nav-link"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className="nav-link"
            onClick={closeMobileMenu}
          >
            Shop
          </Link>
          <Link 
            to="/wishlist" 
            className="nav-link"
            onClick={closeMobileMenu}
          >
            Wishlist
          </Link>
          <Link 
            to="/cart" 
            className="nav-link cart-link"
            onClick={closeMobileMenu}
          >
            Cart
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </div>

        {/* Right Section - Search and Login/Profile */}
        <div className="nav-right">
          <div className={`search-container ${isSearchOpen ? 'active' : ''}`}>
            <button 
              className="search-btn"
              onClick={toggleSearch}
              aria-label="Search"
            >
              🔍
            </button>
            <input
              type="text"
              className="search-input"
              placeholder="Search artworks..."
              onBlur={() => setIsSearchOpen(false)}
            />
          </div>
          
          {/* Auth Section - Conditional Rendering */}
          {user ? (
            <div className="user-menu">
              <Link to="/account" className="user-profile-btn">
                👤 {user.name}
              </Link>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link login-link">
              👤 Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

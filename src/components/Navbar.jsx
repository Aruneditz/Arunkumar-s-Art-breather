import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PaletteIcon, SearchIcon, UserIcon } from './Icons';
import products from '../data/products';
import { searchProducts } from '../utils/searchUtils';
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
  const [navSearchQuery, setNavSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const navSearchRef = useRef(null);

  // Compute suggestions from catalog for navbar search
  const navSuggestions = useMemo(() => {
    return searchProducts(products, navSearchQuery, 5);
  }, [navSearchQuery]);

  // Click outside to close navbar search
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navSearchRef.current && !navSearchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleNavSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const trimmed = navSearchQuery.trim();
    if (!trimmed) return;
    setIsSearchOpen(false);
    if (navSuggestions.length === 1) {
      navigate(`/product/${navSuggestions[0].id}`);
    } else {
      navigate('/shop');
    }
  };

  const handleSelectNavSuggestion = (item) => {
    setIsSearchOpen(false);
    setNavSearchQuery('');
    navigate(`/product/${item.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          <span className="brand-icon">
            <PaletteIcon size={22} className="brand-svg-icon" />
          </span>
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
          <Link 
            to="/ordered-details" 
            className="nav-link"
            onClick={closeMobileMenu}
          >
            Orders
          </Link>
        </div>

        {/* Right Section - Search and Login/Profile */}
        <div className="nav-right" ref={navSearchRef}>
          <form 
            className={`search-container ${isSearchOpen ? 'active' : ''}`}
            autoComplete="off"
            onSubmit={handleNavSearchSubmit}
          >
            <button 
              type="button"
              className="search-btn"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <SearchIcon size={18} />
            </button>
            <input
              type="text"
              name="artbreather_nav_search"
              id="navbar-search-input"
              className="search-input"
              placeholder="Search artworks..."
              value={navSearchQuery}
              onChange={(e) => setNavSearchQuery(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              data-lpignore="true"
            />
            {isSearchOpen && navSearchQuery.trim() && (
              <div className="nav-search-dropdown" role="listbox">
                {navSuggestions.length > 0 ? (
                  <ul className="nav-suggestions-list">
                    {navSuggestions.map((item) => (
                      <li
                        key={item.id}
                        className="nav-suggestion-item"
                        onClick={() => handleSelectNavSuggestion(item)}
                      >
                        <img 
                          src={`/${item.image}`} 
                          alt={item.title} 
                          className="nav-suggestion-thumb" 
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div className="nav-suggestion-info">
                          <span className="nav-suggestion-title">{item.title}</span>
                          <span className="nav-suggestion-tag">{item.category} • ₹{item.price}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="nav-search-empty">
                    <p>No matching artworks found</p>
                  </div>
                )}
              </div>
            )}
          </form>
          
          {/* Auth Section - Conditional Rendering */}
          {user ? (
            <div className="user-menu">
              <Link to="/account" className="user-profile-btn">
                <UserIcon size={16} />
                <span>{user.name}</span>
              </Link>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link login-link">
              <UserIcon size={16} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

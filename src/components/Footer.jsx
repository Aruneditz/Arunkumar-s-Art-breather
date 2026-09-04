import { Link } from 'react-router-dom';
import './Footer.css';

/**
 * Footer Component
 * 
 * Professional footer with:
 * - Brand name and tagline
 * - Quick navigation links
 * - Social media icons (placeholders)
 * - Copyright information
 * 
 * React Concepts Used:
 * - Link: From React Router for navigation
 * - Functional component with static content
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <h3 className="footer-brand">
              <img src="/palette.svg" alt="Palette Logo" className="footer-palette-img" />
              <span>ART BREATHER</span>
            </h3>
            <p className="footer-tagline">
              Handmade Art. A Breath of Creativity.
            </p>
            <p className="footer-description">
              Discover authentic handmade artworks created with imagination, patience, and personal touch.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-section-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/wishlist">Wishlist</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-section">
            <h4 className="footer-section-title">Company</h4>
            <ul className="footer-links">
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#shipping">Shipping Info</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="footer-section">
            <h4 className="footer-section-title">Follow Us</h4>
            <div className="social-links">
              <a 
                href="#facebook" 
                className="social-link"
                aria-label="Facebook"
                title="Facebook"
              >
                f
              </a>
              <a 
                href="#instagram" 
                className="social-link"
                aria-label="Instagram"
                title="Instagram"
              >
                📷
              </a>
              <a 
                href="#twitter" 
                className="social-link"
                aria-label="Twitter"
                title="Twitter"
              >
                𝕏
              </a>
              <a 
                href="#pinterest" 
                className="social-link"
                aria-label="Pinterest"
                title="Pinterest"
              >
                P
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} Art Breather. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <span className="separator">•</span>
            <a href="#terms">Terms of Service</a>
            <span className="separator">•</span>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

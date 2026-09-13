import { Link } from 'react-router-dom';
import { PaletteIcon } from './Icons';
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
              <span className="footer-icon">
                <PaletteIcon size={20} className="footer-svg-icon" />
              </span>
              ART BREATHER
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
              <li>
                <Link to="/ordered-details">My Orders</Link>
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

          {/* Contact Section */}
          <div className="footer-section footer-contact-section" id="contact">
            <h4 className="footer-section-title">Contact Us</h4>
            <div className="footer-contact-list">
              {/* Phone Contact */}
              <a 
                href="tel:8438940851" 
                className="contact-card-row"
                aria-label="Call 8438940851"
                title="Call 8438940851"
              >
                <div className="contact-card-icon" aria-hidden="true">
                  <svg className="contact-icon-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className="contact-card-body">
                  <span className="contact-card-label">Phone</span>
                  <span className="contact-card-value">8438940851</span>
                </div>
              </a>

              {/* WhatsApp Contact */}
              <a 
                href="https://wa.me/918438940851" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-card-row"
                aria-label="WhatsApp 8438940851"
                title="Chat on WhatsApp: 8438940851"
              >
                <div className="contact-card-icon" aria-hidden="true">
                  <svg className="contact-icon-svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div className="contact-card-body">
                  <span className="contact-card-label">WhatsApp</span>
                  <span className="contact-card-value">8438940851</span>
                </div>
              </a>

              {/* Gmail Contact */}
              <a 
                href="mailto:arunkumarpalanivel1183@gmail.com" 
                className="contact-card-row"
                aria-label="Email arunkumarpalanivel1183@gmail.com"
                title="Email arunkumarpalanivel1183@gmail.com"
              >
                <div className="contact-card-icon" aria-hidden="true">
                  <svg className="contact-icon-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div className="contact-card-body">
                  <span className="contact-card-label">Gmail</span>
                  <span className="contact-card-value">arunkumarpalanivel1183@gmail.com</span>
                </div>
              </a>

              {/* Instagram Contact */}
              <a 
                href="https://www.instagram.com/past_breather._/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-card-row"
                aria-label="Instagram profile past_breather._"
                title="Instagram: past_breather._"
              >
                <div className="contact-card-icon" aria-hidden="true">
                  <svg className="contact-icon-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </div>
                <div className="contact-card-body">
                  <span className="contact-card-label">Instagram</span>
                  <span className="contact-card-value">past_breather._</span>
                </div>
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

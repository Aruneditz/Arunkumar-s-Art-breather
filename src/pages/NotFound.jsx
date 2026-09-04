import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './NotFound.css';

/**
 * NotFound (404) Page Component
 * 
 * Displays when user navigates to a non-existent route.
 * 
 * Features:
 * - Large 404 error message
 * - Artistic illustration
 * - Helpful text
 * - Navigation buttons back to home and shop
 * 
 * React Concepts Used:
 * - useNavigate: For navigation back to home/shop
 * - useLocation: Could be used to show the invalid path
 * - Functional component
 */
function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <Navbar cartCount={0} />

      <section className="not-found-content">
        <div className="container">
          <div className="not-found-wrapper">
            {/* Large 404 */}
            <div className="not-found-number">404</div>

            {/* Artistic Icon */}
            <div className="not-found-icon">🎨✨</div>

            {/* Text Content */}
            <h1 className="not-found-title">
              Oops! This Artwork Doesn't Exist
            </h1>

            <p className="not-found-subtitle">
              The page you're looking for seems to have wandered off to a creative dimension. 
              Let's bring you back to our gallery of beautiful artworks.
            </p>

            {/* Action Buttons */}
            <div className="not-found-buttons">
              <button
                className="btn btn-primary"
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/shop')}
              >
                Browse Artworks
              </button>
            </div>

            {/* Helpful Text */}
            <div className="not-found-help">
              <p className="help-text">
                ✨ Are you looking for something specific? Try browsing by category or using our search feature.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default NotFound;

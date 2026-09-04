/**
 * Home Page Component
 * 
 * Main landing page with:
 * - Hero section
 * - Featured artworks
 * - Categories section with category cards
 * - About section
 * 
 * React Concepts Used:
 * - Functional component
 * - Import other components
 * - useNavigate for routing
 * - Array slicing to show featured products
 */
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import CategoryCards from '../components/CategoryCards';
import products from '../data/products';
import './Home.css';

function Home({ onAddToCart, cartCount = 0 }) {
  const navigate = useNavigate();

  // Get first 4 products for featured section
  const featuredProducts = products.slice(0, 4);

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleBuyNow = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleExploreArt = () => {
    navigate('/shop');
  };

  return (
    <div className="home-page">
      <Navbar cartCount={cartCount} />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Art That Makes You Breathe.</h1>
          <p className="hero-subtitle">
            Discover handmade artworks created with imagination, patience and a personal touch.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={handleExploreArt}
            >
              Explore Art
            </button>
            <button 
              className="btn btn-outline"
              onClick={handleExploreArt}
            >
              View Collection
            </button>
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Artworks</h2>
          <p className="section-subtitle">Hand-picked creations from our talented artists</p>
          <ProductGrid
            products={featuredProducts}
            onAddToCart={onAddToCart}
            onBuyNow={handleBuyNow}
          />
          <div className="featured-cta">
            <button 
              className="btn btn-primary"
              onClick={handleExploreArt}
            >
              View All Artworks
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Explore by Category</h2>
          <p className="section-subtitle">Browse artworks by type and style</p>
          <CategoryCards />
        </div>
      </section>

      {/* Why Art Breather Section */}
      <section className="why-us-section">
        <div className="container">
          <h2 className="section-title">Why Art Breather?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">✋</div>
              <h3>Handmade with Care</h3>
              <p>Each artwork is carefully crafted by talented artists with dedication and passion.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎨</div>
              <h3>Original Creative Work</h3>
              <p>Every piece is unique and original, never duplicated or mass-produced.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💎</div>
              <h3>Thoughtfully Crafted</h3>
              <p>We ensure every detail reflects the artist's vision and creativity.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">❤️</div>
              <h3>Made for Art Lovers</h3>
              <p>Perfect for collectors, enthusiasts, and anyone who appreciates handmade art.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">About Art Breather</h2>
          <div className="about-content">
            <p>
              Art Breather is a small but passionate creative studio dedicated to showcasing authentic 
              handmade artworks. We believe in supporting independent artists and bringing unique, 
              original pieces to art lovers around the world.
            </p>
            <p>
              Every artwork in our collection tells a story—a story of creativity, patience, and personal 
              expression. Whether it's a vibrant painting, a delicate pencil drawing, or a bold illustration, 
              each piece is a testament to the artist's skill and imagination.
            </p>
            <p>
              We invite you to take a breath, explore our collection, and find the perfect piece that 
              speaks to your heart.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;

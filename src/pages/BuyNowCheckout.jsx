import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import products from '../data/products';
import './BuyNowCheckout.css';

/**
 * Buy Now Checkout Page Component
 * 
 * Handles single product purchase flow:
 * - Display selected product details
 * - Quantity selection
 * - Customer information form
 * - Price breakdown with automatic calculation
 * - Continue to payment
 * 
 * Features:
 * - Quantity increase/decrease controls
 * - Dynamic price calculation (tax, delivery fee, subtotal)
 * - Form validation for customer details
 * - Responsive layout (2-column on desktop, 1-column on mobile)
 * - Automatic total calculation based on quantity
 * 
 * React Concepts Used:
 * - useState: For product quantity, form data, and UI state
 * - useEffect: For initializing with product from location state
 * - useNavigate, useLocation: For routing and receiving product data
 * - Dynamic calculations for pricing
 */
function BuyNowCheckout({ cartCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedAdditionalArt, setSelectedAdditionalArt] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    address: '',
    pincode: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Constants for pricing
  const TAX_RATE = 0.05; // 5% tax
  const DELIVERY_FEE = 49; // ₹49 delivery
  const DISCOUNT_PERCENTAGE = 0; // 0% discount (can be updated)

  useEffect(() => {
    // Get product from location state (passed from ProductCard/ProductDetails)
    if (location.state?.product) {
      setProduct(location.state.product);
    } else {
      // If no product in state, redirect to shop
      navigate('/shop');
    }
  }, [location, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 5) {
      newErrors.address = 'Address must be at least 5 characters';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  // Toggle selection for companion artworks in "Complete Your Collection"
  const handleToggleAdditional = (art) => {
    setSelectedAdditionalArt(prev => {
      const exists = prev.some(item => item.id === art.id);
      if (exists) {
        return prev.filter(item => item.id !== art.id);
      } else {
        return [...prev, { ...art, quantity: 1 }];
      }
    });
  };

  // Curated companion artworks (excluding current main product - exactly 2 products)
  const suggestedArtworks = product 
    ? products.filter(p => p.id !== product.id).slice(0, 2)
    : [];

  // Dynamic Price calculations
  const productPrice = product?.price || 0;
  const mainSubtotal = productPrice * quantity;
  const additionalSubtotal = selectedAdditionalArt.reduce(
    (sum, item) => sum + (item.price * (item.quantity || 1)), 
    0
  );
  const subtotal = mainSubtotal + additionalSubtotal;
  const tax = Math.round(subtotal * TAX_RATE);
  const discount = Math.round(subtotal * (DISCOUNT_PERCENTAGE / 100));
  const totalBeforeDelivery = subtotal + tax - discount;
  const deliveryFee = DELIVERY_FEE;
  const totalAmount = totalBeforeDelivery + deliveryFee;

  const handleContinue = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate processing
    setTimeout(() => {
      // Build comprehensive order item list
      const orderItems = [
        { ...product, quantity, isMain: true },
        ...selectedAdditionalArt.map(item => ({ ...item, quantity: 1, isAdditional: true }))
      ];

      // Create order object carrying all products
      const buyNowOrder = {
        type: 'buynow',
        product: product,
        items: orderItems,
        selectedAdditionalArt,
        quantity: quantity + selectedAdditionalArt.length,
        customerDetails: formData,
        pricing: {
          productPrice,
          mainSubtotal,
          additionalSubtotal,
          subtotal,
          tax,
          discount,
          deliveryFee,
          totalAmount
        },
        createdAt: new Date().toISOString()
      };

      // Store in sessionStorage for payment page
      sessionStorage.setItem('buyNowOrder', JSON.stringify(buyNowOrder));

      setIsSubmitting(false);

      // Navigate to payment page
      navigate('/payment', { state: { order: buyNowOrder } });
    }, 800);
  };

  if (!product) {
    return (
      <div className="buynow-checkout-page">
        <Navbar cartCount={cartCount} />
        <section className="checkout-content">
          <div className="container">
            <p>Loading product...</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="buynow-checkout-page">
      <Navbar cartCount={cartCount} />

      <section className="checkout-header">
        <div className="container">
          <h1>Order Summary</h1>
          <p>Review product and enter your details</p>
        </div>
      </section>

      <section className="checkout-content">
        <div className="container checkout-layout">
          {/* Left: Product & Form */}
          <div className="checkout-main">
            {/* Product Details Card */}
            <div className="checkout-card buynow-product-card">
              <h2>Product Details</h2>
              
              <div className="product-display">
                <div className="buynow-image-wrapper">
                  <img 
                    src={`/${product.image}`} 
                    alt={product.title}
                    className="buynow-product-image"
                  />
                </div>

                <div className="buynow-details-info">
                  <h3 className="product-name">{product.title}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-material">
                    <strong>Material:</strong> {product.material}
                  </p>
                  <p className="product-description">{product.description}</p>
                  
                  <div className="price-per-unit">
                    <span className="label">Price per unit:</span>
                    <span className="price">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Quantity Selector */}
                  <div className="quantity-selector">
                    <label>Quantity:</label>
                    <div className="quantity-controls">
                      <button 
                        className="qty-btn"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity === 1}
                      >
                        −
                      </button>
                      <input 
                        type="number" 
                        value={quantity} 
                        readOnly 
                        className="qty-input"
                      />
                      <button 
                        className="qty-btn"
                        onClick={() => handleQuantityChange(1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Your Collection (Mobile Add More Art Section) */}
            <div className="checkout-card complete-collection-card">
              <div className="collection-header">
                <span className="collection-badge">Complete Your Collection</span>
                <h2 className="collection-title">Add More Art ✨</h2>
                <p className="collection-subtitle">Pick companion artworks to build your personal art collection</p>
              </div>

              <div className="suggested-art-grid">
                {suggestedArtworks.map((art) => {
                  const isSelected = selectedAdditionalArt.some(item => item.id === art.id);
                  return (
                    <div
                      key={art.id}
                      className={`suggested-art-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleToggleAdditional(art)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleToggleAdditional(art);
                        }
                      }}
                    >
                      <div className="suggested-art-media">
                        <img src={`/${art.image}`} alt={art.title} className="suggested-art-img" />
                      </div>
                      <div className="suggested-art-details">
                        <div className="suggested-art-main">
                          <h4 className="suggested-art-title">{art.title}</h4>
                          <span className="suggested-art-cat">{art.category}</span>
                        </div>
                        <div className="suggested-art-action">
                          <span className="suggested-art-price">₹{art.price.toLocaleString('en-IN')}</span>
                          <button
                            type="button"
                            className={`art-select-toggle-btn ${isSelected ? 'active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleAdditional(art);
                            }}
                            aria-label={isSelected ? `Remove ${art.title}` : `Add ${art.title}`}
                          >
                            {isSelected ? '✓ Added' : '+ Add'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="checkout-card customer-card">
              <h2>Customer Details</h2>
              
              <form onSubmit={handleContinue} className="customer-form">
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={errors.fullName ? 'input-error' : ''}
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                {/* Mobile Number */}
                <div className="form-group">
                  <label htmlFor="mobileNumber">Mobile Number *</label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className={errors.mobileNumber ? 'input-error' : ''}
                  />
                  {errors.mobileNumber && <span className="error-message">{errors.mobileNumber}</span>}
                </div>

                {/* Address */}
                <div className="form-group">
                  <label htmlFor="address">Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address"
                    rows="3"
                    className={errors.address ? 'input-error' : ''}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                {/* Pincode */}
                <div className="form-group">
                  <label htmlFor="pincode">Pincode *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit pincode"
                    className={errors.pincode ? 'input-error' : ''}
                  />
                  {errors.pincode && <span className="error-message">{errors.pincode}</span>}
                </div>

                {/* Continue Button */}
                <button 
                  type="submit"
                  className="btn btn-primary continue-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : `Continue (₹${totalAmount.toLocaleString('en-IN')})`}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Price Breakdown */}
          <aside className="checkout-summary">
            <div className="summary-card">
              <h3>Price Details</h3>

              {/* Main Artwork */}
              <div className="price-row main-art-row">
                <span className="label">
                  <strong className="main-art-badge">Main</strong> {product.title}
                </span>
                <span className="value">₹{mainSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {/* Additional Selected Artworks */}
              {selectedAdditionalArt.map(art => (
                <div key={art.id} className="price-row additional-art-row">
                  <span className="label">
                    <span className="plus-symbol">+</span> {art.title}
                  </span>
                  <span className="value">₹{art.price.toLocaleString('en-IN')}</span>
                </div>
              ))}

              {/* Quantity indicator if only main product */}
              {selectedAdditionalArt.length === 0 && (
                <div className="price-row">
                  <span className="label">Quantity</span>
                  <span className="value">{quantity}</span>
                </div>
              )}

              <div className="price-row">
                <span className="label">Subtotal</span>
                <span className="value">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="price-row tax-row">
                <span className="label">Tax (5%)</span>
                <span className="value">₹{tax.toLocaleString('en-IN')}</span>
              </div>

              {discount > 0 && (
                <div className="price-row discount-row">
                  <span className="label">Discount</span>
                  <span className="value discount">−₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="price-row delivery-row">
                <span className="label">Delivery Fee</span>
                <span className="value">₹{deliveryFee.toLocaleString('en-IN')}</span>
              </div>

              <div className="price-row total-row">
                <span className="label total-label">Total Amount</span>
                <span className="value total-value">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="price-summary-note">
                <p>📦 Delivery available across India</p>
                <p>💳 Multiple payment options at checkout</p>
              </div>

              {/* Continue Button (Mobile) */}
              <button 
                type="submit"
                className="btn btn-primary continue-btn-mobile"
                onClick={handleContinue}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : `Continue (₹${totalAmount.toLocaleString('en-IN')})`}
              </button>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default BuyNowCheckout;

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Payment.css';

/**
 * 5 Commonly Used Banks for Demo Selection (Phase 9)
 */
const BANK_OPTIONS = [
  { id: 'sbi', name: 'State Bank of India (SBI)', code: 'SBIN' },
  { id: 'hdfc', name: 'HDFC Bank', code: 'HDFC' },
  { id: 'icici', name: 'ICICI Bank', code: 'ICIC' },
  { id: 'axis', name: 'Axis Bank', code: 'UTIB' },
  { id: 'canara', name: 'Canara Bank', code: 'CNRB' }
];

/**
 * Payment Page Component - Phase 9 (Bank Selection, Simulated Mobile Payment & Order Confirmation)
 * 
 * Flow:
 * 1. Receives order details from Checkout (Buy Now or Cart)
 * 2. Displays full Order Summary:
 *    - Product image, product name, quantity
 *    - Subtotal, Tax, Delivery Fee, Discount, Final Total Amount
 * 3. Bank Selection:
 *    - "Select Bank" dropdown with 5 popular banks
 * 4. Mobile Payment Request Simulation:
 *    - Displays selected bank name
 *    - Displays registered customer mobile number (masked: ******1234)
 *    - Displays simulated payment request message & amount
 * 5. Safe Demo Flow:
 *    - "Confirm Demo Payment" button (No OTP/PIN/Password requested)
 *    - Simulated processing state
 * 6. Order Confirmation Screen:
 *    - Success message
 *    - Generated Order ID
 *    - Product image & name
 *    - Quantity & Final Amount
 *    - Selected Bank
 *    - Masked customer mobile number
 *    - "Back to Home" button
 */
function Payment({ cartCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [order, setOrder] = useState(null);
  const [selectedBank, setSelectedBank] = useState('');
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('form'); // 'form' | 'success'
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Retrieve order from route state or sessionStorage
    if (location.state?.order) {
      setOrder(location.state.order);
    } else {
      const savedBuyNow = sessionStorage.getItem('buyNowOrder');
      const savedCartOrder = sessionStorage.getItem('cartOrder');
      const savedData = savedBuyNow || savedCartOrder;

      if (savedData) {
        try {
          setOrder(JSON.parse(savedData));
        } catch (error) {
          navigate('/shop');
        }
      } else {
        // Fallback to shop if no order found
        navigate('/shop');
      }
    }
  }, [location, navigate]);

  // Extract order parameters safely
  const isSingleProduct = !order?.items || order?.product;
  const product = order?.product || (order?.items && order.items[0]);
  const productName = order?.product?.title || 
    (order?.items ? order.items.map(i => `${i.title} (x${i.quantity})`).join(', ') : 'Handmade Artwork');

  const quantity = order?.quantity || 
    (order?.items ? order.items.reduce((total, i) => total + (i.quantity || 1), 0) : 1);

  const subtotal = order?.pricing?.subtotal ?? order?.subtotal ?? (product?.price ? product.price * quantity : 0);
  const tax = order?.pricing?.tax ?? order?.tax ?? Math.round(subtotal * 0.05);
  const deliveryFee = order?.pricing?.deliveryFee ?? order?.deliveryFee ?? (order?.shipping ?? 49);
  const discount = order?.pricing?.discount ?? order?.discount ?? 0;
  const totalAmount = order?.pricing?.totalAmount ?? order?.total ?? order?.totalAmount ?? (subtotal + tax + deliveryFee - discount);

  const customerName = order?.customerDetails?.fullName || order?.customerName || 'Art Lover';
  const rawMobileNumber = order?.customerDetails?.mobileNumber || order?.phone || '9876541234';
  const customerAddress = order?.customerDetails?.address || (order?.shippingAddress ? `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.postalCode}` : 'Delivery Address Provided');
  const customerPincode = order?.customerDetails?.pincode || order?.shippingAddress?.postalCode || '';

  // Mask mobile number (e.g., 9876541234 -> ******1234)
  const getMaskedMobile = (phone) => {
    if (!phone) return '******1234';
    const digits = phone.toString().replace(/\D/g, '');
    if (digits.length >= 4) {
      return `******${digits.slice(-4)}`;
    }
    return '******1234';
  };

  const maskedMobile = getMaskedMobile(rawMobileNumber);

  const handleBankChange = (e) => {
    const value = e.target.value;
    setSelectedBank(value);
    if (errors.selectedBank) {
      setErrors(prev => ({ ...prev, selectedBank: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedBank) {
      newErrors.selectedBank = 'Please select a bank to proceed with the simulated payment';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate Payment Authorization & Processing (1.6 seconds)
    setTimeout(() => {
      // Dynamically generate unique Order ID on the frontend
      const generatedOrderId = `AB-ORD-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

      const itemsList = order?.items || [{ ...product, quantity }];

      const finalOrder = {
        id: generatedOrderId,
        orderId: generatedOrderId,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        orderDate: new Date().toISOString(),
        customerName,
        phone: rawMobileNumber,
        maskedMobile,
        email: order?.email || 'customer@artbreather.com',
        customerDetails: {
          fullName: customerName,
          mobileNumber: rawMobileNumber,
          maskedMobile,
          address: customerAddress,
          pincode: customerPincode
        },
        shippingAddress: order?.shippingAddress || {
          street: customerAddress,
          city: '',
          state: '',
          postalCode: customerPincode,
          country: 'India'
        },
        items: itemsList,
        product,
        productName,
        quantity,
        subtotal,
        tax,
        deliveryFee,
        discount,
        total: totalAmount,
        totalAmount,
        pricing: {
          productPrice: product?.price || 0,
          subtotal,
          tax,
          discount,
          deliveryFee,
          totalAmount
        },
        paymentMethod: 'Simulated Net Banking / Mobile Request',
        selectedBank,
        status: 'confirmed',
        estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      };

      // Store in localStorage for persistence and receipt retrieval
      localStorage.setItem('lastOrder', JSON.stringify(finalOrder));

      // Clear session storages and cart
      sessionStorage.removeItem('buyNowOrder');
      sessionStorage.removeItem('cartOrder');
      localStorage.removeItem('artBreatherCart');

      setConfirmedOrder(finalOrder);
      setIsProcessing(false);
      setPaymentStatus('success');

      window.scrollTo(0, 0);
    }, 1600);
  };

  if (!order) {
    return (
      <div className="payment-page">
        <Navbar cartCount={cartCount} />
        <section className="payment-content">
          <div className="container text-center py-5">
            <p>Loading order details...</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // =========================================================================
  // SUCCESS / ORDER CONFIRMATION SCREEN (Phase 9)
  // =========================================================================
  if (paymentStatus === 'success' && confirmedOrder) {
    return (
      <div className="payment-page payment-confirmation-view">
        <Navbar cartCount={0} />

        <section className="confirmation-hero">
          <div className="container">
            <div className="confirmation-card">
              {/* Success Badge & Animation */}
              <div className="success-icon-wrapper">
                <div className="success-pulse-ring"></div>
                <div className="success-check-icon">✓</div>
              </div>

              <span className="confirmation-badge">Payment Successful</span>
              <h1 className="confirmation-title">Order Confirmed! 🎉</h1>
              <p className="confirmation-subtitle">
                Thank you, <strong>{confirmedOrder.customerName}</strong>! Your authentic handmade artwork order has been placed.
              </p>

              {/* Order ID Banner */}
              <div className="order-id-pill">
                <span className="order-id-label">ORDER ID:</span>
                <strong className="order-id-value">{confirmedOrder.id}</strong>
              </div>

              {/* Confirmation Details Card */}
              <div className="order-summary-box">
                <h3 className="summary-box-heading">Order & Payment Confirmation</h3>

                {/* Product Detail in Confirmation */}
                <div className="confirmation-product-row">
                  {product?.image && (
                    <div className="confirm-img-wrapper">
                      <img
                        src={`/${product.image}`}
                        alt={confirmedOrder.productName}
                        className="confirm-product-img"
                      />
                    </div>
                  )}
                  <div className="confirm-product-info">
                    <h4 className="confirm-product-title">{confirmedOrder.productName}</h4>
                    <p className="confirm-product-meta">
                      {product?.category && <span className="meta-tag">{product.category}</span>}
                      {product?.material && <span className="meta-tag">{product.material}</span>}
                    </p>
                    <p className="confirm-qty">Quantity: <strong>{confirmedOrder.quantity}</strong></p>
                  </div>
                </div>

                {/* Key Confirmation Details Table (Requirement 10) */}
                <div className="confirmation-details-table">
                  <div className="confirm-row">
                    <span className="confirm-label">Product Name</span>
                    <span className="confirm-value">{confirmedOrder.productName}</span>
                  </div>
                  <div className="confirm-row">
                    <span className="confirm-label">Quantity</span>
                    <span className="confirm-value">{confirmedOrder.quantity} item{confirmedOrder.quantity > 1 ? 's' : ''}</span>
                  </div>
                  <div className="confirm-row">
                    <span className="confirm-label">Selected Bank</span>
                    <span className="confirm-value bank-highlight">🏦 {confirmedOrder.selectedBank}</span>
                  </div>
                  <div className="confirm-row">
                    <span className="confirm-label">Registered Mobile</span>
                    <span className="confirm-value">📱 {confirmedOrder.maskedMobile}</span>
                  </div>
                  <div className="confirm-row">
                    <span className="confirm-label">Order Date</span>
                    <span className="confirm-value">{confirmedOrder.date}</span>
                  </div>
                  <div className="confirm-row">
                    <span className="confirm-label">Estimated Delivery</span>
                    <span className="confirm-value delivery-highlight">📦 {confirmedOrder.estimatedDelivery}</span>
                  </div>
                  <div className="confirm-row total-highlight-row">
                    <span className="confirm-label">Final Amount Paid</span>
                    <span className="confirm-value price-gold">₹{confirmedOrder.totalAmount}</span>
                  </div>
                </div>

                {/* Delivery Address Details */}
                <div className="confirm-shipping-note">
                  <p><strong>📍 Delivering To:</strong> {confirmedOrder.customerDetails?.address || customerAddress} {customerPincode ? `(${customerPincode})` : ''}</p>
                </div>
              </div>

              {/* Action Buttons (Requirement 10: Back to Home button) */}
              <div className="confirmation-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-home"
                  onClick={() => navigate('/')}
                >
                  🏠 Back to Home
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => navigate('/shop')}
                >
                  🎨 Explore More Artworks
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => window.print()}
                >
                  🖨️ Print Receipt
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // =========================================================================
  // PAYMENT FORM & ORDER SUMMARY SCREEN (Phase 9)
  // =========================================================================
  return (
    <div className="payment-page">
      <Navbar cartCount={cartCount} />

      {/* Header */}
      <section className="payment-header">
        <div className="container">
          <h1>Payment & Checkout</h1>
          <p>Select your bank to simulate the demo payment request</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="payment-content">
        <div className="container payment-layout">
          {/* Left Column: Bank Selection & Simulated Mobile Payment */}
          <div className="payment-main">
            <div className="payment-card">
              <div className="payment-card-header">
                <h2>Payment Method</h2>
                <span className="payment-mode-tag">DEMO SIMULATION</span>
              </div>

              {/* Bank Selection Form (Requirement 3) */}
              <form onSubmit={handlePaymentSubmit} className="payment-form">
                <div className="form-group">
                  <label htmlFor="bankSelect" className="field-label">
                    Select Bank *
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="bankSelect"
                      name="bankSelect"
                      value={selectedBank}
                      onChange={handleBankChange}
                      className={`bank-select ${errors.selectedBank ? 'input-error' : ''}`}
                      disabled={isProcessing}
                      autoFocus
                    >
                      <option value="">-- Choose your bank --</option>
                      {BANK_OPTIONS.map((bank) => (
                        <option key={bank.id} value={bank.name}>
                          {bank.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.selectedBank && (
                    <span className="error-message">{errors.selectedBank}</span>
                  )}
                  <p className="form-hint">
                    💡 Select one of the 5 demo banking partners to simulate the payment request.
                  </p>
                </div>

                {/* Mobile Payment Request Simulation (Requirement 4) */}
                {selectedBank && (
                  <div className="simulated-payment-request-card">
                    <div className="request-card-header">
                      <div className="bank-pill">
                        <span className="bank-icon">🏦</span>
                        <span className="bank-title">Selected Bank: <strong>{selectedBank}</strong></span>
                      </div>
                    </div>

                    <div className="request-card-body">
                      <div className="request-title-row">
                        <span className="req-icon">📱</span>
                        <span className="req-heading">Payment Request</span>
                      </div>

                      <div className="req-amount-badge">
                        <span className="amt-label">Amount:</span>
                        <span className="amt-value">₹{totalAmount}</span>
                      </div>

                      <p className="req-description">
                        A payment request of <strong>₹{totalAmount}</strong> has been simulated for your registered mobile number <strong>{maskedMobile}</strong>.
                      </p>

                      <div className="demo-safety-note">
                        <span className="shield-icon">🛡️</span>
                        <span>
                          <strong>Frontend-only demo:</strong> No real money will be charged, no SMS is sent, and no PIN/OTP is required.
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Processing State Indicator (Requirement 5) */}
                {isProcessing && (
                  <div className="payment-processing-banner">
                    <div className="processing-spinner"></div>
                    <div className="processing-text">
                      <h4>Payment Processing...</h4>
                      <p>Simulating secure authorization with {selectedBank || 'Bank'}. Please wait...</p>
                    </div>
                  </div>
                )}

                {/* Place Order Button (Priority 4) */}
                <button
                  type="submit"
                  className="btn btn-primary pay-btn"
                  disabled={isProcessing}
                >
                  {isProcessing ? '⏳ Processing Order...' : `Place Order (₹${totalAmount})`}
                </button>

                {/* Back Button */}
                <button
                  type="button"
                  className="btn btn-outline cancel-btn"
                  onClick={() => navigate(-1)}
                  disabled={isProcessing}
                >
                  ← Back to Checkout
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Complete Order Summary (Requirement 3 & 8) & Contact Support */}
          <aside className="payment-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>

              {/* Product Preview */}
              {product && (
                <div className="summary-product-card">
                  {product.image && (
                    <div className="summary-product-image">
                      <img
                        src={`/${product.image}`}
                        alt={product.title}
                        className="product-img"
                      />
                    </div>
                  )}

                  <div className="summary-product-header">
                    <h4 className="summary-product-name">{productName}</h4>
                    {product.category && <span className="summary-badge">{product.category}</span>}
                  </div>
                  {product.material && (
                    <p className="summary-material">
                      <strong>Material:</strong> {product.material}
                    </p>
                  )}
                </div>
              )}

              {/* Item & Price Breakdown (All required summary items) */}
              <div className="price-breakdown-list">
                <div className="breakdown-item">
                  <span className="item-label">Product</span>
                  <span className="item-value">{productName}</span>
                </div>

                <div className="breakdown-item">
                  <span className="item-label">Quantity</span>
                  <span className="item-value">{quantity} item{quantity > 1 ? 's' : ''}</span>
                </div>

                <div className="breakdown-item">
                  <span className="item-label">Subtotal</span>
                  <span className="item-value">₹{subtotal}</span>
                </div>

                <div className="breakdown-item">
                  <span className="item-label">Tax (5%)</span>
                  <span className="item-value">₹{tax}</span>
                </div>

                <div className="breakdown-item">
                  <span className="item-label">Delivery Fee</span>
                  <span className="item-value">
                    {deliveryFee === 0 ? <span className="free-delivery">FREE</span> : `₹${deliveryFee}`}
                  </span>
                </div>

                <div className="breakdown-item">
                  <span className="item-label">Discount</span>
                  <span className="item-value discount-value">
                    {discount > 0 ? `−₹${discount}` : '₹0'}
                  </span>
                </div>

                {/* Final Total Amount */}
                <div className="breakdown-item grand-total-item">
                  <span className="item-label total-label">Final Total Amount</span>
                  <span className="item-value total-value">₹{totalAmount}</span>
                </div>
              </div>

              {/* Customer & Delivery Summary */}
              <div className="delivery-destination-box">
                <p className="dest-title">📦 <strong>Shipping Destination:</strong></p>
                <p className="dest-name">{customerName} ({maskedMobile})</p>
                <p className="dest-address">{customerAddress}</p>
                <p className="dest-eta">🕒 <strong>Est. Delivery:</strong> 3-5 business days</p>
              </div>

              {/* Security Feature Highlights */}
              <div className="payment-benefits">
                <h4>✨ 100% Safe Demo Experience</h4>
                <ul>
                  <li>No real bank account or card required</li>
                  <li>No PIN, OTP, or passwords collected</li>
                  <li>Simulated instant order confirmation</li>
                </ul>
              </div>
            </div>

            {/* Contact & Social Section (Priority 5) */}
            <div className="contact-social-card">
              <div className="contact-card-header">
                <span className="contact-badge-icon">🎨</span>
                <div className="contact-header-text">
                  <h4>Artist & Store Contact</h4>
                  <p>Reach out directly for custom commissions or support:</p>
                </div>
              </div>

              <div className="contact-social-grid">
                {/* Phone */}
                <a href="tel:8438940851" className="contact-social-item phone-link" title="Call 8438940851">
                  <div className="contact-icon-bubble phone-icon">📞</div>
                  <div className="contact-item-info">
                    <span className="contact-type-label">CONTACT</span>
                    <span className="contact-data-value">8438940851</span>
                  </div>
                  <span className="contact-arrow">↗</span>
                </a>

                {/* Email */}
                <a href="mailto:arunkumarpalanivel1183@gmail.com" className="contact-social-item email-link" title="Send Email">
                  <div className="contact-icon-bubble email-icon">✉️</div>
                  <div className="contact-item-info">
                    <span className="contact-type-label">EMAIL</span>
                    <span className="contact-data-value">arunkumarpalanivel1183@gmail.com</span>
                  </div>
                  <span className="contact-arrow">↗</span>
                </a>

                {/* WhatsApp */}
                <a href="https://wa.me/918438940851" target="_blank" rel="noopener noreferrer" className="contact-social-item whatsapp-link" title="WhatsApp 8438940851">
                  <div className="contact-icon-bubble whatsapp-icon">💬</div>
                  <div className="contact-item-info">
                    <span className="contact-type-label">WHATSAPP</span>
                    <span className="contact-data-value">8438940851</span>
                  </div>
                  <span className="contact-arrow">↗</span>
                </a>

                {/* Instagram */}
                <a href="https://www.instagram.com/past_breather._/" target="_blank" rel="noopener noreferrer" className="contact-social-item instagram-link" title="Instagram past_breather._">
                  <div className="contact-icon-bubble instagram-icon">📸</div>
                  <div className="contact-item-info">
                    <span className="contact-type-label">INSTAGRAM</span>
                    <span className="contact-data-value">past_breather._</span>
                  </div>
                  <span className="contact-arrow">↗</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Payment;

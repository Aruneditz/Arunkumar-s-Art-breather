import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './OrderSuccess.css';

/**
 * OrderSuccess Page Component
 * 
 * Displays after successful order placement:
 * - Order confirmation message
 * - Order ID and date
 * - Customer information
 * - Order details (items, amounts)
 * - Shipping address
 * - Estimated delivery
 * - Action buttons (continue shopping, track order)
 * 
 * Features:
 * - Retrieves order data from localStorage or navigation state
 * - Celebratory animations
 * - Print order receipt functionality
 * - Download invoice (placeholder)
 * 
 * React Concepts Used:
 * - useEffect: To retrieve order data
 * - useNavigate: For navigation
 * - useState: For managing UI state
 * - Conditional rendering
 */
function OrderSuccess({ cartCount = 0 }) {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve order from localStorage
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
      // Clear cart after successful order
      localStorage.removeItem('artBreatherCart');
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="order-success-page">
        <Navbar cartCount={cartCount} />
        <section className="order-success-content">
          <div className="container">
            <p>Loading order details...</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-success-page">
        <Navbar cartCount={cartCount} />
        <section className="order-success-content">
          <div className="container">
            <div className="order-error">
              <h2>Order Not Found</h2>
              <p>We couldn't find your order details. Please try again.</p>
              <button className="btn btn-primary" onClick={() => navigate('/')}>
                Back to Home
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    alert('Invoice download feature will be available soon!');
  };

  return (
    <div className="order-success-page">
      <Navbar cartCount={cartCount} />

      {/* Success Header */}
      <section className="success-hero">
        <div className="container">
          <div className="success-animation">
            <div className="checkmark-circle">
              <svg viewBox="0 0 52 52" className="checkmark">
                <circle cx="26" cy="26" r="25" fill="none" />
                <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <h1 className="success-title">Order Confirmed!</h1>
          <p className="success-subtitle">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <p className="order-id-display">
            Order ID: <strong>{order.id}</strong>
          </p>
        </div>
      </section>

      {/* Order Details */}
      <section className="order-details-content">
        <div className="container order-details-grid">
          {/* Left: Order Information */}
          <div className="order-details-panel">
            {/* Order Header */}
            <div className="order-info-card">
              <h2>Order Information</h2>
              <div className="info-row">
                <span className="label">Order ID:</span>
                <span className="value">{order.id}</span>
              </div>
              <div className="info-row">
                <span className="label">Order Date:</span>
                <span className="value">{order.date}</span>
              </div>
              <div className="info-row">
                <span className="label">Status:</span>
                <span className="value status-badge processing">Processing</span>
              </div>
              <div className="info-row">
                <span className="label">Estimated Delivery:</span>
                <span className="value">5-7 business days</span>
              </div>
            </div>

            {/* Customer Information */}
            <div className="order-info-card">
              <h2>Customer Information</h2>
              <div className="info-row">
                <span className="label">Name:</span>
                <span className="value">{order.customerName}</span>
              </div>
              <div className="info-row">
                <span className="label">Email:</span>
                <span className="value">{order.email}</span>
              </div>
              <div className="info-row">
                <span className="label">Phone:</span>
                <span className="value">{order.phone}</span>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="order-info-card">
              <h2>Shipping Address</h2>
              <div className="address-block">
                <p>{order.customerName || order.customerDetails?.fullName}</p>
                <p>{order.shippingAddress?.street || order.customerDetails?.address}</p>
                {(order.shippingAddress?.city || order.shippingAddress?.state || order.shippingAddress?.postalCode) && (
                  <p>
                    {order.shippingAddress.city ? `${order.shippingAddress.city}, ` : ''}
                    {order.shippingAddress.state ? `${order.shippingAddress.state} ` : ''}
                    {order.shippingAddress.postalCode || ''}
                  </p>
                )}
                <p>{order.shippingAddress?.country || 'India'}</p>
              </div>
            </div>

            {/* Billing Address (if different) */}
            {order.billingAddress && (
              <div className="order-info-card">
                <h2>Billing Address</h2>
                <div className="address-block">
                  <p>{order.customerName || order.customerDetails?.fullName}</p>
                  <p>{order.billingAddress.street}</p>
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.postalCode}
                  </p>
                  <p>{order.billingAddress.country}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="order-actions">
              <button className="btn btn-primary full-width" onClick={handlePrintReceipt}>
                🖨️ Print Receipt
              </button>
              <button className="btn btn-secondary full-width" onClick={handleDownloadInvoice}>
                📥 Download Invoice
              </button>
            </div>
          </div>

          {/* Right: Order Items & Summary */}
          <aside className="order-summary-panel">
            {/* Items */}
            <div className="order-items-card">
              <h2>Order Items ({(order.items || [order.product]).filter(Boolean).length})</h2>
              {(order.items || [order.product]).filter(Boolean).map((item, idx) => (
                <div key={item.id || idx} className="order-item">
                  <div className="item-image-wrap">
                    <img src={`/${item.image}`} alt={item.title} className="item-image" />
                  </div>
                  <div className="item-details">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-category">{item.category}</p>
                    <p className="item-qty">Quantity: {item.quantity || order.quantity || 1}</p>
                  </div>
                  <div className="item-price-wrap">
                    <p className="unit-price">₹{item.price}</p>
                    <p className="total-price">₹{item.price * (item.quantity || order.quantity || 1)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="order-total-card">
              <h2>Order Total</h2>
              <div className="total-breakdown">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal || order.pricing?.subtotal || 0}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span>₹{order.shipping ?? order.deliveryFee ?? order.pricing?.deliveryFee ?? 49}</span>
                </div>
                {order.tax && (
                  <div className="total-row">
                    <span>Tax (5%)</span>
                    <span>₹{order.tax}</span>
                  </div>
                )}
                <div className="total-row grand-total">
                  <span>Total Amount</span>
                  <span>₹{order.total || order.totalAmount || order.pricing?.totalAmount || 0}</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="next-steps-card">
              <h3>What's Next?</h3>
              <div className="steps-list">
                <div className="step">
                  <span className="step-number">1</span>
                  <span className="step-text">Confirmation email sent to {order.email}</span>
                </div>
                <div className="step">
                  <span className="step-number">2</span>
                  <span className="step-text">Order processing (1-2 business days)</span>
                </div>
                <div className="step">
                  <span className="step-number">3</span>
                  <span className="step-text">Shipped to your address</span>
                </div>
                <div className="step">
                  <span className="step-number">4</span>
                  <span className="step-text">Delivered (5-7 business days)</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Call to Action */}
      <section className="order-cta-section">
        <div className="container">
          <h2>Thank you for supporting handmade art! 🎨</h2>
          <p>
            We're carefully preparing your beautiful artworks for shipment. 
            Track your order via email or return to explore more creations.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={() => navigate('/shop')}>
              Continue Shopping
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default OrderSuccess;

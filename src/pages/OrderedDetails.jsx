import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './OrderedDetails.css';

/**
 * Ordered Details / My Orders Page Component
 * 
 * Displays:
 * - List of all past orders placed by the customer
 * - Complete order details: Order ID, items, images, titles, quantity, prices, totals
 * - Order date & time
 * - Status badge
 * - Interactive Simulated Arrival & Delivery Details tracker (5 steps):
 *    1. Order Confirmed ✓
 *    2. Packed & Verified ✓
 *    3. Shipped & In Transit → (Active)
 *    4. Out for Delivery
 *    5. Delivered
 *    Demo Arrival: In 2-3 working days
 * - Empty state with Shop CTA button
 */
function OrderedDetails({ cartCount = 0 }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Retrieve full order history from localStorage
    try {
      const storedHistory = localStorage.getItem('artBreatherOrders');
      let parsedOrders = storedHistory ? JSON.parse(storedHistory) : [];

      // Fallback: If no order history array but lastOrder exists, incorporate it
      if (parsedOrders.length === 0) {
        const lastOrderRaw = localStorage.getItem('lastOrder');
        if (lastOrderRaw) {
          const singleOrder = JSON.parse(lastOrderRaw);
          parsedOrders = [singleOrder];
          localStorage.setItem('artBreatherOrders', JSON.stringify(parsedOrders));
        }
      }

      setOrders(parsedOrders);

      // Automatically expand the first (most recent) order by default
      if (parsedOrders.length > 0) {
        const initialExpanded = {};
        parsedOrders.forEach((o, index) => {
          initialExpanded[o.id || o.orderId || index] = index === 0;
        });
        setExpandedOrders(initialExpanded);
      }
    } catch (err) {
      console.error('Error loading orders:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  // Order Cancellation Handlers
  const handlePromptCancel = (orderId, e) => {
    if (e) e.stopPropagation();
    setCancellingOrderId(orderId);
  };

  const handleKeepOrder = (e) => {
    if (e) e.stopPropagation();
    setCancellingOrderId(null);
  };

  const handleConfirmCancel = (targetOrderId, e) => {
    if (e) e.stopPropagation();
    try {
      const updatedOrders = orders.filter((o, idx) => {
        const currentId = o.id || o.orderId || `AB-ORD-${idx + 1}`;
        return currentId !== targetOrderId;
      });

      setOrders(updatedOrders);
      localStorage.setItem('artBreatherOrders', JSON.stringify(updatedOrders));

      // Synchronize lastOrder in localStorage if the cancelled order was the latest
      const lastOrderRaw = localStorage.getItem('lastOrder');
      if (lastOrderRaw) {
        try {
          const lastOrder = JSON.parse(lastOrderRaw);
          const lastOrderId = lastOrder.id || lastOrder.orderId;
          if (lastOrderId === targetOrderId) {
            if (updatedOrders.length > 0) {
              localStorage.setItem('lastOrder', JSON.stringify(updatedOrders[0]));
            } else {
              localStorage.removeItem('lastOrder');
            }
          }
        } catch (syncErr) {
          console.error('Error syncing lastOrder:', syncErr);
        }
      }
    } catch (err) {
      console.error('Error cancelling order:', err);
    } finally {
      setCancellingOrderId(null);
    }
  };

  // Helper to extract items array safely
  const getOrderItems = (order) => {
    if (order.items && Array.isArray(order.items) && order.items.length > 0) {
      return order.items;
    }
    if (order.product) {
      return [{
        ...order.product,
        quantity: order.quantity || 1
      }];
    }
    return [];
  };

  // Helper to format date cleanly
  const formatOrderDate = (order) => {
    if (order.date) return order.date;
    if (order.orderDate) {
      try {
        return new Date(order.orderDate).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (e) {
        return 'Recently';
      }
    }
    return 'Recently';
  };

  return (
    <div className="ordered-details-page">
      <Navbar cartCount={cartCount} />

      {/* Page Header */}
      <section className="ordered-details-header">
        <div className="container">
          <div className="header-breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link to="/account" className="breadcrumb-link">Account</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">My Orders</span>
          </div>
          <h1 className="ordered-page-title">
            <span className="title-icon">📦</span> My Orders & Arrival Details
          </h1>
          <p className="ordered-page-subtitle">
            Track your original artworks, delivery milestones, and order history.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="ordered-details-content">
        <div className="container">
          {loading ? (
            <div className="orders-loading">
              <div className="loading-spinner"></div>
              <p>Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            /* Empty State */
            <div className="orders-empty-state">
              <div className="empty-state-icon-wrapper">
                <span className="empty-state-icon">🎨</span>
              </div>
              <h2>No active orders yet</h2>
              <p>
                Your collection is waiting to bloom. Discover our curated collection
                of handmade acrylic paintings, delicate pencil sketches, and creative bookmarks!
              </p>
              <div className="empty-state-actions">
                <button 
                  className="btn btn-primary explore-art-btn"
                  onClick={() => navigate('/shop')}
                >
                  ✨ Explore & Shop Art
                </button>
                <button 
                  className="btn btn-outline home-btn"
                  onClick={() => navigate('/')}
                >
                  Return to Home
                </button>
              </div>
            </div>
          ) : (
            /* Orders Listing */
            <div className="orders-list">
              <div className="orders-summary-bar">
                <span className="orders-count-badge">
                  {orders.length} Order{orders.length !== 1 ? 's' : ''} Placed
                </span>
                <span className="orders-help-note">
                  Click any order to view or hide live arrival progress
                </span>
              </div>

              {orders.map((order, orderIdx) => {
                const orderId = order.id || order.orderId || `AB-ORD-${orderIdx + 1}`;
                const isExpanded = !!expandedOrders[orderId];
                const items = getOrderItems(order);
                const orderTotal = order.total ?? order.totalAmount ?? order.pricing?.totalAmount ?? 0;
                const formattedDate = formatOrderDate(order);

                return (
                  <div 
                    key={orderId} 
                    className={`order-card ${isExpanded ? 'expanded' : ''}`}
                  >
                    {/* Order Card Header */}
                    <div 
                      className="order-card-header"
                      onClick={() => toggleOrderDetails(orderId)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleOrderDetails(orderId);
                        }
                      }}
                      title="Click to toggle Arrival Details"
                    >
                      <div className="order-header-primary">
                        <div className="order-id-block">
                          <span className="order-id-label">Order ID</span>
                          <span className="order-id-value">#{orderId}</span>
                        </div>
                        <div className="order-date-block">
                          <span className="order-date-label">Placed On</span>
                          <span className="order-date-value">📅 {formattedDate}</span>
                        </div>
                      </div>

                      <div className="order-header-secondary">
                        <span className="order-status-badge in-transit">
                          🚚 In Transit (2-3 Days)
                        </span>
                        <div className="order-total-block">
                          <span className="order-total-label">Total Amount</span>
                          <span className="order-total-value">
                            ₹{Number(orderTotal).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="order-header-actions" onClick={(e) => e.stopPropagation()}>
                          {cancellingOrderId === orderId ? (
                            <div className="cancel-order-confirm-box" role="alert" aria-live="assertive">
                              <span className="confirm-text">Cancel this order?</span>
                              <div className="confirm-btn-group">
                                <button
                                  type="button"
                                  className="btn-keep-order"
                                  onClick={handleKeepOrder}
                                  title="Keep this order"
                                >
                                  Keep Order
                                </button>
                                <button
                                  type="button"
                                  className="btn-confirm-cancel"
                                  onClick={(e) => handleConfirmCancel(orderId, e)}
                                  title="Confirm cancellation"
                                >
                                  Cancel Order
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="btn-cancel-order"
                              onClick={(e) => handlePromptCancel(orderId, e)}
                              aria-label={`Cancel order #${orderId}`}
                              title="Cancel this order"
                            >
                              CANCEL ORDER
                            </button>
                          )}
                          <button 
                            type="button"
                            className="toggle-expand-btn"
                            onClick={() => toggleOrderDetails(orderId)}
                            aria-label={isExpanded ? 'Collapse order details' : 'Expand order details'}
                          >
                            {isExpanded ? 'Hide Tracker ▲' : 'Track Arrival ▼'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Order Products Preview Row */}
                    <div className="order-products-list">
                      {items.map((item, itemIdx) => {
                        const itemPrice = item.price || 0;
                        const itemQty = item.quantity || 1;
                        const itemTotal = itemPrice * itemQty;
                        const itemImage = item.image || (item.images && item.images[0]) || '1 a.jpg';

                        return (
                          <div key={itemIdx} className="order-item-row">
                            <div 
                              className="order-item-image-wrap"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (item.id) navigate(`/product/${item.id}`);
                              }}
                              title={`View ${item.title || 'Artwork'}`}
                            >
                              <img 
                                src={`/${itemImage}`} 
                                alt={item.title || 'Artwork'} 
                                className="order-item-image"
                                loading="lazy"
                              />
                            </div>

                            <div className="order-item-details">
                              <h4 
                                className="order-item-title"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (item.id) navigate(`/product/${item.id}`);
                                }}
                              >
                                {item.title || item.productName || 'Handmade Artwork'}
                              </h4>
                              <div className="order-item-meta">
                                {item.category && (
                                  <span className="item-category-tag">{item.category}</span>
                                )}
                                {item.material && (
                                  <span className="item-material-tag">{item.material}</span>
                                )}
                              </div>
                              <div className="order-item-numbers">
                                <span className="item-unit-price">
                                  ₹{Number(itemPrice).toLocaleString('en-IN')}
                                </span>
                                <span className="item-quantity">× {itemQty}</span>
                                <span className="item-subtotal">
                                  = ₹{Number(itemTotal).toLocaleString('en-IN')}
                                </span>
                              </div>
                            </div>

                            <div className="order-item-actions">
                              {item.id && (
                                <button
                                  type="button"
                                  className="btn-view-art"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/product/${item.id}`);
                                  }}
                                >
                                  View Artwork ↗
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Simulated Arrival & Delivery Details Tracker (Expandable) */}
                    {isExpanded && (
                      <div className="order-expanded-section">
                        {/* Arrival & Delivery Tracker Component */}
                        <div className="delivery-tracker-card">
                          <div className="tracker-card-header">
                            <div className="tracker-header-info">
                              <h3 className="tracker-title">
                                🚀 Simulated Arrival & Delivery Details
                              </h3>
                              <p className="tracker-eta">
                                Estimated Arrival: <strong>In 2–3 working days</strong>
                              </p>
                            </div>
                            <div className="tracker-carrier-badge">
                              <span>ArtBreather Express</span>
                              <small>Tracking: AB-TRK-{orderId.slice(-6)}</small>
                            </div>
                          </div>

                          {/* 5-Step Delivery Timeline */}
                          <div className="delivery-timeline" role="list" aria-label="Delivery progress timeline">
                            {/* Step 1: Order Confirmed */}
                            <div className="timeline-step completed" role="listitem">
                              <div className="step-indicator">
                                <span className="step-icon">✓</span>
                                <div className="step-connector"></div>
                              </div>
                              <div className="step-content">
                                <div className="step-title">Order Confirmed</div>
                                <div className="step-desc">Payment received & order entered in studio queue</div>
                                <div className="step-time">Completed ✓</div>
                              </div>
                            </div>

                            {/* Step 2: Packed */}
                            <div className="timeline-step completed" role="listitem">
                              <div className="step-indicator">
                                <span className="step-icon">✓</span>
                                <div className="step-connector"></div>
                              </div>
                              <div className="step-content">
                                <div className="step-title">Packed & Archival Protected</div>
                                <div className="step-desc">Secured in protective moisture-proof artist packaging</div>
                                <div className="step-time">Completed ✓</div>
                              </div>
                            </div>

                            {/* Step 3: Shipped (Active Step) */}
                            <div className="timeline-step active" role="listitem">
                              <div className="step-indicator">
                                <span className="step-icon">→</span>
                                <div className="step-connector"></div>
                              </div>
                              <div className="step-content">
                                <div className="step-title">Shipped & In Transit</div>
                                <div className="step-desc">Dispatched via ArtBreather Express courier partner</div>
                                <div className="step-time current">Active • In Transit</div>
                              </div>
                            </div>

                            {/* Step 4: Out for Delivery */}
                            <div className="timeline-step pending" role="listitem">
                              <div className="step-indicator">
                                <span className="step-icon">○</span>
                                <div className="step-connector"></div>
                              </div>
                              <div className="step-content">
                                <div className="step-title">Out for Delivery</div>
                                <div className="step-desc">Courier executive will deliver to your doorstep</div>
                                <div className="step-time upcoming">Expected Soon</div>
                              </div>
                            </div>

                            {/* Step 5: Delivered */}
                            <div className="timeline-step pending" role="listitem">
                              <div className="step-indicator">
                                <span className="step-icon">○</span>
                              </div>
                              <div className="step-content">
                                <div className="step-title">Delivered</div>
                                <div className="step-desc">Safe delivery completed with OTP signature</div>
                                <div className="step-time upcoming">2–3 working days</div>
                              </div>
                            </div>
                          </div>

                          <div className="tracker-assurance">
                            <span>🎨 <strong>Handmade Care:</strong> All artworks are hand-handled and inspected before final dispatch.</span>
                          </div>
                        </div>

                        {/* Customer & Address Details Footer */}
                        <div className="order-footer-details">
                          <div className="shipping-info-block">
                            <h4>Delivery Address</h4>
                            <p className="recipient-name">
                              {order.customerName || order.customerDetails?.fullName || 'Art Lover'}
                            </p>
                            <p className="recipient-phone">
                              Phone: {order.maskedMobile || order.phone || '******1234'}
                            </p>
                            <p className="recipient-address">
                              {order.customerDetails?.address || 
                               (order.shippingAddress ? `${order.shippingAddress.street || ''}, ${order.shippingAddress.city || ''} ${order.shippingAddress.postalCode || ''}` : 'Address on file')}
                            </p>
                          </div>

                          <div className="payment-summary-block">
                            <h4>Payment Details</h4>
                            <div className="payment-summary-row">
                              <span>Payment Method:</span>
                              <span>{order.paymentMethod || 'Net Banking'}</span>
                            </div>
                            {order.selectedBank && (
                              <div className="payment-summary-row">
                                <span>Bank:</span>
                                <span>{order.selectedBank}</span>
                              </div>
                            )}
                            <div className="payment-summary-row total">
                              <span>Final Paid:</span>
                              <span className="total-highlight">
                                ₹{Number(orderTotal).toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default OrderedDetails;

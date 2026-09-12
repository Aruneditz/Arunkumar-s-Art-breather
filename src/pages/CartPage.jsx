import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './CartPage.css';

function CartPage({ cartItems = [], cartCount = 0, onUpdateQuantity, onRemove, onClear }) {
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = cartItems.length > 0 ? 49 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <Navbar cartCount={cartCount} />

      <section className="cart-header">
        <div className="container">
          <h1 className="page-title">Your Cart</h1>
          <p className="page-subtitle">
            {cartItems.length > 0
              ? `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} ready for checkout`
              : 'Your cart is empty right now'}
          </p>
        </div>
      </section>

      <section className="cart-content">
        <div className="container cart-layout">
          <div className="cart-items-panel">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Explore our collection and add a few handmade treasures.</p>
                <button className="btn btn-primary" onClick={() => navigate('/shop')}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div 
                    className="cart-item-image-wrap clickable"
                    onClick={() => navigate(`/product/${item.id}`)}
                    title={`View ${item.title} details`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate(`/product/${item.id}`);
                      }
                    }}
                  >
                    <img src={`/${item.image}`} alt={item.title} className="cart-item-image" />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-header">
                      <div>
                        <h3 
                          className="cart-item-title clickable"
                          onClick={() => navigate(`/product/${item.id}`)}
                          title={`View ${item.title} details`}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              navigate(`/product/${item.id}`);
                            }
                          }}
                        >
                          {item.title}
                        </h3>
                        <span className="cart-item-category">{item.category}</span>
                      </div>
                      <button 
                        className="remove-item-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemove(item.id);
                        }}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="cart-item-meta">
                      <span>Material: {item.material}</span>
                    </div>

                    <div className="cart-item-footer">
                      <div className="quantity-control" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                      </div>

                      <div className="cart-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>₹{shipping.toLocaleString('en-IN')}</span>
            </div>

            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>

            <button
              className="btn btn-primary checkout-btn"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>

            {cartItems.length > 0 && (
              <button className="btn btn-secondary clear-btn" onClick={onClear}>
                Clear Cart
              </button>
            )}
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default CartPage;

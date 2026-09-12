import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Checkout.css';

/**
 * Checkout Page Component
 * 
 * Collects customer information for order placement:
 * - Personal Information (Name, Email, Phone)
 * - Shipping Address (Street, City, State, Postal Code, Country)
 * - Billing Address (same as shipping or different)
 * - Order review with cart summary
 * 
 * Features:
 * - Form validation
 * - Billing address toggle
 * - Order summary display
 * - Proceed to payment button
 * 
 * React Concepts Used:
 * - useState: For form state and toggle states
 * - useNavigate: For route navigation
 * - Form handling with controlled inputs
 * - Conditional rendering
 */
function Checkout({ cartItems = [], cartCount = 0, onCheckout }) {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping Address
    shippingStreet: '',
    shippingCity: '',
    shippingState: '',
    shippingPostalCode: '',
    shippingCountry: 'India',
    
    // Billing Address
    billingStreet: '',
    billingCity: '',
    billingState: '',
    billingPostalCode: '',
    billingCountry: 'India'
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = cartItems.length > 0 ? 49 : 0;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate personal info
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) errors.phone = 'Phone must be 10 digits';

    // Validate shipping address
    if (!formData.shippingStreet.trim()) errors.shippingStreet = 'Street address is required';
    if (!formData.shippingCity.trim()) errors.shippingCity = 'City is required';
    if (!formData.shippingState.trim()) errors.shippingState = 'State is required';
    if (!formData.shippingPostalCode.trim()) errors.shippingPostalCode = 'Postal code is required';

    // Validate billing address if different from shipping
    if (!sameAsShipping) {
      if (!formData.billingStreet.trim()) errors.billingStreet = 'Street address is required';
      if (!formData.billingCity.trim()) errors.billingCity = 'City is required';
      if (!formData.billingState.trim()) errors.billingState = 'State is required';
      if (!formData.billingPostalCode.trim()) errors.billingPostalCode = 'Postal code is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Prepare order data for payment
    setTimeout(() => {
      const tax = Math.round(subtotal * 0.05);
      const deliveryFee = shipping;
      const totalAmount = subtotal + tax + deliveryFee;

      const orderData = {
        type: 'cart',
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        customerDetails: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          mobileNumber: formData.phone,
          address: `${formData.shippingStreet}, ${formData.shippingCity}, ${formData.shippingState} - ${formData.shippingPostalCode}`,
          pincode: formData.shippingPostalCode
        },
        shippingAddress: {
          street: formData.shippingStreet,
          city: formData.shippingCity,
          state: formData.shippingState,
          postalCode: formData.shippingPostalCode,
          country: formData.shippingCountry
        },
        billingAddress: sameAsShipping ? null : {
          street: formData.billingStreet,
          city: formData.billingCity,
          state: formData.billingState,
          postalCode: formData.billingPostalCode,
          country: formData.billingCountry
        },
        items: cartItems,
        subtotal,
        tax,
        shipping: deliveryFee,
        deliveryFee,
        discount: 0,
        total: totalAmount,
        totalAmount,
        pricing: {
          subtotal,
          tax,
          discount: 0,
          deliveryFee,
          totalAmount
        }
      };

      // Store in sessionStorage for payment page
      sessionStorage.setItem('cartOrder', JSON.stringify(orderData));

      setIsSubmitting(false);

      // Navigate to payment page for UPI Payment (Phase 8)
      navigate('/payment', { state: { order: orderData } });
    }, 600);
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <Navbar cartCount={cartCount} />
        <section className="checkout-empty">
          <div className="container">
            <h1>Your Cart is Empty</h1>
            <p>Add items to your cart before checking out.</p>
            <button className="btn btn-primary" onClick={() => navigate('/shop')}>
              Continue Shopping
            </button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Navbar cartCount={cartCount} />

      <section className="checkout-header">
        <div className="container">
          <h1 className="page-title">Checkout</h1>
          <p className="page-subtitle">Complete your order in 3 steps</p>
        </div>
      </section>

      <section className="checkout-content">
        <div className="container checkout-layout">
          {/* Left: Checkout Form */}
          <div className="checkout-form-panel">
            <form onSubmit={handleSubmit} className="checkout-form">
              {/* Step 1: Personal Information */}
              <div className="checkout-section">
                <h2 className="section-title">
                  <span className="step-number">1</span>
                  Personal Information
                </h2>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className={formErrors.firstName ? 'input-error' : ''}
                    />
                    {formErrors.firstName && <span className="error-message">{formErrors.firstName}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className={formErrors.lastName ? 'input-error' : ''}
                    />
                    {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={formErrors.email ? 'input-error' : ''}
                    />
                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      className={formErrors.phone ? 'input-error' : ''}
                    />
                    {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div className="checkout-section">
                <h2 className="section-title">
                  <span className="step-number">2</span>
                  Shipping Address
                </h2>

                <div className="form-group">
                  <label htmlFor="shippingStreet">Street Address *</label>
                  <input
                    type="text"
                    id="shippingStreet"
                    name="shippingStreet"
                    value={formData.shippingStreet}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                    className={formErrors.shippingStreet ? 'input-error' : ''}
                  />
                  {formErrors.shippingStreet && <span className="error-message">{formErrors.shippingStreet}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="shippingCity">City *</label>
                    <input
                      type="text"
                      id="shippingCity"
                      name="shippingCity"
                      value={formData.shippingCity}
                      onChange={handleInputChange}
                      placeholder="New York"
                      className={formErrors.shippingCity ? 'input-error' : ''}
                    />
                    {formErrors.shippingCity && <span className="error-message">{formErrors.shippingCity}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="shippingState">State/Province *</label>
                    <input
                      type="text"
                      id="shippingState"
                      name="shippingState"
                      value={formData.shippingState}
                      onChange={handleInputChange}
                      placeholder="NY"
                      className={formErrors.shippingState ? 'input-error' : ''}
                    />
                    {formErrors.shippingState && <span className="error-message">{formErrors.shippingState}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="shippingPostalCode">Postal Code *</label>
                    <input
                      type="text"
                      id="shippingPostalCode"
                      name="shippingPostalCode"
                      value={formData.shippingPostalCode}
                      onChange={handleInputChange}
                      placeholder="10001"
                      className={formErrors.shippingPostalCode ? 'input-error' : ''}
                    />
                    {formErrors.shippingPostalCode && <span className="error-message">{formErrors.shippingPostalCode}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="shippingCountry">Country *</label>
                    <input
                      type="text"
                      id="shippingCountry"
                      name="shippingCountry"
                      value={formData.shippingCountry}
                      onChange={handleInputChange}
                      placeholder="India"
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Billing Address */}
              <div className="checkout-section">
                <h2 className="section-title">
                  <span className="step-number">3</span>
                  Billing Address
                </h2>

                <div className="billing-address-toggle">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={sameAsShipping}
                      onChange={(e) => setSameAsShipping(e.target.checked)}
                    />
                    <span>Same as shipping address</span>
                  </label>
                </div>

                {!sameAsShipping && (
                  <>
                    <div className="form-group">
                      <label htmlFor="billingStreet">Street Address *</label>
                      <input
                        type="text"
                        id="billingStreet"
                        name="billingStreet"
                        value={formData.billingStreet}
                        onChange={handleInputChange}
                        placeholder="123 Main Street"
                        className={formErrors.billingStreet ? 'input-error' : ''}
                      />
                      {formErrors.billingStreet && <span className="error-message">{formErrors.billingStreet}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="billingCity">City *</label>
                        <input
                          type="text"
                          id="billingCity"
                          name="billingCity"
                          value={formData.billingCity}
                          onChange={handleInputChange}
                          placeholder="New York"
                          className={formErrors.billingCity ? 'input-error' : ''}
                        />
                        {formErrors.billingCity && <span className="error-message">{formErrors.billingCity}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="billingState">State/Province *</label>
                        <input
                          type="text"
                          id="billingState"
                          name="billingState"
                          value={formData.billingState}
                          onChange={handleInputChange}
                          placeholder="NY"
                          className={formErrors.billingState ? 'input-error' : ''}
                        />
                        {formErrors.billingState && <span className="error-message">{formErrors.billingState}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="billingPostalCode">Postal Code *</label>
                        <input
                          type="text"
                          id="billingPostalCode"
                          name="billingPostalCode"
                          value={formData.billingPostalCode}
                          onChange={handleInputChange}
                          placeholder="10001"
                          className={formErrors.billingPostalCode ? 'input-error' : ''}
                        />
                        {formErrors.billingPostalCode && <span className="error-message">{formErrors.billingPostalCode}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="billingCountry">Country *</label>
                        <input
                          type="text"
                          id="billingCountry"
                          name="billingCountry"
                          value={formData.billingCountry}
                          onChange={handleInputChange}
                          placeholder="India"
                          disabled
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary checkout-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Proceeding to Payment...' : 'Proceed to Payment (UPI)'}
              </button>

              <button
                type="button"
                className="btn btn-outline checkout-cancel-btn"
                onClick={() => navigate('/cart')}
                disabled={isSubmitting}
              >
                Back to Cart
              </button>
            </form>
          </div>

          {/* Right: Order Summary */}
          <aside className="checkout-summary-panel">
            <div className="order-summary">
              <h2>Order Summary</h2>

              {/* Items */}
              <div className="summary-items">
                <h3>Items ({cartItems.length})</h3>
                {cartItems.map(item => (
                  <div key={item.id} className="summary-item">
                    <div className="item-info">
                      <p className="item-name">{item.title}</p>
                      <p className="item-qty">Qty: {item.quantity}</p>
                    </div>
                    <p className="item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="summary-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span>₹{shipping.toLocaleString('en-IN')}</span>
                </div>
                <div className="total-row total">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Note */}
              <div className="summary-note">
                <p>💳 Payment will be processed in the next step.</p>
                <p>✓ All prices include applicable taxes.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Checkout;

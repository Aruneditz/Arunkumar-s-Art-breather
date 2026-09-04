import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Register.css';

/**
 * Register Page Component
 * 
 * User account creation page:
 * - Name, email, password fields
 * - Password confirmation
 * - Terms and conditions checkbox
 * - Form validation
 * - Error handling
 * 
 * Features:
 * - Email format validation
 * - Password strength requirements
 * - Password confirmation match
 * - Terms acceptance requirement
 * - Loading state during registration
 * - localStorage for new user
 * 
 * React Concepts Used:
 * - useState: For form state and UI state
 * - useNavigate: For navigation after registration
 * - Form handling with validation
 * - Conditional rendering
 */
function Register({ cartCount = 0 }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and a number';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate registration API call
    setTimeout(() => {
      // Store new user in localStorage
      const userData = {
        name: formData.fullName,
        email: formData.email,
        registeredAt: new Date().toISOString()
      };

      localStorage.setItem('artBreatherUser', JSON.stringify(userData));

      setIsSubmitting(false);

      // Navigate to account page with success message
      navigate('/account', { state: { message: 'Registration successful! Welcome to ART BREATHER.' } });
    }, 1500);
  };

  return (
    <div className="register-page">
      <Navbar cartCount={cartCount} />

      <section className="register-content">
        <div className="register-container">
          {/* Welcome Banner */}
          <div className="register-banner">
            <div className="banner-content">
              <h2>Join ART BREATHER</h2>
              <p>
                Create an account to explore our collection of handmade artworks, 
                save your favorites, and get exclusive access to new releases.
              </p>
              <div className="banner-benefits">
                <div className="benefit">
                  <span className="benefit-icon">✨</span>
                  <span className="benefit-text">Personalized Recommendations</span>
                </div>
                <div className="benefit">
                  <span className="benefit-icon">📦</span>
                  <span className="benefit-text">Order History & Tracking</span>
                </div>
                <div className="benefit">
                  <span className="benefit-icon">❤️</span>
                  <span className="benefit-text">Wishlist Management</span>
                </div>
                <div className="benefit">
                  <span className="benefit-icon">🎁</span>
                  <span className="benefit-text">Member Exclusive Deals</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="register-form-panel">
            <div className="register-header">
              <h1>Create Account</h1>
              <p>Join our community of art lovers</p>
            </div>

            <form onSubmit={handleSubmit} className="register-form">
              {/* Full Name Field */}
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={errors.fullName ? 'input-error' : ''}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="At least 8 characters"
                  className={errors.password ? 'input-error' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
                <p className="password-hint">
                  Must contain uppercase, lowercase, and a number
                </p>
              </div>

              {/* Confirm Password Field */}
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Re-enter your password"
                  className={errors.confirmPassword ? 'input-error' : ''}
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>

              {/* Terms & Conditions */}
              <div className="terms-section">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                  />
                  <span>
                    I agree to the 
                    <Link to="#" className="terms-link">Terms & Conditions</Link>
                    and
                    <Link to="#" className="terms-link">Privacy Policy</Link>
                  </span>
                </label>
                {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary register-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="auth-footer">
              <p>
                Already have an account? 
                <Link to="/login" className="auth-link">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Register;

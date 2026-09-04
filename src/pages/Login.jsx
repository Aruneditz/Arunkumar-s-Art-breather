import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Login.css';

/**
 * Login Page Component
 * 
 * User authentication page:
 * - Email/password login form
 * - Form validation
 * - Remember me checkbox
 * - Link to register page
 * - Forgot password link (placeholder)
 * 
 * Features:
 * - Email format validation
 * - Password validation
 * - Error handling and display
 * - Loading state during login
 * - localStorage persistence for user session
 * 
 * React Concepts Used:
 * - useState: For form state and UI state
 * - useNavigate: For navigation after login
 * - Form handling with validation
 * - Conditional rendering for error messages
 */
function Login({ cartCount = 0 }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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

    // Simulate login API call
    setTimeout(() => {
      // Store user session in localStorage
      const userData = {
        email: formData.email,
        name: formData.email.split('@')[0],
        loginTime: new Date().toISOString()
      };

      localStorage.setItem('artBreatherUser', JSON.stringify(userData));

      if (formData.rememberMe) {
        localStorage.setItem('artBreatherRememberMe', 'true');
      }

      setIsSubmitting(false);

      // Navigate to account page or home
      navigate('/account', { state: { message: 'Login successful!' } });
    }, 1500);
  };

  return (
    <div className="login-page">
      <Navbar cartCount={cartCount} />

      <section className="login-content">
        <div className="login-container">
          {/* Left: Login Form */}
          <div className="login-form-panel">
            <div className="login-header">
              <h1>Welcome Back</h1>
              <p>Sign in to your ART BREATHER account</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
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
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={errors.password ? 'input-error' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="form-footer">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  <span>Remember me</span>
                </label>
                <Link to="#" className="forgot-password-link">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary login-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Social Login (Placeholder) */}
            <div className="social-login">
              <p className="divider">Or continue with</p>
              <div className="social-buttons">
                <button className="social-btn google-btn" title="Sign in with Google">
                  🔍 Google
                </button>
                <button className="social-btn facebook-btn" title="Sign in with Facebook">
                  📘 Facebook
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="auth-footer">
              <p>
                Don't have an account? 
                <Link to="/register" className="auth-link">Sign Up</Link>
              </p>
            </div>
          </div>

          {/* Right: Welcome Banner */}
          <div className="login-banner">
            <div className="banner-content">
              <h2>Discover Handmade Art</h2>
              <p>
                Explore a curated collection of original artworks by talented artists. 
                Create your account to save favorites, track orders, and access exclusive deals.
              </p>
              <div className="banner-features">
                <div className="feature">
                  <span className="feature-icon">❤️</span>
                  <span className="feature-text">Save to Wishlist</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🛒</span>
                  <span className="feature-text">Easy Checkout</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">📦</span>
                  <span className="feature-text">Track Orders</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎨</span>
                  <span className="feature-text">Exclusive Art</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Login;

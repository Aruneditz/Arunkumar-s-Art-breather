import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Account.css';

/**
 * Account Page Component
 * 
 * User account dashboard displaying:
 * - Profile information
 * - Account settings
 * - Order history
 * - Wishlist summary
 * - Logout functionality
 * 
 * Features:
 * - Retrieve user data from localStorage
 * - Display user welcome message
 * - Show account stats
 * - Quick links to wishlist and orders
 * - Logout and session management
 * 
 * React Concepts Used:
 * - useState, useEffect: For loading user data
 * - useNavigate, useLocation: For navigation and state
 * - localStorage: For session management
 */
function Account({ cartCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('artBreatherUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setLoading(false);
      } catch (error) {
        console.error('Error loading user:', error);
        setLoading(false);
      }
    } else {
      // Redirect to login if not logged in
      navigate('/login');
    }

    // Show success message from navigation state
    if (location.state?.message) {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem('artBreatherUser');
    localStorage.removeItem('artBreatherRememberMe');
    navigate('/');
  };

  if (loading || !user) {
    return (
      <div className="account-page">
        <Navbar cartCount={cartCount} />
        <section className="account-content">
          <div className="container">
            <p>Loading account...</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const orderCount = 0; // Placeholder - would come from backend
  const wishlistCount = 0; // Placeholder - would come from wishlist state

  return (
    <div className="account-page">
      <Navbar cartCount={cartCount} />

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="success-banner">
          <div className="container">
            <p>✨ {location.state?.message}</p>
          </div>
        </div>
      )}

      <section className="account-header">
        <div className="container">
          <h1 className="page-title">My Account</h1>
          <p className="page-subtitle">Welcome, {user.name}! 👋</p>
        </div>
      </section>

      <section className="account-content">
        <div className="container account-layout">
          {/* Left: Account Info */}
          <div className="account-main">
            {/* Profile Card */}
            <div className="account-card">
              <div className="card-header">
                <h2>Profile Information</h2>
                <button className="edit-btn">✏️ Edit</button>
              </div>

              <div className="profile-section">
                <div className="profile-avatar">
                  <span className="avatar-initials">
                    {user.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                      .toUpperCase()}
                  </span>
                </div>

                <div className="profile-info">
                  <div className="info-row">
                    <span className="label">Name:</span>
                    <span className="value">{user.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Email:</span>
                    <span className="value">{user.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Member Since:</span>
                    <span className="value">
                      {new Date(user.registeredAt || user.loginTime).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Stats */}
            <div className="account-card">
              <h2>Account Summary</h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-icon">📦</div>
                  <div className="stat-info">
                    <p className="stat-label">Orders</p>
                    <p className="stat-value">{orderCount}</p>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">❤️</div>
                  <div className="stat-info">
                    <p className="stat-label">Wishlist Items</p>
                    <p className="stat-value">{wishlistCount}</p>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-info">
                    <p className="stat-label">Member Status</p>
                    <p className="stat-value">Active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="account-card">
              <h2>Quick Actions</h2>
              <div className="actions-grid">
                <button className="action-btn" onClick={() => navigate('/wishlist')}>
                  <span className="action-icon">❤️</span>
                  <span className="action-text">View Wishlist</span>
                </button>
                <button className="action-btn" onClick={() => navigate('/shop')}>
                  <span className="action-icon">🛒</span>
                  <span className="action-text">Continue Shopping</span>
                </button>
                <button className="action-btn" onClick={() => alert('Coming soon!')}>
                  <span className="action-icon">🔐</span>
                  <span className="action-text">Change Password</span>
                </button>
                <button className="action-btn logout-btn" onClick={handleLogout}>
                  <span className="action-icon">👋</span>
                  <span className="action-text">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <aside className="account-sidebar">
            {/* Account Status Card */}
            <div className="sidebar-card">
              <h3>Account Status</h3>
              <div className="status-badge active">Active ✓</div>
              <p className="status-message">
                Your account is active and verified. You're all set to shop!
              </p>
            </div>

            {/* Preferences Card */}
            <div className="sidebar-card">
              <h3>Preferences</h3>
              <div className="preference-item">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Email Notifications</span>
                </label>
              </div>
              <div className="preference-item">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Order Updates</span>
                </label>
              </div>
              <div className="preference-item">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Marketing Emails</span>
                </label>
              </div>
            </div>

            {/* Help Card */}
            <div className="sidebar-card help-card">
              <h3>Need Help?</h3>
              <p>Have questions about your account or orders?</p>
              <button className="btn btn-secondary full-width">
                Contact Support
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* Account Info Section */}
      <section className="account-info-section">
        <div className="container">
          <h2>Account Information</h2>
          <div className="info-grid">
            <div className="info-box">
              <h3>🔒 Security</h3>
              <p>Keep your account secure with a strong password and two-factor authentication.</p>
            </div>
            <div className="info-box">
              <h3>📋 Privacy</h3>
              <p>Your data is safe with us. Read our privacy policy to learn how we protect your information.</p>
            </div>
            <div className="info-box">
              <h3>📞 Support</h3>
              <p>Have questions? Our support team is here to help. Contact us anytime.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Account;

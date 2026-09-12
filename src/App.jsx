import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import BuyNowCheckout from './pages/BuyNowCheckout';
import Payment from './pages/Payment';
import OrderedDetails from './pages/OrderedDetails';
import NotFound from './pages/NotFound';
import './App.css';

const STORAGE_KEY = 'artBreatherCart';
const WISHLIST_KEY = 'artBreatherWishlist';
const USER_KEY = 'artBreatherUser';

const getStoredCart = () => {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    return [];
  }
};

const getStoredWishlist = () => {
  try {
    const savedWishlist = localStorage.getItem(WISHLIST_KEY);
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (error) {
    return [];
  }
};

const getStoredUser = () => {
  try {
    const savedUser = localStorage.getItem(USER_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    return null;
  }
};

/**
 * App Component - Main Application
 * 
 * This is the root component that:
 * - Manages the loading screen display
 * - Manages cart state with localStorage persistence
 * - Manages wishlist state with localStorage persistence
 * - Manages user authentication state
 * - Manages buy now product flow (Phase 7)
 * - Sets up React Router for navigation
 * - Displays different pages based on routes
 * 
 * React Concepts Used:
 * - useState: To manage loading, cart, wishlist, user, and buy-now states
 * - useEffect: To handle side effects and localStorage sync
 * - BrowserRouter: For client-side routing
 * - Routes and Route: For defining application routes
 * 
 * Routes Implemented:
 * - / : Home page
 * - /shop : Shop page with search, filters, and sorting
 * - /product/:id : Product details page
 * - /cart : Shopping cart page
 * - /checkout : Checkout page for cart items
 * - /order-success : Order confirmation page
 * - /wishlist : Wishlist page (Phase 6)
 * - /login : Login page (Phase 6)
 * - /register : User registration page (Phase 6)
 * - /account : User account/profile page (Phase 6)
 * - /buy-now : Buy now checkout for single product (Phase 7)
 * - /payment : Payment page (Phase 7)
 * - * : Not Found (404) page
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState(getStoredCart);
  const [wishlist, setWishlist] = useState(getStoredWishlist);
  const [user, setUser] = useState(getStoredUser);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Cart management functions
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId, change) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Wishlist management functions (Phase 6)
  const addToWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.find((item) => item.id === product.id);
      if (exists) {
        return currentWishlist;
      }
      return [...currentWishlist, { ...product }];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter((item) => item.id !== productId)
    );
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Auth management functions (Phase 6)
  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <div className="app">
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      {!isLoading && (
        <Router>
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} cartCount={cartCount} />} />
            <Route path="/shop" element={<Shop onAddToCart={addToCart} cartCount={cartCount} />} />
            <Route path="/product/:id" element={<ProductDetails onAddToCart={addToCart} cartCount={cartCount} />} />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={cart}
                  cartCount={cartCount}
                  onUpdateQuantity={updateCartQuantity}
                  onRemove={removeFromCart}
                  onClear={clearCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <Checkout
                  cartItems={cart}
                  cartCount={cartCount}
                  onCheckout={() => clearCart()}
                />
              }
            />
            <Route path="/order-success" element={<OrderSuccess cartCount={0} />} />
            
            {/* Phase 6 Routes */}
            <Route
              path="/wishlist"
              element={
                <Wishlist
                  cartCount={cartCount}
                  onAddToCart={addToCart}
                  onRemoveFromWishlist={removeFromWishlist}
                />
              }
            />
            <Route path="/login" element={<Login cartCount={cartCount} />} />
            <Route path="/register" element={<Register cartCount={cartCount} />} />
            <Route path="/account" element={<Account cartCount={cartCount} />} />
            
            {/* Phase 7 Routes */}
            <Route
              path="/buy-now"
              element={<BuyNowCheckout cartCount={cartCount} />}
            />
            <Route
              path="/payment"
              element={<Payment cartCount={cartCount} />}
            />
            
            {/* Ordered Details & Tracking Routes */}
            <Route
              path="/ordered-details"
              element={<OrderedDetails cartCount={cartCount} />}
            />
            <Route
              path="/my-orders"
              element={<OrderedDetails cartCount={cartCount} />}
            />
            <Route
              path="/orders"
              element={<OrderedDetails cartCount={cartCount} />}
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;

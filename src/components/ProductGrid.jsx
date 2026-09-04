import ProductCard from './ProductCard';
import './ProductGrid.css';

/**
 * ProductGrid Component
 * 
 * Displays products in a responsive grid layout.
 * 
 * Props:
 * - products: Array of product objects to display
 * - onBuyNow: Callback function when "Buy Now" button is clicked
 * - emptyMessage: Message to show when no products are available
 * 
 * React Concepts Used:
 * - Props: Accepts products array and callback functions
 * - Array mapping: map() to render ProductCard for each product
 * - Conditional rendering: Show empty message or products
 */
function ProductGrid({ products, onAddToCart, onBuyNow, emptyMessage = "No products found." }) {
  if (!products || products.length === 0) {
    return (
      <div className="product-grid-empty">
        <p className="empty-message">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      ))}
    </div>
  );
}

export default ProductGrid;

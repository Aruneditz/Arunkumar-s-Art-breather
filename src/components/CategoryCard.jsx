import { useNavigate } from 'react-router-dom';
import './CategoryCard.css';

/**
 * CategoryCard Component
 * 
 * Displays a category card with:
 * - Category icon
 * - Category name
 * - Hover effect with link to shop filtered by category
 * 
 * Props:
 * - icon: Emoji or symbol for the category
 * - name: Category name
 * - productCount: Number of products in this category
 * 
 * React Concepts Used:
 * - useNavigate: For navigation to shop with category filter
 * - Props for data passing
 * - CSS hover effects
 */
function CategoryCard({ icon, name, productCount }) {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    // Navigate to shop page (filtering will be done on Shop page)
    navigate('/shop');
  };

  return (
    <div 
      className="category-card"
      onClick={handleCategoryClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCategoryClick();
        }
      }}
    >
      <div className="category-icon">{icon}</div>
      <h3 className="category-name">{name}</h3>
      <p className="category-count">{productCount} artwork{productCount !== 1 ? 's' : ''}</p>
      <div className="category-overlay">
        <span className="explore-text">Explore →</span>
      </div>
    </div>
  );
}

export default CategoryCard;

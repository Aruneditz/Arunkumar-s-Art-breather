import CategoryCard from './CategoryCard';
import products from '../data/products';
import './CategoryCards.css';

/**
 * CategoryCards Component
 * 
 * Displays all product categories as a grid of category cards.
 * Dynamically calculates the number of products in each category.
 * 
 * React Concepts Used:
 * - Array filter() to count products per category
 * - Map() to render CategoryCard components
 * - Static category data
 */
function CategoryCards() {
  // Define categories with icons
  const categories = [
    { name: 'Painting', icon: '🎨' },
    { name: 'Pencil Drawing', icon: '✏️' },
    { name: 'Bookmark', icon: '📖' },
    { name: 'Illustration', icon: '🖼️' },
    { name: 'Crayon', icon: '🖍️' }
  ];

  // Calculate product count for each category
  const getCategoryCount = (categoryName) => {
    return products.filter(p => p.category === categoryName).length;
  };

  return (
    <div className="category-cards-grid">
      {categories.map((category) => (
        <CategoryCard
          key={category.name}
          icon={category.icon}
          name={category.name}
          productCount={getCategoryCount(category.name)}
        />
      ))}
    </div>
  );
}

export default CategoryCards;

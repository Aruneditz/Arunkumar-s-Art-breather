import { useEffect, useState } from 'react';
import './LoadingScreen.css';

/**
 * LoadingScreen Component
 * 
 * Displays a beautiful loading animation when the app first loads.
 * Features:
 * - Calm, artistic background animation
 * - Fade-in animation for the brand title and tagline
 * - Smooth transition to home page
 * 
 * React Concepts Used:
 * - useState: To track loading state
 * - useEffect: To manage the timer for loading duration
 */
function LoadingScreen({ onLoadingComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-hide loading screen after 3.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Call the callback to indicate loading is complete
      onLoadingComplete?.();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="loading-screen">
      {/* Animated background particles */}
      <div className="particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      {/* Gradient overlay */}
      <div className="gradient-overlay"></div>

      {/* Main content */}
      <div className="loading-content">
        <h1 className="loading-title">ART BREATHER</h1>
        <p className="loading-tagline">Handmade Art. A Breath of Creativity.</p>
      </div>

      {/* Loading indicator */}
      <div className="loading-indicator">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}

export default LoadingScreen;

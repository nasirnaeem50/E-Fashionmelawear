// src/utils/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is a hash, scroll to the element.
    // We keep this smooth as it's an intentional in-page navigation.
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Return early to prevent scrolling to the top
        return; 
      }
    }

    // For any other navigation where the pathname changes, scroll to the top instantly.
    // Using an instant scroll (the default behavior) is more reliable on mobile
    // and avoids conflicts with page transition animations.
    window.scrollTo(0, 0);

  }, [pathname]); // <-- CRITICAL CHANGE: Only trigger on pathname change.

  return null;
};

export default ScrollToTop;
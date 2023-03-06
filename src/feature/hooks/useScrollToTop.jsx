import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function useScrollToTop() {
  const topRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (topRef.current !== null) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return topRef;
}

export default useScrollToTop;

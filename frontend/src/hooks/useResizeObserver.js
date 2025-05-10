import { useEffect, useRef, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

/**
 * Custom hook for safely using ResizeObserver with debounce
 * @param {Object} options Configuration options
 * @param {number} options.debounceTime Debounce time in ms (default: 100)
 * @returns {[React.RefObject, DOMRectReadOnly|null]}
 */
const useResizeObserver = ({ debounceTime = 100 } = {}) => {
  const [dimensions, setDimensions] = useState(null);
  const targetRef = useRef(null);
  const observerRef = useRef(null);

  // Debounced handler to prevent excessive callbacks
  const handleResize = useCallback(
    debounce((entries) => {
      if (!entries || entries.length === 0) return;
      
      const entry = entries[0];
      setDimensions(entry.contentRect);
    }, debounceTime),
    [debounceTime]
  );

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    // Create new observer
    try {
      observerRef.current = new ResizeObserver(handleResize);
      observerRef.current.observe(element);
    } catch (error) {
      console.error("ResizeObserver error:", error);
    }

    // Cleanup function
    return () => {
      if (observerRef.current) {
        handleResize.cancel(); // Cancel any pending debounced calls
        observerRef.current.disconnect();
      }
    };
  }, [handleResize]);

  return [targetRef, dimensions];
};

export default useResizeObserver;

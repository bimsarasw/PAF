/**
 * Polyfill and error handler for ResizeObserver
 * This helps prevent the "ResizeObserver loop completed with undelivered notifications" error
 */
export const setupResizeObserverErrorHandler = () => {
  if (typeof window === 'undefined') return;

  // Add a global error handler for ResizeObserver errors
  const errorHandler = (event) => {
    // Only prevent ResizeObserver errors
    if (event && event.message && event.message.includes('ResizeObserver')) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  window.addEventListener('error', errorHandler);
  return () => window.removeEventListener('error', errorHandler);
};

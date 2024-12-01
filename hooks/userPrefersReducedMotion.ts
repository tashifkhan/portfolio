import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';
const isRenderingOnServer = typeof window === 'undefined';

const getInitialState = (): boolean => {
  // For our initial server render, we won't know if the user
  // prefers reduced motion, but it doesn't matter. This value
  // will be overwritten on the client, before any animations
  // occur.
  return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches;
};

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(getInitialState);

  useEffect(() => {
    const mediaQueryList: MediaQueryList = window.matchMedia(QUERY);
    
    const listener = (event: MediaQueryListEvent): void => {
      setPrefersReducedMotion(!event.matches);
    };

    // Modern API usage
    mediaQueryList.addEventListener('change', listener);
    
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);

  return prefersReducedMotion;
}

export default usePrefersReducedMotion;
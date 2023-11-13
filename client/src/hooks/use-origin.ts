import { useEffect, useState } from 'react';

export const useOrigin = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(isMounted);
  }, []);

  if (!isMounted) {
    return '';
  }

  return typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : '';
};

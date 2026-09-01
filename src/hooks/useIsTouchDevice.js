import { useEffect, useState } from 'react';

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches;
  });

  useEffect(() => {
    const query = window.matchMedia('(pointer: coarse)');
    const handler = e => setIsTouch(e.matches);

    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  return isTouch;
}

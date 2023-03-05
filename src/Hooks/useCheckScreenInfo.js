import { useCallback, useEffect, useState } from 'react';

export default function useCheckScreenInfo() {
  const isTouchDevice = () =>
    'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

  const [screenInfo, setScreenInfo] = useState({
    screenWidth: window.innerWidth,
    touchAble: isTouchDevice(),
  });

  const handleChange = useCallback(() => {
    setScreenInfo({
      screenWidth: window.innerWidth,
      touchAble: isTouchDevice(),
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleChange);

    return () => window.removeEventListener('resize', handleChange);
  }, [handleChange]);

  return screenInfo;
}

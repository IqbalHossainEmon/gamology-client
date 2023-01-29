import { useEffect, useState } from 'react';

export default function useCheckScreenWidth() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleChange = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleChange);

    return () => window.removeEventListener('resize', handleChange);
  }, []);

  return screenWidth;
}

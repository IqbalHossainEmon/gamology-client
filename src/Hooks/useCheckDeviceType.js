import { useEffect, useState } from 'react';

// this function checks if the device is touchable or not
export default function useCheckDeviceType(screenWidth) {
  const [touchable, setTouchable] = useState(window.matchMedia('(pointer: coarse)').matches);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setTouchable(true);
    } else {
      setTouchable(false);
    }
  }, [screenWidth]);

  return touchable;
}

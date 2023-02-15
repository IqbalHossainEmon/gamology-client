import { useEffect, useState } from 'react';

// this function checks if the device is touchable or not
export default function useCheckDeviceType(screenWidth) {
  function isTouchDevice() {
    return (
      'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
    );
  }
  const [touchable, setTouchable] = useState(isTouchDevice);

  useEffect(() => {
    setTouchable(isTouchDevice());
  }, [screenWidth]);

  return touchable;
}

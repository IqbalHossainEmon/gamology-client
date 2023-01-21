import { useEffect, useState } from 'react';
import useScreenWidth from './useScreenWidth';

export default function useDeviceType() {
  const [deviceType, setDeviceType] = useState(false);
  const screenWidth = useScreenWidth();

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setDeviceType(true);
    } else {
      setDeviceType(false);
    }
  }, [screenWidth]);

  return deviceType;
}

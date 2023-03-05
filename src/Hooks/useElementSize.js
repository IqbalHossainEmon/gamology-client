import { useCallback } from 'react';

export default function useElementSize() {
  const getElementWidth = useCallback((element, type) => {
    if (element) {
      if (type === 'width') {
        return element.offsetWidth;
      }
      if (type === 'height') {
        return element.offsetHeight;
      }
    }
    return 0;
  }, []);
  return getElementWidth;
}

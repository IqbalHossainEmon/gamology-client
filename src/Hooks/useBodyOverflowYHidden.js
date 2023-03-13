import { useCallback, useRef } from 'react';

export default function useBodyOverflowYHidden() {
  const touchAble = useRef();
  const bodyOverflowYHidden = useCallback((state) => {
    touchAble.current =
      'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    if (!state && !touchAble.current) {
      document.body.classList.add('overflow-y-hidden');
      document.getElementById('root').classList.add('margin-right-8px');
    } else if (!state && touchAble.current) {
      document.body.classList.add('overflow-y-hidden');
    } else if (state && !touchAble.current) {
      document.body.removeAttribute('class');
      document.getElementById('root').removeAttribute('class');
    } else if (state && touchAble.current) {
      document.body.removeAttribute('class');
    }
  }, []);

  const bodyOverflowShow = useCallback(() => {
    if (document.getElementById('root').classList.contains('margin-right-8px')) {
      document.getElementById('root').removeAttribute('class');
    }
    if (document.body.classList.contains('overflow-y-hidden')) {
      document.body.removeAttribute('class');
    }
  }, []);

  return { bodyOverflowYHidden, bodyOverflowShow };
}

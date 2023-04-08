import { useCallback, useRef } from 'react';

export default function useChangeBodyOverflow() {
  const touchAble = useRef();
  const hideBodyOverflow = useCallback(() => {
    touchAble.current =
      'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    if (
      !touchAble.current &&
      !document.getElementById('root').classList.contains('margin-right-8px') &&
      !document.body.classList.contains('overflow-y-hidden')
    ) {
      document.body.classList.add('overflow-y-hidden');
      document.getElementById('root').classList.add('margin-right-8px');
    } else if (touchAble.current) {
      document.body.classList.add('overflow-y-hidden');
    }
  }, []);

  const showBodyOverflow = useCallback(() => {
    if (document.getElementById('root').classList.contains('margin-right-8px')) {
      document.getElementById('root').removeAttribute('class');
    }
    if (document.body.classList.contains('overflow-y-hidden')) {
      document.body.removeAttribute('class');
    }
  }, []);

  return { hideBodyOverflow, showBodyOverflow };
}

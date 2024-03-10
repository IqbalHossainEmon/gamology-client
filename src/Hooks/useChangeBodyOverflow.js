import { useCallback, useRef } from 'react';
import useIsTouchAble from './useIsTouchable';

export default function useChangeBodyOverflow() {
  const touchAble = useRef();

  const isTouchable = useIsTouchAble();

  const hideBodyOverflow = useCallback(() => {
    touchAble.current = isTouchable();

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
  }, [isTouchable]);

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

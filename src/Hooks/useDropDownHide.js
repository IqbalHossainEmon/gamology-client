import { useCallback, useRef } from 'react';
import useBodyOverflowYHidden from './useBodyOverflowYHidden';

const useDropDownHide = (setState) => {
  const element = useRef();
  const { bodyOverflowShow } = useBodyOverflowYHidden();
  const closeMenu = useCallback(
    (e) => {
      if (element.current && e && !element.current.contains(e.target)) {
        setState(false);
        document.removeEventListener('mousedown', closeMenu);
        bodyOverflowShow();
      }
    },
    [bodyOverflowShow, setState]
  );

  const setElement = useCallback((ele) => {
    element.current = ele;
  }, []);

  const showMenu = useCallback(() => {
    window.document.addEventListener('mousedown', closeMenu);
  }, [closeMenu]);

  return { showMenu, setElement, closeMenu };
};

export default useDropDownHide;

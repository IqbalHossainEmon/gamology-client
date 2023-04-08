import { useCallback, useRef } from 'react';

const useDropDownHide = (setState) => {
  const element = useRef();

  const closeMenu = useCallback(
    (e) => {
      if (element.current && e && !element.current.contains(e.target)) {
        setState(false);
        document.removeEventListener('mousedown', closeMenu);
      }
    },
    [setState]
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

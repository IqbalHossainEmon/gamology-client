import { useCallback, useRef } from 'react';

const useDropDownHide = setState => {
  const element = useRef();

  const closeMenu = useCallback(
    e => {
      switch (Array.isArray(element.current)) {
        case true:
          if (!element.current.some(ele => ele?.contains(e.target)) && e) {
            setState(false);
            document.removeEventListener('mousedown', closeMenu);
          }
          break;
        default:
          if (element.current && e && !element.current.contains(e.target)) {
            setState(false);
            document.removeEventListener('mousedown', closeMenu);
          }
          break;
      }
    },
    [setState]
  );
  const closeMenuBlur = useCallback(() => {
    setState(false);
    window.addEventListener('blur', closeMenuBlur);
  }, [setState]);

  const setElement = useCallback(ele => {
    element.current = ele;
  }, []);

  const showMenu = useCallback(() => {
    document.addEventListener('mousedown', closeMenu);
    window.addEventListener('blur', closeMenuBlur);
  }, [closeMenu, closeMenuBlur]);

  return { showMenu, setElement };
};

export default useDropDownHide;

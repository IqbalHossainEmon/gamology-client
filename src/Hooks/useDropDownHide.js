import { useCallback, useRef } from 'react';

const useDropDownHide = setState => {
  const element = useRef();

  const closeMenu = useCallback(
    e => {
      if (element.current && e && !element.current.contains(e.target)) {
        setState(false);
        document.removeEventListener('mousedown', closeMenu);
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

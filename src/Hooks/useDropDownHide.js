import { useRef } from 'react';

const useDropDownHide = (setState) => {
  const element = useRef();
  const closeMenu = (e) => {
    if (element.current && !element.current.contains(e.target)) {
      setState(false);
      document.removeEventListener('mousedown', closeMenu);
    }
  };

  function showMenu(ele) {
    element.current = ele;
    window.document.addEventListener('mousedown', closeMenu);
  }

  return showMenu;
};

export default useDropDownHide;

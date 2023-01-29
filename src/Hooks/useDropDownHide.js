const useDropDownHide = (element, setState) => {
  const closeMenu = (e) => {
    if (!element.contains(e.target)) {
      setState(false);
      document.removeEventListener('click', closeMenu);
    }
  };

  function showMenu() {
    window.document.addEventListener('click', closeMenu);
  }

  return showMenu;
};

export default useDropDownHide;

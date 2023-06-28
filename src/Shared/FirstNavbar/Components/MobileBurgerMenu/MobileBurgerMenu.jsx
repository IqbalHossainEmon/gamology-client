import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../../../Hooks/useDropDownHide';

import FirstNavMobileNavLinks from '../FirstNavMobileNavLinks/FirstNavMobileNavLinks';
import styles from './MobileBurgerMenu.module.css';

export default function MobileBurgerMenu({
  hideBodyOverflow,
  showBodyOverflow,
}) {
  const [navState, setNavState] = useState(false);
  const elementRef = useRef();

  const { showMenu, setElement } = useDropDownHide((prop) => {
    setNavState(prop);
    showBodyOverflow();
  });

  useEffect(() => {
    setElement(elementRef.current);
  }, [setElement, elementRef]);

  const handleClick = () => {
    setNavState((prev) => !prev);
    showMenu();
    if (!navState) hideBodyOverflow();
    else showBodyOverflow();
    document.documentElement.scrollTop = 0;
  };

  return (
    <div ref={elementRef}>
      <FirstNavMobileNavLinks setNavState={setNavState} navState={navState} />
      <div
        className={styles.navOptionBg}
        {...(navState && { id: styles.hamburgerActive })}
      />
      <button
        type="button"
        onClick={handleClick}
        className={styles.hamburgerButton}
      >
        <div
          className={styles.hamburger}
          {...(navState && { id: styles.cross })}
        />
      </button>
    </div>
  );
}

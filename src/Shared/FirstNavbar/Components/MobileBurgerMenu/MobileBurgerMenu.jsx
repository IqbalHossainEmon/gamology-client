import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../../../Hooks/useDropDownHide';

import FirstNavMobileNavLinks from '../FirstNavMobileNavLinks/FirstNavMobileNavLinks';
import styles from './MobileBurgerMenu.module.css';

export default function MobileBurgerMenu({ bodyOverflowYHidden }) {
  const [navState, setNavState] = useState(false);
  const elementRef = useRef();

  const { showMenu, setElement, closeMenu } = useDropDownHide(setNavState);

  useEffect(() => {
    setElement(elementRef.current);
  }, [setElement, elementRef, closeMenu]);

  const handleClick = () => {
    setNavState((prev) => !prev);
    showMenu();
    bodyOverflowYHidden(navState);
    document.documentElement.scrollTop = 0;
  };

  return (
    <div ref={elementRef}>
      <FirstNavMobileNavLinks setNavState={setNavState} navState={navState} />
      <div className={styles.navOptionBg} {...(navState && { id: styles.hamburgerActive })} />
      <button type="button" onClick={handleClick} className={styles.hamburgerButton}>
        <div className={styles.hamburger} {...(navState && { id: styles.cross })} />
      </button>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../../../Hooks/useDropDownHide';

import FirstNavMobileNavLinks from '../FirstNavMobileNavLinks/FirstNavMobileNavLinks';
import styles from './MobileBurgerMenu.module.css';

export default function MobileBugerMenu({ touchAble, screenWidth }) {
  const [navState, setNavState] = useState(false);
  const elementRef = useRef();

  const showMenu = useDropDownHide(elementRef.current, setNavState);

  useEffect(() => {
    setNavState(false);

    if (document.getElementById('root').classList.contains('margin-right-8px')) {
      document.getElementById('root').removeAttribute('class');
    }
    if (document.body.classList.contains('overflow-y-hidden')) {
      document.body.removeAttribute('class');
    }
  }, [screenWidth]);

  const handleClick = () => {
    setNavState((prev) => !prev);
    showMenu();
    document.documentElement.scrollTop = 0;

    if (!navState && !touchAble) {
      document.body.classList.add('overflow-y-hidden');
      document.getElementById('root').classList.add('margin-right-8px');
    } else if (!navState && touchAble) {
      document.body.classList.add('overflow-y-hidden');
    } else if (navState && !touchAble) {
      document.body.removeAttribute('class');
      document.getElementById('root').removeAttribute('class');
    } else if (navState && touchAble) {
      document.body.removeAttribute('class');
    }
  };

  return (
    <div ref={elementRef}>
      <FirstNavMobileNavLinks setNavState={setNavState} navState={navState} />
      <div className={styles.navOptionBg} id={navState ? styles.hamburgerActive : ''} />
      <button type="button" onClick={handleClick} className={styles.hamburgerButton}>
        <div className={styles.hamburger} id={navState ? styles.cross : ''} />
      </button>
    </div>
  );
}

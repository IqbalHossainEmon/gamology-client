import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../../../Hooks/useDropDownHide';
import useScreenInfo from '../../../../Hooks/useScreenInfo';

import FirstNavMobileNavLinks from '../FirstNavMobileNavLinks/FirstNavMobileNavLinks';
import styles from './MobileBurgerMenu.module.css';

export default function MobileBugerMenu() {
  const [navState, setNavState] = useState(false);
  const elementRef = useRef();

  const screenInfo = useScreenInfo();
  const showMenu = useDropDownHide(setNavState);

  useEffect(() => {
    setNavState(false);

    if (document.getElementById('root').classList.contains('margin-right-8px')) {
      document.getElementById('root').removeAttribute('class');
    }
    if (document.body.classList.contains('overflow-y-hidden')) {
      document.body.removeAttribute('class');
    }
  }, [screenInfo]);

  useEffect(() => {
    if (navState && !screenInfo.touchAble) {
      document.body.classList.add('overflow-y-hidden');
      document.getElementById('root').classList.add('margin-right-8px');
    } else if (navState && screenInfo.touchAble) {
      document.body.classList.add('overflow-y-hidden');
    } else if (!navState && !screenInfo.touchAble) {
      document.body.removeAttribute('class');
      document.getElementById('root').removeAttribute('class');
    } else if (!navState && screenInfo.touchAble) {
      document.body.removeAttribute('class');
    }
  }, [navState, screenInfo]);

  const handleClick = () => {
    setNavState((prev) => !prev);
    showMenu(elementRef.current);
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

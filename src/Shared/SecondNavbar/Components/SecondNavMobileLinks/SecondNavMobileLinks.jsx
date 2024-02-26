import { useEffect, useRef, useState } from 'react';

import useDropDownHide from '../../../../Hooks/useDropDownHide';
import RotateArrow from '../../../RotateArrow/RotateArrow';
import SecondNavLinkLists from '../SecondNavDesktopLinks/SecondNavDesktopLinks';
import styles from './SecondNavMobileLinks.module.css';

export default function SecondNavMobileLinks({ setNavShow }) {
  const [navTextState, setNavTextState] = useState(styles.discover);
  const [navMidShow, setNavMidShow] = useState();
  const midSliderElement = useRef();

  const setShowState = state => {
    setNavShow(state);
    setNavMidShow(state);
  };

  const { showMenu, setElement } = useDropDownHide(setShowState);

  useEffect(() => {
    setElement(midSliderElement.current);
  }, [setElement, midSliderElement]);

  const handleClick = no => {
    setShowState(false);
    switch (no) {
      case 1:
        setNavTextState(styles.browse);
        break;
      case 2:
        setNavTextState(styles.news);
        break;
      case 3:
        setNavTextState(styles.insertGame);
        break;
      default:
        setNavTextState(styles.discover);
        break;
    }
  };

  return (
    <div ref={midSliderElement} className={styles.mobileLinks}>
      <div style={navMidShow ? { visibility: 'visible' } : { visibility: 'hidden' }} className={styles.navLinksContainer}>
        <SecondNavLinkLists navMidShow={navMidShow} setNavTextState={handleClick} id={navMidShow ? 'navShow' : 'navHide'} />
      </div>
      <button
        type="button"
        onClick={() => {
          setShowState(prev => !prev);
          showMenu();
        }}
        className={styles.navLinks}
        id={navMidShow ? styles.zUp : styles.zDown}
      >
        <div id={navTextState} className={styles.navLinkOverFlow}>
          <p>Discover</p>
          <p>Browse</p>
          <p>News</p>
        </div>
        <div className={styles.navArrow}>
          <RotateArrow state={navMidShow} />
        </div>
      </button>
    </div>
  );
}

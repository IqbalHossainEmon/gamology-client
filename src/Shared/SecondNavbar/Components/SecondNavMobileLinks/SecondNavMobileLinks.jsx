import { useEffect, useRef, useState } from 'react';

import useDropDownHide from '../../../../Hooks/useDropDownHide';
import RotateArrow from '../../../RotateArrow/RotateArrow';
import SecondNavLinkLists from '../SecondNavLinkLists/SecondNavLinkLists';
import styles from './SecondNavMobileLinks.module.css';

export default function SecondNavMobileLinks({ setNavShow }) {
  const [navTextState, setNavTextState] = useState(styles.discover);
  const [navMidShow, setNavMidShow] = useState();
  const midSliderElement = useRef();

  const setShowState = (state) => {
    setNavShow(state);
    setNavMidShow(state);
  };

  const { showMenu, setElement, closeMenu } = useDropDownHide(setShowState);

  useEffect(() => {
    setElement(midSliderElement.current);
    return closeMenu;
  }, [setElement, midSliderElement, closeMenu]);

  const handleClick = (no) => {
    setShowState(false);
    if (no === 1) {
      setNavTextState(styles.browse);
    } else if (no === 2) {
      setNavTextState(styles.news);
    } else {
      setNavTextState(styles.discover);
    }
  };

  return (
    <div ref={midSliderElement} className={styles.mobileLinks}>
      <div
        style={
          navMidShow ? { visibility: 'visible' } : { visibility: 'hidden' }
        }
        className={styles.navLinksContainer}
      >
        <SecondNavLinkLists
          navMidShow={navMidShow}
          setNavTextState={handleClick}
          id={navMidShow ? 'navShow' : 'navHide'}
        />
      </div>
      <div
        role="button"
        tabIndex="0"
        onClick={() => {
          setShowState((prev) => !prev);
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
      </div>
    </div>
  );
}

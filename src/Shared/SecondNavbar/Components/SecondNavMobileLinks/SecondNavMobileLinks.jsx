import { useRef, useState } from 'react';

import useDropDownHide from '../../../../Hooks/useDropDownHide';
import ScreenShadow from '../../../ScreenShadow/ScreenShadow';
import SecondNavLinks from '../SecondNavDesktopLinks/SecondNavDesktopLinks';
import styles from './SecondNavMobileLinks.module.css';

export default function SecondNavMobileLinks() {
  const [navTextState, setNavTextState] = useState(styles.discover);
  const [navShow, setNavShow] = useState(false);
  const element = useRef();

  const showMenu = useDropDownHide(setNavShow);

  const handleClick = (no) => {
    setNavShow(false);
    if (no === 1) {
      setNavTextState(styles.browse);
    } else if (no === 2) {
      setNavTextState(styles.news);
    } else {
      setNavTextState(styles.discover);
    }
  };

  return (
    <>
      <div ref={element} className={styles.mobileLinks}>
        <SecondNavLinks
          setNavTextState={handleClick}
          setNavShow={setNavShow}
          id={navShow ? 'navShow' : 'navHide'}
        />
        <div
          role="button"
          tabIndex="0"
          onClick={() => {
            setNavShow(true);
            showMenu(element.current);
          }}
          className={styles.navLinks}
          id={navShow ? styles.zUp : styles.zDown}
        >
          <div id={navTextState} className={styles.navLinkOverFlow}>
            <p>Discover</p>
            <p>Browse</p>
            <p>News</p>
          </div>
          <div className={styles.navArrow}>&#60;</div>
        </div>
      </div>
      <ScreenShadow show={navShow} />
    </>
  );
}

import { useEffect, useState } from 'react';
import useDeviceType from '../../Hooks/useDeviceType';
import styles from './FirstNavbar.module.css';

export default function FirstNavbar({ screenWidth }) {
  const [navState, setNavState] = useState(false);
  const deviceType = useDeviceType();

  useEffect(() => {
    if (navState && !deviceType) {
      document.body.style.overflowY = 'hidden';
      document.getElementById('root').style.marginRight = '8px';
    } else if (navState && deviceType) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.getElementById('root').style.marginRight = '0px';
      document.body.style.overflowY = 'scroll';
    }
  }, [navState, deviceType]);

  useEffect(() => {
    setNavState(false);
  }, [screenWidth]);

  return (
    <div className={styles.FirstNavbar}>
      <div className={styles.gamologyLogo}>
        <a href="/">
          <img src="https://i.ibb.co/sFTf2wp/game-controller-1.png" alt="game controller" />
        </a>
      </div>
      <div className={styles.navOptions} id={navState ? styles.show : styles.hide}>
        <div className={styles.leftPart}>
          <div className={[styles.navOption, styles.active].join(' ')}>
            <a onClick={() => setNavState(false)} href="#a">
              Store
            </a>
          </div>
          <div className={styles.navOption}>
            <a onClick={() => setNavState(false)} href="#a">
              FAQ
            </a>
          </div>
          <div className={styles.navOption}>
            <a onClick={() => setNavState(false)} href="#a">
              Help
            </a>
          </div>
        </div>
        <div className={styles.rightPart}>
          <img className={styles.profileImg} src="https://i.ibb.co/1TL02Bg/user-1.png" alt="" />
          <p>iqbal.hossain.emon</p>
        </div>
      </div>
      {screenWidth <= 768 && (
        <>
          <div className={styles.navOptionBg} id={navState ? styles.hambugerActive : ''} />
          <button
            type="button"
            onClick={() => {
              setNavState((prev) => !prev);
              document.documentElement.scrollTop = 0;
            }}
            className={styles.hambugerButton}
          >
            <div className={styles.hambuger} id={navState ? styles.cross : ''} />
          </button>
          <button
            type="button"
            onClick={() => setNavState(false)}
            id={navState ? styles.navOpened : styles.navClosed}
            className={styles.navCloseButton}
          />
        </>
      )}
    </div>
  );
}

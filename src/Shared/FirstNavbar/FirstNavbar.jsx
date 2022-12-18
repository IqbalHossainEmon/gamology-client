import { useEffect, useState } from 'react';
import styles from './FirstNavbar.module.css';

export default function FirstNavbar() {
  const [navState, setNavState] = useState(false);
  useEffect(() => {
    if (navState) {
      window.document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [navState]);
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
            <a href="#a">Store</a>
          </div>
          <div className={styles.navOption}>
            <a href="#a">FAQ</a>
          </div>
          <div className={styles.navOption}>
            <a href="#a">Help</a>
          </div>
        </div>
        <div className={styles.rightPart}>
          <img className={styles.profileImg} src="https://i.ibb.co/1TL02Bg/user-1.png" alt="" />
          <p>iqbal.hossain.emon</p>
        </div>
      </div>
      <div className={styles.navOptionBg} id={navState ? styles.hambugerActive : ''} />
      <button
        type="button"
        onClick={() => setNavState((prev) => !prev)}
        className={styles.hambugerButton}
      >
        <div className={styles.hambuger} id={navState ? styles.cross : ''} />
      </button>
    </div>
  );
}

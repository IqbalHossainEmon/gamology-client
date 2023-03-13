import { useEffect } from 'react';
import useBodyOverflowYHidden from '../../../Hooks/useBodyOverflowYHidden';
import useScreenWidth from '../../../Hooks/useScreenWidth';
import FirstNavLinks from '../Components/FirstNavLinks/FirstNavLinks';
import MobileBurgerMenu from '../Components/MobileBurgerMenu/MobileBurgerMenu';
import NavProfileInfo from '../Components/NavProfileInfo/NavProfileInfo';
import styles from './FirstNavbar.module.css';

export default function FirstNavbar() {
  const screenWidth = useScreenWidth();
  const { bodyOverflowYHidden, bodyOverflowShow } = useBodyOverflowYHidden();

  useEffect(() => {
    if (screenWidth > 768) {
      bodyOverflowShow();
    }
  }, [bodyOverflowShow, screenWidth]);

  return (
    <nav className={styles.FirstNavbar}>
      <div className={styles.gamologyLogo}>
        <a href="/">
          <img src="./images/game-controller-1.png" alt="game controller" />
        </a>
      </div>
      {screenWidth > 768 ? (
        <div className={styles.navOptions}>
          <FirstNavLinks />
          <NavProfileInfo />
        </div>
      ) : (
        <MobileBurgerMenu bodyOverflowYHidden={bodyOverflowYHidden} />
      )}
    </nav>
  );
}

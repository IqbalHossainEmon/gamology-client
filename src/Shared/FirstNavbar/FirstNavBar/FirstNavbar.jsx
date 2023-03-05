import useScreenInfo from '../../../Hooks/useScreenInfo';
import FirstNavLinks from '../Components/FirstNavLinks/FirstNavLinks';
import MobileBugerMenu from '../Components/MobileBurgerMenu/MobileBugerMenu';
import NavProfileInfo from '../Components/NavProfileInfo/NavProfileInfo';
import styles from './FirstNavbar.module.css';

export default function FirstNavbar() {
  const { screenWidth } = useScreenInfo();

  return (
    <nav className={styles.FirstNavbar}>
      <div className={styles.gamologyLogo}>
        <a href="/">
          <img src="./images/game-controller-1.png" alt="game controller" />
        </a>
      </div>
      {screenWidth >= 769 ? (
        <div className={styles.navOptions}>
          <FirstNavLinks />
          <NavProfileInfo />
        </div>
      ) : (
        <MobileBugerMenu />
      )}
    </nav>
  );
}

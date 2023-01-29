import useScreenInfo from '../../../Hooks/useScreenInfo';
import FirstNavLinks from '../Components/FirstNavLinks/FirstNavLinks';
import MobileBugerMenu from '../Components/MobileBurgerMenu/MobileBugerMenu';
import NavProfileInfo from '../Components/NavProfileInfo/NavProfileInfo';
import styles from './FirstNavbar.module.css';

export default function FirstNavbar() {
  const { screenWidth, touchAble } = useScreenInfo();

  return (
    <div className={styles.FirstNavbar}>
      <div className={styles.gamologyLogo}>
        <a href="/">
          <img src="https://i.ibb.co/sFTf2wp/game-controller-1.png" alt="game controller" />
        </a>
      </div>
      {screenWidth >= 768 ? (
        <div className={styles.navOptions}>
          <FirstNavLinks />
          <NavProfileInfo />
        </div>
      ) : (
        <MobileBugerMenu screenWidth={screenWidth} touchAble={touchAble} />
      )}
    </div>
  );
}

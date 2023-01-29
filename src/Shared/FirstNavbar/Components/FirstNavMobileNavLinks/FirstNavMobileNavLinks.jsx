import FirstNavLinks from '../FirstNavLinks/FirstNavLinks';
import NavProfileInfo from '../NavProfileInfo/NavProfileInfo';
import styles from './FirstNavMobileNavLinks.module.css';

export default function FirstNavMobileNavLinks({ setNavState, navState }) {
  return (
    <div className={styles.NavLinks} id={navState ? styles.show : ''}>
      <FirstNavLinks setNavState={() => setNavState(false)} />
      <NavProfileInfo />
    </div>
  );
}

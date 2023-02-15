import SecondNavDesktopLinks from '../SecondNavDesktopLinks/SecondNavDesktopLinks';
import SecondNavMobileLinks from '../SecondNavMobileLinks/SecondNavMobileLinks';
import styles from './SecondNavLeftLinks.module.css';

export default function SecondNavLeftLinks({ screenWidth }) {
  return (
    <div className={styles.links}>
      {screenWidth <= 768 ? <SecondNavMobileLinks /> : <SecondNavDesktopLinks />}
    </div>
  );
}

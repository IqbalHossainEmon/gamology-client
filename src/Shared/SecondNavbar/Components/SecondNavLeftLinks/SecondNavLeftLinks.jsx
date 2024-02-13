import SecondNavLinkLists from '../SecondNavDesktopLinks/SecondNavDesktopLinks';
import SecondNavMobileLinks from '../SecondNavMobileLinks/SecondNavMobileLinks';
import styles from './SecondNavLeftLinks.module.css';

export default function SecondNavLeftLinks({ screenWidth, setNavShow }) {
  return (
    <div className={styles.links}>
      {screenWidth <= 768 ? <SecondNavMobileLinks {...(screenWidth <= 768 && { setNavShow })} /> : <SecondNavLinkLists />}
    </div>
  );
}

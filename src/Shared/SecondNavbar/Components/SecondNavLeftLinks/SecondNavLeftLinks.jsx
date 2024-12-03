import SecondNavLinkLists from '../SecondNavDesktopLinks/SecondNavDesktopLinks';
import SecondNavMobileLinks from '../SecondNavMiddleLinks/SecondNavMobileLinks';
import styles from './SecondNavLeftLinks.module.css';

export default function SecondNavLeftLinks({ screenWidth }) {
	return (
		<div className={styles.middleLinks}>
			{screenWidth <= 768 ? <SecondNavMobileLinks /> : <SecondNavLinkLists />}
		</div>
	);
}

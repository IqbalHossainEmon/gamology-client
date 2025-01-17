import SecondNavLinkLists from '../SecondNavDesktopLinks/SecondNavDesktopLinks';
import SecondNavMobileLinks from '../SecondNavMobileLinks/SecondNavMobileLinks';
import styles from './SecondNavLeftLinks.module.css';

export default function SecondNavLeftLinks({ screenWidth, setNavShow }) {
	return (
		<div className={styles.middleLinks}>
			{screenWidth <= 48 ? (
				<SecondNavMobileLinks {...(screenWidth <= 48 && { setNavShow })} />
			) : (
				<SecondNavLinkLists />
			)}
		</div>
	);
}

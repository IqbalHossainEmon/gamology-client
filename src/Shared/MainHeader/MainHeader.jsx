import FirstNavbar from '../FirstNavbar/FirstNavBar/FirstNavbar';
import styles from './MainHeader.module.css';

export default function Header({ scrollContainer }) {
	return (
		<header className={styles.header}>
			<FirstNavbar scrollContainer={scrollContainer} />
		</header>
	);
}

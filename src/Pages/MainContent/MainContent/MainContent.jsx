import Footer from '../../../Shared/Footer/Footer';
import SecondNavbar from '../../../Shared/SecondNavbar/SecondNavBar/SecondNavbar';
import BrowseWithFilterSort from '../Pages/Browse/Browse/Browse';
import styles from './MainContent.module.css';

export default function MainContent() {
	return (
		<>
			<SecondNavbar />
			<main className={styles.main}>
				<BrowseWithFilterSort />
			</main>
			<Footer />
		</>
	);
}

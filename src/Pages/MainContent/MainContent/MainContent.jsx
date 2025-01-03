import Footer from '../../../Shared/Footer/Footer';
import SecondNavbar from '../../../Shared/SecondNavbar/SecondNavBar/SecondNavbar';
import Browse from '../Pages/Browse/Browse/Browse';
import styles from './MainContent.module.css';

function MainContent() {
	return (
		<>
			<SecondNavbar />
			<main className={styles.main}>
				<Browse />
			</main>
			<Footer />
		</>
	);
}

export default MainContent;

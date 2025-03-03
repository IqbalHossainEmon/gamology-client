import Footer from '../../../Shared/Footer/Footer';
import SecondNavbar from '../../../Shared/SecondNavbar/SecondNavBar/SecondNavbar';
import Discover from '../Pages/Discover/Discover/Discover';
import styles from './MainContent.module.css';

function MainContent() {
	return (
		<>
			<SecondNavbar />
			<main className={styles.main}>
				<Discover />
			</main>
			<Footer />
		</>
	);
}

export default MainContent;

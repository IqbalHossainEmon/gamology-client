import Footer from '../../../Shared/Footer/Footer';
import SecondNavbar from '../../../Shared/SecondNavbar/SecondNavBar/SecondNavbar';
import IndiGame from '../Pages/IndiGame/IndiGame/IndiGame';
import styles from './MainContent.module.css';

export default function MainContent() {
	return (
		<>
			<SecondNavbar />

			<main className={styles.main}>
				<IndiGame />
			</main>

			<Footer />
		</>
	);
}

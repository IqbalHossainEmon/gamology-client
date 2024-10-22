import Footer from '../../../Shared/Footer/Footer';
import SecondNavbar from '../../../Shared/SecondNavbar/SecondNavBar/SecondNavbar';
import SetTooltipContext from '../../../Utils/Contexts/TooltipContext';
import withTooltip from '../../../Utils/HOC/withTooltip';
import Discover from '../Pages/Discover/Discover/Discover';
import styles from './MainContent.module.css';

function MainContentMain() {
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

const MainContent = withTooltip(MainContentMain, SetTooltipContext);

export default MainContent;

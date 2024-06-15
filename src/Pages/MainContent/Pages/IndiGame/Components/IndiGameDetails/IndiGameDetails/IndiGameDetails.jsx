import IndiGameBanner from '../Components/IndiGameBanner/IndiGameBanner/IndiGameBanner';
import IndiGameDescription from '../Components/IndiGameDescription/IndiGameDescription/IndiGameDescription';
import IndiGameDetailAside from '../Components/IndiGameDetailAside/IndiGameDetailAside/IndiGameDetailAside';
import styles from './IndiGameDetails.module.css';

function IndiGameDetails() {
	return (
		<div className={styles.mainContentContainer}>
			<div className={styles.indiGameMainDetail}>
				<IndiGameBanner />

				<IndiGameDescription />
			</div>
			<div className={styles.asideDetail}>
				<IndiGameDetailAside />
			</div>
		</div>
	);
}

export default IndiGameDetails;

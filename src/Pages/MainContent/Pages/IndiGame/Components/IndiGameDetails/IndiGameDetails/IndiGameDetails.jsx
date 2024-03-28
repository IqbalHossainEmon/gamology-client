import IndiGameBanner from '../Components/IndiGameBanner/IndiGameBanner/IndiGameBanner';
import IndiGameDescription from '../Components/IndiGameDescription/IndiGameDescription/IndiGameDescription';
import IndiGameDetailAside from '../Components/IndiGameDetailAside/IndiGameDetailAside/IndiGameDetailAside';
import IndiGameReviewSection from '../Components/IndiGameReviewSection/IndiGameReviewSection/IndiGameReviewSection';
import IndiGameSpecifications from '../Components/IndiGameSpecifications/IndiGameSpecifications/IndiGameSpecifications';
import styles from './IndiGameDetails.module.css';

const IndiGameDetails = () => (
  <div className={styles.individualGameDetails}>
    <div className={styles.mainContentContainer}>
      <div className={styles.indiGameMainDetail}>
        <IndiGameBanner />
        <IndiGameDescription />
        <IndiGameSpecifications />
      </div>
      <IndiGameDetailAside />
    </div>
    <div>
      <IndiGameReviewSection />
    </div>
  </div>
);

export default IndiGameDetails;

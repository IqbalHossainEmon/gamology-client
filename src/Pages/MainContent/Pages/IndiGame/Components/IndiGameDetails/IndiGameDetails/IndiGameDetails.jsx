import IndiGameBanner from '../Components/IndiGameBanner/IndiGameBanner/IndiGameBanner';
import IndiGameDescription from '../Components/IndiGameDescription/IndiGameDescription/IndiGameDescription';
import IndiGameReviewSection from '../Components/IndiGameReviewSection/IndiGameReviewSection/IndiGameReviewSection';
import IndiGameSpecifications from '../Components/IndiGameSpecifications/IndiGameSpecifications/IndiGameSpecifications';
import styles from './IndiGameDetails.module.css';

const IndiGameDetails = ({ reviewContainerRef }) => (
  <div className={styles.individualGameDetails}>
    <IndiGameBanner />
    <IndiGameDescription />
    <IndiGameSpecifications />
    <IndiGameReviewSection ref={reviewContainerRef} />
  </div>
);

export default IndiGameDetails;

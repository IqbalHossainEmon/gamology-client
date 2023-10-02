import IndividualGameBanner from '../Components/IndividualGameBanner/IndividualGameBanner/IndividualGameBanner';
import IndividualGameDescription from '../Components/IndividualGameDescription/IndividualGameDescription/IndividualGameDescription';
import IndividualGameReviewSection from '../Components/IndividualGameReviewSection/IndividualGameReviewSection/IndividualGameReviewSection';
import IndividualGameSpecifications from '../Components/IndividualGameSpecifications/IndividualGameSpecifications/IndividualGameSpecifications';
import styles from './IndividualGameDetails.module.css';

export default function IndividualGameDetails() {
  return (
    <div className={styles.individualGameDetails}>
      <IndividualGameBanner />
      <IndividualGameDescription />
      <IndividualGameSpecifications />
      <IndividualGameReviewSection />
    </div>
  );
}

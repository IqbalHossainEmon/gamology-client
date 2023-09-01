import IndividualGameBanner from '../Components/IndividualGameBanner/IndividualGameBanner/IndividualGameBanner';
import IndividualGameDescription from '../Components/IndividualGameDescription/IndividualGameDescription/IndividualGameDescription';
import IndividualGameReview from '../Components/IndividualGameReview/IndividualGameReview/IndividualGameReview';
import IndividualGameSpecifications from '../Components/IndividualGameSpecifications/IndividualGameSpecifications/IndividualGameSpecifications';
import styles from './IndividualGameDetails.module.css';

export default function IndividualGameDetails() {
  return (
    <div className={styles.individualGameDetails}>
      <IndividualGameBanner />
      <IndividualGameDescription />
      <IndividualGameSpecifications />
      <IndividualGameReview />
    </div>
  );
}

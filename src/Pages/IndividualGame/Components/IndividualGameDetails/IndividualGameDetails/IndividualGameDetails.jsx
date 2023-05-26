import IndividualGameBanner from '../Components/IndividualGameBanner/IndividualGameBanner/IndividualGameBanner';
import styles from './IndividualGameDetails.module.css';

export default function IndividualGameDetails() {
  return (
    <div className={styles.individualGameDetails}>
      <IndividualGameBanner />
    </div>
  );
}

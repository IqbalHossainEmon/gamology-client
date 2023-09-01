import IndividualGameTakeReview from '../Components/IndividualGameTakeReview/IndividualGameTakeReview/IndividualGameTakeReview';
import styles from './IndividualGameReview.module.css';

export default function IndividualGameReview() {
  return (
    <div className={styles.individualGameReview}>
      <h2 className={styles.reviewMainHeader}>Reviews</h2>
      <div className={styles.reviewContainer}>
        <IndividualGameTakeReview />
      </div>
    </div>
  );
}

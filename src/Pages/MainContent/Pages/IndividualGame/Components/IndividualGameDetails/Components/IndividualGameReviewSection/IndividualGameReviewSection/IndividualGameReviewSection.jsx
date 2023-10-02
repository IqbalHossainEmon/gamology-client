import IndividualGameShowReview from '../Components/IndividualGameShowReview/IndividualGameShowReview/IndividualGameShowReview';
import IndividualGameTakeReview from '../Components/IndividualGameTakeReview/IndividualGameTakeReview/IndividualGameTakeReview';
import styles from './IndividualGameReviewSection.module.css';

export default function IndividualGameReviewSection() {
  return (
    <section className={styles.individualGameReview}>
      <h2 className={styles.reviewMainHeader}>Reviews</h2>
      <div className={styles.reviewContainer}>
        <IndividualGameTakeReview />
        <IndividualGameShowReview />
      </div>
    </section>
  );
}

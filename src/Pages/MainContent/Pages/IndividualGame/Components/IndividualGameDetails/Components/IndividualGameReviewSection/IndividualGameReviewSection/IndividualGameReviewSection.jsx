import { forwardRef } from 'react';
import IndividualGameShowReview from '../Components/IndividualGameShowReview/IndividualGameShowReview/IndividualGameShowReview';
import IndividualGameTakeReview from '../Components/IndividualGameTakeReview/IndividualGameTakeReview/IndividualGameTakeReview';
import styles from './IndividualGameReviewSection.module.css';

const IndividualGameReviewSection = (_, ref) => (
  <section className={styles.individualGameReview} ref={ref}>
    <h2 className={styles.reviewMainHeader}>Reviews</h2>
    <div className={styles.reviewContainer}>
      <IndividualGameTakeReview />
      <IndividualGameShowReview />
    </div>
  </section>
);
export default forwardRef(IndividualGameReviewSection);

import { forwardRef } from 'react';
import IndiGameShowReview from '../Components/IndiGameShowReview/IndiGameShowReview/IndiGameShowReview';
import IndiGameTakeReview from '../Components/IndiGameTakeReview/IndiGameTakeReview/IndiGameTakeReview';
import styles from './IndiGameReviewSection.module.css';

const IndiGameReviewSection = (_, ref) => (
  <section className={styles.individualGameReview} ref={ref}>
    <h2 className={styles.reviewMainHeader}>Reviews</h2>
    <div className={styles.reviewContainer}>
      <IndiGameTakeReview />
      <IndiGameShowReview />
    </div>
  </section>
);
export default forwardRef(IndiGameReviewSection);

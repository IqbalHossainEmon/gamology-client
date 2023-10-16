import IndividualGameReview from '../IndividualGameReview/IndividualGameReview';
import styles from './IndividualGameReviews.module.css';

export default function IndividualGameReviews({ reviews }) {
  return (
    <div className={styles.IndividualGameReviews}>
      {reviews.map((review, i) => (
        <IndividualGameReview key={review.id} review={review} length={reviews.length} index={i} />
      ))}
    </div>
  );
}

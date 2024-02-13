import IndividualGameReview from '../../../IndividualGameShowReview/Components/IndividualGameReview/IndividualGameReview';
import styles from './IndividualGameOwnReview.module.css';

export default function IndividualGameOwnReview({ review }) {
  return <div className={styles.individualGameOwnReview}>{review.user?.name && <IndividualGameReview review={review} />}</div>;
}

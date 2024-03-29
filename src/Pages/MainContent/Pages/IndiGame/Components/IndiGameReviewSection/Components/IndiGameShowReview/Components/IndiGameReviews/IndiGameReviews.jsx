import IndiGameReview from '../IndiGameReview/IndiGameReview';
import styles from './IndiGameReviews.module.css';

export default function IndiGameReviews({ reviews }) {
    return (
        <div className={styles.IndiGameReviews}>
            {reviews.map((review, i) => (
                <IndiGameReview key={review.id} review={review} length={reviews.length} index={i} />
            ))}
        </div>
    );
}

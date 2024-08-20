import IndiGameReview from '../IndiGameReview/IndiGameReview';
import styles from './IndiGameReviews.module.css';

export default function IndiGameReviews({ reviews }) {
    return (
        <div className={styles.IndiGameReviews}>
            {reviews.map((review, i) => (
                <IndiGameReview
                    index={i}
                    key={review.id}
                    length={reviews.length}
                    review={review}
                />
            ))}
        </div>
    );
}

import IndiGameReview from '../../../IndiGameShowReview/Components/IndiGameReview/IndiGameReview';
import styles from './IndiGameOwnReview.module.css';

export default function IndiGameOwnReview({ review }) {
	return (
		<div className={styles.individualGameOwnReview}>
			{review.user?.name ? <IndiGameReview review={review} /> : null}
		</div>
	);
}

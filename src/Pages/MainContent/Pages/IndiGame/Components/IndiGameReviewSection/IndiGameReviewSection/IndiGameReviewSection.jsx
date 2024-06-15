import IndiGameShowReview from '../Components/IndiGameShowReview/IndiGameShowReview/IndiGameShowReview';
import IndiGameTakeReview from '../Components/IndiGameTakeReview/IndiGameTakeReview/IndiGameTakeReview';
import styles from './IndiGameReviewSection.module.css';

function IndiGameReviewSection() {
	return (
		<section className={styles.individualGameReview}>
			<h2 className={styles.reviewMainHeader}>Reviews</h2>
			<div className={styles.reviewContainer}>
				<IndiGameTakeReview />

				<IndiGameShowReview />
			</div>
		</section>
	);
}
export default IndiGameReviewSection;

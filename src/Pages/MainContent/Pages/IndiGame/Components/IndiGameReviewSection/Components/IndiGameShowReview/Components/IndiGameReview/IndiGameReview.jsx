import { useState } from 'react';
import HorizontalDivider from '../../../../../../../../../../Shared/HorizontalDivider/HorizontalDivider';
import Image from '../../../../../../../../../../Shared/Image/Image/Image';
import ReviewStar from '../../../../../../../../../../Shared/ReviewStar/ReviewStar';
import styles from './IndiGameReview.module.css';

const month = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export default function IndiGameReview({ review, index, length }) {
	const [feedbackState, setFeedbackState] = useState({ state: 0 });
	const { user, feedback } = review;
	const handleReport = () => {
		setFeedbackState({ state: -1 });
	};

	return (
		<>
			<div className={styles.individualGameReview}>
				<div className={styles.userDetails}>
					<div className={styles.imageContainer}>
						<Image
							alt={user.name}
							data={user.image}
							aspectRatioClassName={styles.aspectRatioClassName}
						/>
					</div>
					<p className={styles.name}>{user.name}</p>
					<p className={styles.details}>
						Games:
						{user.games}
					</p>
					<p className={styles.details}>
						Reviews:
						{user.reviews}
					</p>
				</div>
				<div className={styles.reviewContainer}>
					<div className={styles.titleStarDateContainer}>
						<div className={styles.titleStarContainer}>
							<ReviewStar disabled newValue={review.star - 1} />

							<h3 className={styles.title}>{review.title}</h3>
						</div>
						<div>
							<p className={styles.date}>
								{month[review.date.getMonth()]} {review.date.getDate()},
								{review.date.getFullYear()}
							</p>
						</div>
					</div>
					<p className={styles.reviewDescription}>{review.text}</p>
					<div className={styles.feedbackContainer}>
						<div
							className={
								feedbackState.state === 0
									? styles.giveFeedback
									: [styles.notGiven, styles.giveFeedback].join(' ')
							}
						>
							{feedbackState.state === 0 ? (
								<div className={styles.interactionContainer}>
									<p>Is this Helpful to you?</p>

									<button
										className={styles.feedbackBtn}
										onClick={() => setFeedbackState({ state: -1 })}
										type='button'
									>
										yes
									</button>

									<button
										className={styles.feedbackBtn}
										onClick={() => setFeedbackState({ state: 1 })}
										type='button'
									>
										no
									</button>
								</div>
							) : (
								<p>Thanks for your vote!</p>
							)}
							<p className={styles.usersFeedback}>
								({feedback.goodFeedback} of {feedback.totalFeedback} users found
								this helpful)
							</p>
						</div>
						{feedbackState.state > 0 && (
							<button
								className={styles.reportBtn}
								onClick={handleReport}
								type='button'
							>
								report
							</button>
						)}
					</div>
				</div>
			</div>

			{index !== length - 1 && <HorizontalDivider />}
		</>
	);
}

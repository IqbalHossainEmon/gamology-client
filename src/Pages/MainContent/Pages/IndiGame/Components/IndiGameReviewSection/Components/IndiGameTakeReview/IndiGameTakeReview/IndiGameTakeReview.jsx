import { useEffect, useRef, useState } from 'react';
import HorizontalDivider from '../../../../../../../../../Shared/HorizontalDivider/HorizontalDivider';
import Image from '../../../../../../../../../Shared/Image/Image/Image';
import ReviewStar from '../../../../../../../../../Shared/ReviewStar/ReviewStar';
import IndiGameOwnReview from '../Components/IndiGameOwnReview/IndiGameOwnReview';
import IndiGameWriteReviewContainer from '../Components/IndiGameWriteReviewContainer/IndiGameWriteReviewContainer/IndiGameWriteReviewContainer';
import styles from './IndiGameTakeReview.module.css';

const userIcon = 'assets/images/icons/user.png';
const fullStar = 'assets/images/icons/star-full.png';
const data = {
	id: 10000,
	star: 5,
	title: 'Good Game!!',
	text: `Descriptions`,
	date: new Date(),
};

export default function IndiGameTakeReview() {
	const [writeReviewShow, setWriteReviewShow] = useState(false);
	const [reviewStar, setReviewStar] = useState({ active: 0 });
	const user = useRef({ name: 'iqbal69', reviews: 3, games: 50 });
	const [review, setReview] = useState({});

	useEffect(() => {
		setReview({ ...data, user: user.current });
	}, [user]);

	const overAllRating = 4.5;
	const userReviewDone = false;

	return (
		<>
			<div className={styles.individualGameTakeReview}>
				<div>
					<div className={styles.userStarContainer}>
						<div className={styles.userIcon}>
							<Image
								alt={user.current.name}
								data={user.current.src ? user.current.src : userIcon}
								aspectRatioClassName={styles.aspectRatioClassName}
							/>
						</div>
						<ReviewStar
							name='active'
							{...((writeReviewShow || userReviewDone) && { disabled: true })}
							setValue={setReviewStar}
							{...(userReviewDone && { newValue: review.star - 1 })}
						/>
					</div>
					{userReviewDone || (
						<button
							{...(writeReviewShow
								? {
										disabled: true,
									}
								: { onClick: () => setWriteReviewShow(true) })}
							className={styles.addReviewButton}
							type='button'
						>
							+ Add your review
						</button>
					)}
				</div>
				<div>
					<div className={styles.overAllRatingContainer}>
						<img alt='full star' className={styles.fullStar} src={fullStar} />
						<p>
							<span className={styles.overAllRating}>{overAllRating}</span>/
							<span>5</span>
						</p>
					</div>
					<div>
						<p className={styles.overallRatingText}>Overall rating</p>
					</div>
				</div>
			</div>
			<HorizontalDivider />
			{userReviewDone ? (
				<IndiGameOwnReview review={review} />
			) : (
				<IndiGameWriteReviewContainer
					reviewStar={reviewStar.active}
					setWriteReviewShow={setWriteReviewShow}
					state={writeReviewShow}
					user={user.current}
					userIcon={userIcon}
				/>
			)}
		</>
	);
}

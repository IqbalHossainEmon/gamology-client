import { useEffect, useRef, useState } from 'react';
import HorizontalDivider from '../../../../../../../../../../../../../Shared/HorizontalDivider/HorizontalDivider';
import Image from '../../../../../../../../../../../../../Shared/Image/Image/Image';
import ReviewStar from '../../../../../../../../../../../../../Shared/ReviewStar/ReviewStar';
import useScreenWidth from '../../../../../../../../../../../../../Utils/Hooks/useScreenWidth';
import IndiGameReviewBtn from '../Components/IndiGameReviewBtn/IndiGameReviewBtn';
import IndiGameReviewInput from '../Components/IndiGameReviewInput/IndiGameReviewInput';
import styles from './IndiGameWriteReview.module.css';

export default function IndiGameWriteReview({
	userIcon,
	fadeHeight,
	setWriteReviewShow,
	reviewStar,
	user,
}) {
	const [data, setData] = useState({ active: 0, title: '', text: '' });
	const elementRef = useRef(null);
	const { widthInRem, remsInPixel } = useScreenWidth();

	useEffect(() => {
		elementRef.height = elementRef.current.clientHeight;
	}, [elementRef, widthInRem]);

	const handleSubmit = () => {
		console.log({
			star: data.active + 1,
			title: data.title,
			text: data.text,
			data: new Date(),
		});
	};

	return (
		<div
			className={styles.individualGameWriteReviewContainer}
			style={
				fadeHeight
					? { height: `${(elementRef.height + 60) / remsInPixel}rem` }
					: { height: 0 }
			}
		>
			<div className={styles.individualGameWriteReview} ref={elementRef}>
				<div className={styles.userDetails}>
					<div className={styles.userIcon}>
						<Image
							alt={user.name}
							data={userIcon}
							aspectRatioClassName={styles.aspectRatioClassName}
						/>
					</div>
					<p className={styles.name}>{user.name}</p>
					<p className={styles.details}>
						Games:
						{user.reviews}
					</p>
					<p className={styles.details}>
						Reviews:
						{user.reviews}
					</p>
				</div>
				<div className={styles.writingField}>
					<div className={styles.reviewTitleContainer}>
						<div className={styles.reviewStarsContainer}>
							<ReviewStar name='active' newValue={reviewStar} setValue={setData} />
						</div>
						<IndiGameReviewInput setData={setData} />
					</div>
					<IndiGameReviewInput isTextArea setData={setData} />
					<IndiGameReviewBtn
						canSubmit={data.title ? data.text : null}
						handleSubmit={handleSubmit}
						setWriteReviewShow={setWriteReviewShow}
					/>
				</div>
			</div>
			<HorizontalDivider />
		</div>
	);
}

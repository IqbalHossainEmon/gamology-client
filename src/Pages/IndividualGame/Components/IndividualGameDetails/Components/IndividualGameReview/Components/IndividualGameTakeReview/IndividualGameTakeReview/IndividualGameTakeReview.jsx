import { useState } from 'react';
import ReviewStar from '../../../../../../../../../Shared/ReviewStar/ReviewStar';
import IndividualGameWriteReview from '../IndividualGameWriteReview/IndividualGameWriteReview/IndividualGameWriteReview';
import styles from './IndividualGameTakeReview.module.css';

const userIcon = 'assets/images/icons/user.png';
const fullStar = 'assets/images/icons/star-full.png';

export default function IndividualGameTakeReview() {
  const [writeReviewShow, setWriteReviewShow] = useState(false);

  const [reviewStar, setReviewStar] = useState({ active: 0 });

  const overAllRating = 4.5;
  return (
    <>
      <div className={styles.individualGameTakeReview}>
        <div>
          <div className={styles.userStarContainer}>
            <img className={styles.userIcon} src={userIcon} alt="user_icon" />
            <ReviewStar
              {...(writeReviewShow && { disabled: true })}
              setValue={setReviewStar}
            />
          </div>
          <button
            {...(writeReviewShow
              ? {
                  disabled: true,
                }
              : { onClick: () => setWriteReviewShow(true) })}
            className={styles.addReviewButton}
            type="button"
          >
            + Add your review
          </button>
        </div>
        <div>
          <div className={styles.overAllRatingContainer}>
            <img className={styles.fullStar} src={fullStar} alt="full star" />
            <p>
              <span className={styles.overAllRating}>{overAllRating}</span>/
              <span>5</span>
            </p>
          </div>
          <div>
            <p>Overall rating</p>
          </div>
        </div>
      </div>
      <div className={styles.line} />
      <IndividualGameWriteReview
        reviewStar={reviewStar.active}
        writeReviewShow={writeReviewShow}
        setWriteReviewShow={setWriteReviewShow}
        userIcon={userIcon}
      />
    </>
  );
}

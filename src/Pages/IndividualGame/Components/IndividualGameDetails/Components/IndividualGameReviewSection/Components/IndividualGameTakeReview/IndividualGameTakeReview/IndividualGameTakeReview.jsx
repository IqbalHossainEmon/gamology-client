import { useEffect, useRef, useState } from 'react';
import LineBreak from '../../../../../../../../../Shared/LineBreak/LineBreak';
import ReviewStar from '../../../../../../../../../Shared/ReviewStar/ReviewStar';
import IndividualGameOwnReview from '../Components/IndividualGameOwnReview/IndividualGameOwnReview';
import IndividualGameWriteReview from '../Components/IndividualGameWriteReview/IndividualGameWriteReview/IndividualGameWriteReview';
import styles from './IndividualGameTakeReview.module.css';

const userIcon = 'assets/images/icons/user.png';
const fullStar = 'assets/images/icons/star-full.png';

const data = {
  id: 10000,
  star: 5,
  title: 'Good Game!!',
  text: `Descriptions`,
};

export default function IndividualGameTakeReview() {
  const [writeReviewShow, setWriteReviewShow] = useState(false);

  const [reviewStar, setReviewStar] = useState({ active: 0 });
  const user = useRef({ name: 'iqbal69', reviews: 3, games: 50 });

  const [review, setReview] = useState({});

  useEffect(() => {
    setReview({ ...data, user: user.current });
  }, [user]);

  const overAllRating = 4.5;

  const userReviewDone = true;

  return (
    <>
      <div className={styles.individualGameTakeReview}>
        <div>
          <div className={styles.userStarContainer}>
            <img
              className={styles.userIcon}
              src={user.current.src ? user.current.src : userIcon}
              alt="user_icon"
            />
            <ReviewStar
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
              type="button"
            >
              + Add your review
            </button>
          )}
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
            <p className={styles.overallRatingText}>Overall rating</p>
          </div>
        </div>
      </div>
      <LineBreak />
      {userReviewDone ? (
        <IndividualGameOwnReview review={review} />
      ) : (
        <IndividualGameWriteReview
          reviewStar={reviewStar.active}
          writeReviewShow={writeReviewShow}
          setWriteReviewShow={setWriteReviewShow}
          userIcon={userIcon}
          user={user.current}
        />
      )}
    </>
  );
}

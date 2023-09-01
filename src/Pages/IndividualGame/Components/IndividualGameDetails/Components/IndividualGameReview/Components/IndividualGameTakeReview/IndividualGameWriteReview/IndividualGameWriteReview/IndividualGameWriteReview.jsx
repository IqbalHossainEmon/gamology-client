import { useRef, useState } from 'react';
import ReviewStar from '../../../../../../../../../../Shared/ReviewStar/ReviewStar';
import IndividualGameReviewBtn from '../Components/IndividualGameReviewBtn/IndividualGameReviewBtn';
import IndividualGameReviewInputField from '../Components/IndividualGameReviewInputField/IndividualGameReviewInputField';
import IndividualGameReviewTextField from '../Components/IndividualGameReviewTextField/IndividualGameReviewTextField';
import styles from './IndividualGameWriteReview.module.css';

export default function IndividualGameWriteReview({
  userIcon,
  writeReviewShow,
  setWriteReviewShow,
  reviewStar,
}) {
  const [data, setData] = useState({ active: 0, title: '', text: '' });

  const elementRef = useRef(null);

  const handleSubmit = () => {
    console.log({ star: data.active + 1, title: data.title, text: data.text });
  };

  const name = 'iqbal69';
  const reviews = 3;
  return (
    <div
      className={styles.individualGameWriteReviewContainer}
      style={
        writeReviewShow
          ? { height: elementRef.current?.clientHeight }
          : { height: 0 }
      }
    >
      <div ref={elementRef} className={styles.individualGameWriteReview}>
        <div className={styles.userDetails}>
          <img className={styles.userIcon} src={userIcon} alt="" />
          <p className={styles.name}>{name}</p>
          <p className={styles.details}>Games: {reviews}</p>
          <p className={styles.details}>Reviews: {reviews}</p>
        </div>
        <div className={styles.writingField}>
          <div className={styles.reviewTitleContainer}>
            <div className={styles.reviewStarsContainer}>
              <ReviewStar setValue={setData} newValue={reviewStar} />
            </div>
            <IndividualGameReviewInputField setData={setData} />
          </div>
          <IndividualGameReviewTextField setData={setData} />
          <IndividualGameReviewBtn
            handleSubmit={handleSubmit}
            setWriteReviewShow={setWriteReviewShow}
          />
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import useScreenWidth from '../../../../../../../../../../../../../Hooks/useScreenWidth';
import LineBreak from '../../../../../../../../../../../../../Shared/LineBreak/LineBreak';
import ReviewStar from '../../../../../../../../../../../../../Shared/ReviewStar/ReviewStar';
import IndividualGameReviewBtn from '../Components/IndividualGameReviewBtn/IndividualGameReviewBtn';
import IndividualGameReviewInputField from '../Components/IndividualGameReviewInputField/IndividualGameReviewInputField';
import IndividualGameReviewTextField from '../Components/IndividualGameReviewTextField/IndividualGameReviewTextField';
import styles from './IndividualGameWriteReview.module.css';

export default function IndividualGameWriteReview({ userIcon, writeReviewShow, setWriteReviewShow, reviewStar, user }) {
  const [data, setData] = useState({ active: 0, title: '', text: '' });

  const elementRef = useRef(null);

  const screenWidth = useScreenWidth();

  useEffect(() => {
    elementRef.width = elementRef.current.clientHeight;
  }, [elementRef, screenWidth]);

  const handleSubmit = () => {
    console.log({
      star: data.active + 1,
      title: data.title,
      text: data.text,
      data: new Date(),
    });
  };

  return (
    <div className={styles.individualGameWriteReviewContainer} style={writeReviewShow ? { height: elementRef.width + 60 } : { height: 0 }}>
      <div ref={elementRef} className={styles.individualGameWriteReview}>
        <div className={styles.userDetails}>
          <img className={styles.userIcon} src={userIcon} alt="" />
          <p className={styles.name}>{user.name}</p>
          <p className={styles.details}>Games: {user.reviews}</p>
          <p className={styles.details}>Reviews: {user.reviews}</p>
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
            cantSubmit={data.title && data.text}
            handleSubmit={handleSubmit}
            setWriteReviewShow={setWriteReviewShow}
          />
        </div>
      </div>
      <LineBreak />
    </div>
  );
}

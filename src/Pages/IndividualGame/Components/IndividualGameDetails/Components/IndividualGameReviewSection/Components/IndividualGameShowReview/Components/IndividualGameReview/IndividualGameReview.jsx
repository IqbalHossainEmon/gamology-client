import LineBreak from '../../../../../../../../../../Shared/LineBreak/LineBreak';
import ReviewStar from '../../../../../../../../../../Shared/ReviewStar/ReviewStar';
import styles from './IndividualGameReview.module.css';

const userIcon = 'assets/images/icons/user.png';

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

export default function IndividualGameReview({ review, index, length }) {
  const { user } = review;
  const time = new Date();
  return (
    <>
      <div className={styles.individualGameReview}>
        <div className={styles.userDetails}>
          <img className={styles.userIcon} src={userIcon} alt="" />
          <p className={styles.name}>{user.name}</p>
          <p className={styles.details}>Games: {user.games}</p>
          <p className={styles.details}>Reviews: {user.reviews}</p>
        </div>
        <div className={styles.reviewContainer}>
          <div className={styles.titleStarDateContainer}>
            <div className={styles.titleStarContainer}>
              <ReviewStar disabled newValue={review.star - 1} />
              <h3 className={styles.title}>{review.title}</h3>
            </div>
            <div>
              <p className={styles.date}>
                {month[time.getMonth()]} {time.getDate()}, {time.getFullYear()}
              </p>
            </div>
          </div>
          <p className={styles.reviewDescription}>{review.text}</p>
        </div>
      </div>
      {index !== length - 1 && <LineBreak />}
    </>
  );
}

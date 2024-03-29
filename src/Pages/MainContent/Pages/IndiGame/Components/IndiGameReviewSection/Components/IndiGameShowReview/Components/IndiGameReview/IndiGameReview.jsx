import { useState } from 'react';
import LineBreak from '../../../../../../../../../../Shared/LineBreak/LineBreak';
import ReviewStar from '../../../../../../../../../../Shared/ReviewStar/ReviewStar';
import styles from './IndiGameReview.module.css';

const userIcon = 'assets/images/icons/user.png';

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
                                {month[review.date.getMonth()]} {review.date.getDate()}, {review.date.getFullYear()}
                            </p>
                        </div>
                    </div>
                    <p className={styles.reviewDescription}>{review.text}</p>
                    <div className={styles.feedbackContainer}>
                        <div className={feedbackState.state === 0 ? styles.giveFeedback : [styles.notGiven, styles.giveFeedback].join(' ')}>
                            {feedbackState.state === 0 ? (
                                <div className={styles.interactionContainer}>
                                    <p>Is this Helpful to you?</p>
                                    <button onClick={() => setFeedbackState({ state: -1 })} className={styles.feedbackBtn} type="button">
                                        yes
                                    </button>
                                    <button onClick={() => setFeedbackState({ state: 1 })} className={styles.feedbackBtn} type="button">
                                        no
                                    </button>
                                </div>
                            ) : (
                                <p>Thanks for your vote!</p>
                            )}
                            <p className={styles.usersFeedback}>
                                ({feedback.goodFeedback} of {feedback.totalFeedback} users found this helpful)
                            </p>
                        </div>
                        {feedbackState.state > 0 && (
                            <button onClick={handleReport} type="button" className={styles.reportBtn}>
                                report
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {index !== length - 1 && <LineBreak />}
        </>
    );
}

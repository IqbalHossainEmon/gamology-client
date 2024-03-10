import { useState } from 'react';
import styles from './IndiGameReviewInput.module.css';

const IndiGameReviewInput = ({ setData, isTextArea }) => {
  const [value, setValue] = useState('');
  const [scrollable, setScrollable] = useState(false);

  return (
    <div className={styles.container}>
      {isTextArea ? (
        <textarea
          onBlur={e => {
            if (value.length <= 40) {
              setData(prev => ({ ...prev, text: e.target.value }));
            } else {
              setData(prev => ({ ...prev, text: '' }));
            }
          }}
          value={value}
          onChange={e => {
            setValue(e.target.value);
            if (e.target.clientHeight < e.target.scrollHeight) setScrollable(true);
            else setScrollable(false);
          }}
          className={`${styles.description}${scrollable ? ` ${styles.scrollable}` : ''}`}
          placeholder="Review text..."
          name="review description"
          rows="10"
        />
      ) : (
        <input
          onBlur={e => {
            if (value.length <= 40) {
              setData(prev => ({ ...prev, title: e.target.value }));
            } else {
              setData(prev => ({ ...prev, title: '' }));
            }
          }}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Review Title..."
          className={styles.reviewTitle}
          type="text"
        />
      )}
      <p
        className={
          value.length <= (isTextArea ? 2000 : 40) && value.length >= (isTextArea ? 1800 : 20)
            ? [styles.remainingWords, styles.warning].join(' ')
            : value.length > (isTextArea ? 2000 : 40)
              ? [styles.remainingWords, styles.negative].join(' ')
              : styles.remainingWords
        }
      >
        <small>{(isTextArea ? 2000 : 40) - value.length}</small>
      </p>
    </div>
  );
};
export default IndiGameReviewInput;

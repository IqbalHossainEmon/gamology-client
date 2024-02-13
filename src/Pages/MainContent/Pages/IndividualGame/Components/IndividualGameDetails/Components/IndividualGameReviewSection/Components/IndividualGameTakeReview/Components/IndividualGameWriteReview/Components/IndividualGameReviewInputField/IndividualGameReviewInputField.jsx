import { useState } from 'react';
import styles from './IndividualGameReviewInputField.module.css';

export default function IndividualGameReviewInputField({ setData }) {
  const [value, setValue] = useState('');

  return (
    <div className={styles.titleContainer}>
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
      <p
        className={
          value.length <= 40 && value.length >= 20
            ? [styles.remainingWords, styles.warning].join(' ')
            : value.length > 40
              ? [styles.remainingWords, styles.negative].join(' ')
              : styles.remainingWords
        }
      >
        <small>{40 - value.length}</small>
      </p>
    </div>
  );
}

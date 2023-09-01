import { useState } from 'react';
import styles from './IndividualGameReviewTextField.module.css';

export default function IndividualGameReviewTextField({ setData }) {
  const [value, setValue] = useState('');

  return (
    <div className={styles.descriptionContainer}>
      <textarea
        onBlur={(e) => setData((prev) => ({ ...prev, text: e.target.value }))}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.description}
        placeholder="Review text..."
        name="review description"
        rows="10"
      />
      <p
        className={
          value.length <= 2000 && value.length >= 1800
            ? [styles.remainingWords, styles.warning].join(' ')
            : value.length > 2000
            ? [styles.remainingWords, styles.negative].join(' ')
            : styles.remainingWords
        }
      >
        <small>{2000 - value.length}</small>
      </p>
    </div>
  );
}

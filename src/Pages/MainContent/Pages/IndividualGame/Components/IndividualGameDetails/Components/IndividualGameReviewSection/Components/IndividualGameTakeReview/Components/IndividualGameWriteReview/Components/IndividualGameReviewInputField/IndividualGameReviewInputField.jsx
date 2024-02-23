import { useState } from 'react';
import TextField from '../../../../../../../../../../../../../../Shared/TextField/TextField';
import styles from './IndividualGameReviewInputField.module.css';

export default function IndividualGameReviewInputField({ field }) {
  const [value, setValue] = useState('');

  return (
    <div className={styles.titleContainer}>
      <TextField
        field='input'
        className={styles.title}
        placeholder='Review title...'
        setState={setData}
        handleChange={val => {
          setValue(val);
        }}dfasdfsdf
        value={value}
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

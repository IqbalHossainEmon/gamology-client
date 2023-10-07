import { useState } from 'react';
import styles from './TextField.module.css';

export default function TextField({
  field,
  className,
  empty,
  placeholder,
  ...rest
}) {
  const [focused, setFocused] = useState(false);

  switch (field) {
    case 'input':
      return (
        <div className={[styles.container, className].join(' ')}>
          <label
            className={
              focused || empty
                ? [styles.focused, styles.label].join(' ')
                : styles.label
            }
            htmlFor={styles.input}
          >
            {placeholder}
          </label>
          <input
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            id={styles.input}
            className={[styles.input, styles.field].join(' ')}
            {...rest}
          />
        </div>
      );
    default:
      return (
        <div className={[styles.container, className].join(' ')}>
          <label
            className={
              focused || empty
                ? [styles.focused, styles.label].join(' ')
                : styles.label
            }
            htmlFor={styles.textarea}
          >
            {placeholder}
          </label>
          <textarea
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            id={styles.textarea}
            className={[styles.textarea, styles.field].join(' ')}
            rows={10}
            {...rest}
          />
        </div>
      );
  }
}

import { useState } from 'react';
import styles from './TextField.module.css';

export default function TextField({
  field,
  className,
  placeholder,
  htmlFor = 0,
  autoComplete,
  setState,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  switch (field) {
    case 'input':
      return (
        <div className={[styles.container, className].join(' ')}>
          <label
            className={
              focused || value.length ? [styles.focused, styles.label].join(' ') : styles.label
            }
            htmlFor={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
          >
            {placeholder}
          </label>
          <input
            {...(autoComplete && { autoComplete: 'on' })}
            onFocus={() => setFocused(true)}
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={e => {
              setState(e.target.value, e.target.name);
              setFocused(false);
            }}
            id={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
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
              focused || value.length ? [styles.focused, styles.label].join(' ') : styles.label
            }
            htmlFor={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
          >
            {placeholder}
          </label>
          <textarea
            onFocus={() => setFocused(true)}
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={e => {
              setState(e.target.value, e.target.name);
              setFocused(false);
            }}
            id={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
            className={[styles.textarea, styles.field].join(' ')}
            rows={10}
            {...rest}
          />
        </div>
      );
  }
}

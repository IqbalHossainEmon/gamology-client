import { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './TextField.module.css';

export default function TextField({
  field,
  className,
  placeholder,
  htmlFor = 0,
  autoComplete,
  setState,
  errorMessage,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className={`${className ? `${className} ` : ''}${styles.textFieldMainContainer}`}>
      <div
        className={`${errorMessage ? `${styles.error} ` : focused ? `${styles.focusBorder} ` : ''}${
          styles.container
        }`}
      >
        <label
          className={`${focused ? `${styles.focused} ` : value ? `${styles.textFilled} ` : ''}${styles.label}`}
          {...(errorMessage && { id: styles.errorColor })}
          htmlFor={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
        >
          {placeholder}
        </label>
        {field === 'input' ? (
          <input
            autoComplete={autoComplete ? 'on' : 'off'}
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
        ) : (
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
        )}
      </div>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
}

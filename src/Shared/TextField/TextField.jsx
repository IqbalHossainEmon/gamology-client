import { useEffect, useRef, useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './TextField.module.css';

export default function TextField({
  field,
  className,
  placeholder,
  htmlFor = 0,
  setState,
  errorMessage = '',
  errorChange,
  handleChange = () => {},
  onFocusClick,
  enabled = true,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const [errorShow, setErrorShow] = useState(!!errorMessage);

  const fieldRef = useRef(null);

  useEffect(() => {
    if (field === 'textarea') {
      fieldRef.current.addEventListener('input', () => {
        fieldRef.current.style.height = 'auto';
        fieldRef.current.style.height = `${fieldRef.current.scrollHeight}px`;
      });
    }
  }, [field]);

  useEffect(() => {
    if (errorChange && errorMessage) setErrorShow(true);
    else setErrorShow(false);
  }, [errorChange, errorMessage]);

  return (
    <div className={`${className ? `${className} ` : ''}${styles.textFieldMainContainer}`}>
      <div className={`${errorShow ? `${styles.error} ` : focused ? `${styles.focusBorder} ` : ''}${styles.container}`}>
        <label
          className={`${focused ? `${styles.focused} ` : value ? `${styles.textFilled} ` : ''}${styles.label}`}
          {...(errorShow && { id: styles.errorColor })}
          htmlFor={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
        >
          {placeholder}
        </label>
        {field === 'input' ? (
          <input
            {...(enabled || { disabled: true })}
            ref={fieldRef}
            onFocus={() => {
              setFocused(true);
              if (errorShow) setErrorShow(false);
              if (onFocusClick) {
                onFocusClick();
              }
            }}
            value={value}
            onChange={e => {
              setValue(e.target.value);

              handleChange(e.target.value);
            }}
            onBlur={e => {
              setState(e.target.value, e.target.name);
              setFocused(false);
            }}
            id={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
            className={styles.field}
            autoComplete="off"
            {...rest}
          />
        ) : (
          <textarea
            ref={fieldRef}
            onFocus={() => {
              setFocused(true);
              if (errorShow) setErrorShow(false);
            }}
            value={value}
            onChange={e => {
              setValue(e.target.value);
              handleChange(e.target.value);
            }}
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
      <ErrorMessage enable={errorShow} errorMessage={errorMessage} />
    </div>
  );
}

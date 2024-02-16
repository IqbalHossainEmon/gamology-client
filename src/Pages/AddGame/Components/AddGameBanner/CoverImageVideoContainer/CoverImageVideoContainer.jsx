import { useEffect, useRef, useState } from 'react';
import ErrorMessage from '../../../../../Shared/ErrorMessage/ErrorMessage';
import styles from './CoverImageVideoContainer.module.css';

const CoverImageVideoContainer = ({
  type,
  className,
  placeholder,
  htmlFor = 0,
  setState,
  errorMessage = '',
  errorChange,
  accept,
  name,
}) => {
  const [errorShow, setErrorShow] = useState(!!errorMessage);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState({ selected: false, name: 'name' });

  const inputRef = useRef(null);
  const btnRef = useRef(null);

  const handleSelect = e => {
    if (e.target.files) {
      const { name: fileName } = e.target.files[0];
      setSelected({ selected: true, name: fileName });

      const object = {
        type: 'FormData',
        file: e.target.files[0],
      };

      setState(object, name);
    }
  };

  const children = (
    <>
      <label
        className={`${focused || selected.selected ? `${styles.focused} ` : value ? `${styles.textFilled} ` : ''}${styles.label}`}
        {...(errorShow && { id: styles.errorColor })}
        htmlFor={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
      >
        {placeholder}
      </label>
      <input
        ref={inputRef}
        {...(type.type === 'Video'
          ? {
              type: 'text',
              onFocus: () => setFocused(true),

              onChange: e => {
                setValue(e.target.value);
                if (errorShow) setErrorShow(false);
              },
              onBlur: e => {
                setState(e.target.value, e.target.name);
                setFocused(false);
              },
              value,
            }
          : {
              onChange: handleSelect,
              accept,
              type: 'file',
            })}
        id={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
        className={type.type === 'Video' ? [styles.input, styles.field].join(' ') : styles.fileUploadField}
      />
    </>
  );

  useEffect(() => {
    if (errorChange && errorMessage) setErrorShow(true);
  }, [errorChange, errorMessage]);

  return (
    <div className={`${className ? `${className} ` : ''}`}>
      {type.type ? (
        <div
          className={`${errorShow ? `${styles.error} ` : focused || selected.selected ? `${styles.focusBorder} ` : ''}${styles.container}`}
        >
          {type.type === 'Image' ? (
            { children }
          ) : (
            <button type="button" className={`${errorShow ? `${styles.errorBorder} ` : ''}${styles.fileUploadButton}`}>
              {children}
            </button>
          )}
        </div>
      ) : (
        <p>Select Content Type First</p>
      )}
      <ErrorMessage enable={errorShow} errorMessage={errorMessage} />
    </div>
  );
};
export default CoverImageVideoContainer;

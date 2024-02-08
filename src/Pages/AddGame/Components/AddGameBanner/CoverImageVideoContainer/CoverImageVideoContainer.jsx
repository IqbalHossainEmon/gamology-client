import { useEffect, useRef, useState } from 'react';
import ErrorMessage from '../../../../../Shared/ErrorMessage/ErrorMessage';
import FileUploadButton from '../../../../../Shared/FileUploadButton/FileUploadButton';
import styles from './CoverImageVideoContainer.module.css';

const CoverImageVideoContainer = ({
  type,
  handleSetValues,
  errorChange,
  errorMessages,
  number,
}) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const [errorShow, setErrorShow] = useState(!!errorMessages[number]?.cover);

  const fieldRef = useRef(null);

  useEffect(() => {
    if (errorChange && errorMessages[number]?.cover) setErrorShow(true);
  }, [errorChange, errorMessages, number]);

  return (
    <div className={styles.marginBot}>
      {type.type === 'Image' ? (
        <FileUploadButton
          {...(type || { disabled: true })}
          field="input"
          accept="image/*"
          setState={(...rest) => {
            if (errorShow) {
              setErrorShow(false);
            }
            handleSetValues(...rest);
          }}
          placeholder="Choose Game's Banner Image"
          name="cover"
          noMessage
          errorChange={errorChange}
          errorMessage={errorMessages[number]?.cover}
        />
      ) : (
        <div
          className={`${errorShow ? `${styles.error} ` : focused ? `${styles.focusBorder} ` : ''}${
            styles.container
          }`}
        >
          <label
            className={`${focused ? `${styles.focused} ` : value ? `${styles.textFilled} ` : ''}${styles.label}`}
            {...(errorShow && { id: styles.errorColor })}
            htmlFor={`bannerImageInputField_${number}`}
          >
            {type
              ? type === 'Image'
                ? "Add Game's Banner Image"
                : "Add Game's Banner Video's Link"
              : 'Select Content Type First'}
          </label>
          <input
            disabled={!type}
            ref={fieldRef}
            autoComplete="off"
            onFocus={() => setFocused(true)}
            value={value}
            name="cover"
            onChange={e => {
              setValue(e.target.value);
              if (errorShow) setErrorShow(false);
            }}
            onBlur={e => {
              handleSetValues(e.target.value, e.target.name);
              setFocused(false);
            }}
            id={`bannerImageInputField_${number}`}
            className={[styles.input, styles.field].join(' ')}
          />
        </div>
      )}
      <ErrorMessage enable={errorShow} errorMessage={errorMessages[number]?.cover} />
    </div>
  );
};
export default CoverImageVideoContainer;

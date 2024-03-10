import { useEffect, useRef, useState } from 'react';
import ButtonWaterEffect from '../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import ErrorMessage from '../../../../../../../../../Shared/ErrorMessage/ErrorMessage';
import styles from './CoverImageVideoContainer.module.css';

const CoverImageVideoContainer = ({ type, handleSetValues, errorMessage, errorChange, name, number }) => {
  const [errorShow, setErrorShow] = useState(!!errorMessage);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState({ selected: false, name: 'name' });
  const [active, setActive] = useState(false);

  const inputRef = useRef(null);
  const btnRef = useRef(null);
  const typeRef = useRef(null);
  typeRef.current = type;

  useEffect(() => {
    let input;
    if (type.type === 'Image') {
      input = inputRef.current;
      inputRef.current.addEventListener('cancel', () => {
        setActive(false);
      });
    }
    return () => {
      input?.removeEventListener('cancel', () => {
        setActive(false);
      });
    };
  }, [type.type]);

  const handleSelect = e => {
    setActive(false);
    if (e.target.files) {
      if (e.target.files[0]) {
        const { name: fileName } = e.target.files[0] || {};
        setSelected({ selected: true, name: fileName });
      } else {
        setSelected({ selected: false, name: 'name' });
      }

      const object = {
        type: 'FormData',
        file: e.target.files[0],
      };

      handleSetValues(object, name);
    }
  };

  useEffect(() => {
    if (errorChange && errorMessage) setErrorShow(true);
    else setErrorShow(false);
  }, [errorChange, errorMessage]);

  return (
    <div className={styles.marginBot}>
      <div
        className={`${errorShow ? `${styles.error} ` : focused ? `${styles.focusBorder} ` : ''}${styles.container}${type.type ? '' : ` ${styles.padding} `}${active ? ` ${styles.activeBorder}` : ''}`}
      >
        {type.type && (
          <label
            className={`${type.type === 'Image' ? (selected.selected ? `${styles.textFilled} ` : '') : focused ? `${styles.focused} ` : value ? `${styles.textFilled} ` : ''}${styles.label}${errorShow ? ` ${styles.errorColor}` : ''}`}
            {...(active ? { id: styles.active } : errorShow && { id: styles.errorColor })}
            htmlFor={`addGameBannerCover_${number}`}
          >
            {`Choose Game's Banner's ${type.type}`}
          </label>
        )}
        {type.type ? (
          type.type === 'Video' ? (
            <input
              ref={inputRef}
              type="text"
              name={name}
              onFocus={() => {
                setFocused(true);
                if (errorShow) setErrorShow(false);
              }}
              onChange={e => {
                setValue(e.target.value);
                if (errorShow) setErrorShow(false);
              }}
              onBlur={e => {
                handleSetValues(e.target.value, e.target.name);
                setFocused(false);
              }}
              value={value}
              id={`addGameBannerCover_${number}`}
              className={`${type.type === 'Video' ? styles.field : styles.fileUploadField}`}
            />
          ) : (
            <>
              <input
                ref={inputRef}
                onChange={handleSelect}
                accept="image/*"
                type="file"
                id={`addGameBannerCover_${number}`}
                className={`${type.type === 'Video' ? styles.field : styles.fileUploadField}`}
              />
              <button
                ref={btnRef}
                onClick={() => {
                  inputRef.current.click();
                  setActive(true);
                  if (errorShow) {
                    setErrorShow(false);
                  }
                }}
                type="button"
                className={`${errorShow ? `${styles.errorBorder} ` : ''}${styles.fileUploadButton}`}
              >
                <p className={`${selected.selected ? `${styles.selected} ` : ''}${styles.fileName}`}>{selected.name}</p>
                <div className={styles.uploadImage}>
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_14_1859)">
                      <path
                        d="M8 46V47.5C8 48.6935 8.47411 49.8381 9.31802 50.682C10.1619 51.5259 11.3065 52 12.5 52H51.5C52.6935 52 53.8381 51.5259 54.682 50.682C55.5259 49.8381 56 48.6935 56 47.5V46"
                        stroke="#000000"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M31.999 13V40" stroke="#426AB2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M41 19L31.999 13L23 19" stroke="#426AB2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_14_1859">
                        <rect width="51.999" height="42.999" fill="white" transform="translate(6 11)" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <ButtonWaterEffect btnRef={btnRef} long />
              </button>
            </>
          )
        ) : (
          <p className={`${errorShow ? `${styles.errorColor} ` : ''}${styles.defaultText}`}>Select Content Type First</p>
        )}
      </div>
      <ErrorMessage enable={errorShow} errorMessage={errorMessage} />
    </div>
  );
};
export default CoverImageVideoContainer;

import { useEffect, useRef, useState } from 'react';
import ButtonWaterEffect from '../ButtonWaterEffect/ButtonWaterEffect';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './FileUploadButton.module.css';

const FileUploadButton = ({ placeholder, accept, className, setState, name, disabled, errorMessage, errorChange, htmlFor = '' }) => {
  const [selected, setSelected] = useState({ selected: false, name: 'name' });
  const [active, setActive] = useState(false);

  const inputRef = useRef(null);
  const btnRef = useRef(null);

  const [errorShow, setErrorShow] = useState(!!errorMessage);

  useEffect(() => {
    if (errorChange && errorMessage) setErrorShow(true);
    else setErrorShow(false);
  }, [errorChange, errorMessage]);

  useEffect(() => {
    inputRef.current.addEventListener('cancel', () => {
      setActive(false);
    });
  }, []);

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

      setState(object, name);
    }
  };

  return (
    <div className={`${className ? `${className} ` : ''}${styles.fileUploadContainer}`}>
      <input
        {...(disabled && { disabled })}
        ref={inputRef}
        onChange={handleSelect}
        type="file"
        accept={accept}
        name={name}
        id={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
        className={styles.fileUploadField}
      />
      <button
        ref={btnRef}
        {...(disabled && { disabled })}
        onClick={() => {
          inputRef.current.click();
          setActive(true);
          if (errorShow) {
            setErrorShow(false);
          }
        }}
        className={`${errorShow ? `${styles.errorBorder} ` : ''}${styles.fileUploadButton}${active ? ` ${styles.activeBorder}` : ''}`}
        type="button"
      >
        <label
          htmlFor={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
          className={`${active ? `${styles.active} ` : ''}${selected.selected ? `${styles.focused} ` : ''}${errorShow ? `${styles.errorColor} ` : ''}${styles.label}`}
          {...(active ? { id: styles.active } : errorShow && { id: styles.errorColor })}
        >
          {placeholder || 'Browse'}
        </label>

        <p className={`${selected.selected ? `${styles.selected} ` : ''}${styles.fileName}`}>{selected.name}</p>
        <ButtonWaterEffect btnRef={btnRef} long />
      </button>
      <ErrorMessage enable={errorShow} errorMessage={errorMessage} />
    </div>
  );
};
export default FileUploadButton;

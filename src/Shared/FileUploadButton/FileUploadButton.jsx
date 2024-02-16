import { useEffect, useRef, useState } from 'react';
import ButtonWaterEffect from '../ButtonWaterEffect/ButtonWaterEffect';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './FileUploadButton.module.css';

const FileUploadButton = ({ placeholder, accept, className, setState, name, disabled, errorMessage, errorChange, htmlFor }) => {
  const [selected, setSelected] = useState({ selected: false, name: 'name' });
  const inputRef = useRef(null);
  const btnRef = useRef(null);

  const [errorShow, setErrorShow] = useState(!!errorMessage);

  useEffect(() => {
    if (errorChange && errorMessage) {
      setErrorShow(true);
      inputRef.current.addEventListener('change', e => {
        setErrorShow(false);
        inputRef.current.removeEventListener('change', e);
      });
    }
  }, [errorChange, errorMessage]);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleSelect = e => {
    if (e.target.files) {
      const { name: fileName } = e.target.files[0];
      setSelected({ selected: true, name: fileName });

      const object = {
        type: 'FormData',
        file: e.target.files[0],
      };

      setState(object, name);
    } else {
      setSelected({ selected: false, name: 'browse' });
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
        onClick={handleClick}
        className={`${errorShow ? `${styles.errorBorder} ` : ''}${styles.fileUploadButton}`}
        type="button"
      >
        <label
          htmlFor={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
          className={`${selected.selected ? `${styles.focused} ` : ''}${errorShow ? `${styles.errorColor} ` : ''}${styles.label}`}
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

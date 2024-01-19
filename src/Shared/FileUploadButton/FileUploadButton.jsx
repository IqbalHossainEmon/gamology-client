import { useRef, useState } from 'react';
import styles from './FileUploadButton.module.css';

const FileUploadButton = ({ placeholder, accept, className, setState, name, disabled }) => {
  const [selected, setSelected] = useState({ selected: false, name: 'browse' });
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleSelect = e => {
    if (e.target.files) {
      setSelected(prev => ({ ...prev, selected: true }));
      const { name: fileName } = e.target.files[0];
      setSelected(prev => ({ ...prev, name: fileName }));

      const object = {
        type: 'FormData',
        file: e.target.files[0],
      };

      setState(object, name);
    } else {
      setSelected(prev => ({ ...prev, selected: false }));
      setSelected(prev => ({ ...prev, name: 'browse' }));
    }
  };

  return (
    <>
      <input
        {...(disabled && { disabled })}
        ref={inputRef}
        onChange={handleSelect}
        type="file"
        accept={accept}
        name={name}
        className={styles.fileUploadField}
      />
      <button
        {...(disabled && { disabled })}
        onClick={handleClick}
        className={[styles.fileUploadButton, className].join(' ')}
        type="button"
      >
        <div
          className={selected.selected ? [styles.label, styles.focused].join(' ') : styles.label}
        >
          {placeholder || 'Browse'}
        </div>
        {disabled || (
          <div className={styles.uploadImage}>
            <img src="/assets/images/upload.png" alt="upload" />
          </div>
        )}
        <div
          className={
            selected.selected ? [styles.fileName, styles.selected].join(' ') : styles.fileName
          }
        >
          {selected.name}
        </div>
      </button>
    </>
  );
};
export default FileUploadButton;

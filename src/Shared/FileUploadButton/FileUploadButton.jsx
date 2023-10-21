import { useRef, useState } from 'react';
import styles from './FileUploadButton.module.css';

const FileUploadButton = ({ placeholder, accept, className }) => {
  const [selected, setSelected] = useState({ selected: false, name: 'browse' });
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleSelect = e => {
    if (e.target.files) {
      setSelected(prev => ({ ...prev, selected: true }));
      const { name } = e.target.files[0];
      setSelected(prev => ({ ...prev, name }));
    } else {
      setSelected(prev => ({ ...prev, selected: false }));
      setSelected(prev => ({ ...prev, name: 'browse' }));
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        onChange={handleSelect}
        type="file"
        accept={accept}
        className={styles.fileUploadField}
      />
      <button
        onClick={handleClick}
        className={[styles.fileUploadButton, className].join(' ')}
        type="button"
      >
        <div
          className={selected.selected ? [styles.label, styles.focused].join(' ') : styles.label}
        >
          {placeholder || 'Browse'}
        </div>
        <div className={styles.uploadImage}>
          <img src="/assets/images/upload.png" alt="upload" />
        </div>
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

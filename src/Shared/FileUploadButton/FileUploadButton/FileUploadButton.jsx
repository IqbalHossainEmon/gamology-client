import { useCallback, useEffect, useRef, useState } from 'react';
import ButtonWaterEffect from '../../ButtonWaterEffect/ButtonWaterEffect';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import ImagePreview from '../ImagePreview/ImagePreview';
import styles from './FileUploadButton.module.css';

const FileUploadButton = ({ placeholder, accept, className, setState, name, disabled, errorMessage, errorChange, htmlFor = '' }) => {
    const [selected, setSelected] = useState({ selected: false, name: 'name', file: null });
    const [active, setActive] = useState(false);

    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const btnRef = useRef(null);

    const [errorShow, setErrorShow] = useState(!!errorMessage);

    useEffect(() => {
        if (errorChange && errorMessage) setErrorShow(true);
        else setErrorShow(false);
    }, [errorChange, errorMessage]);

    const handleActive = useRef(null);

    handleActive.current = useCallback(() => {
        setActive(false);
    }, []);

    useEffect(() => {
        const input = inputRef.current;
        input.addEventListener('cancel', handleActive.current);
        return () => {
            input.removeEventListener('cancel', handleActive.current);
        };
    }, []);

    const handleSelect = e => {
        setActive(false);
        if (e.target.files) {
            if (e.target.files[0]) {
                const { name: fileName } = e.target.files[0] || {};
                const object = {
                    type: 'FormData',
                    file: e.target.files[0],
                };
                setState(object, name);
                setSelected({ selected: true, name: fileName, file: e.target.files[0] });
            } else {
                setSelected({ selected: false, name: 'name' });
            }
        }
    };

    return (
        <div
            className={`${className ? `${className} ` : ''}${disabled ? `${styles.containerDisabled} ` : ''}${styles.fileUploadContainer}`}
            ref={containerRef}
        >
            <div>
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
                    {disabled || (
                        <div className={styles.uploadImage}>
                            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path
                                        d="M8 46V47.5C8 48.6935 8.47411 49.8381 9.31802 50.682C10.1619 51.5259 11.3065 52 12.5 52H51.5C52.6935 52 53.8381 51.5259 54.682 50.682C55.5259 49.8381 56 48.6935 56 47.5V46"
                                        stroke="#000000"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path d="M31.999 13V40" stroke="#426AB2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                    <path
                                        d="M41 19L31.999 13L23 19"
                                        stroke="#426AB2"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_14_1859">
                                        <rect width="51.999" height="42.999" fill="white" transform="translate(6 11)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    )}
                    <ButtonWaterEffect btnRef={btnRef} long />
                </button>
                <ErrorMessage enable={errorShow} errorMessage={errorMessage} />
            </div>
            {selected.file && <ImagePreview containerRef={containerRef} file={selected.file} btnRef={btnRef} />}
        </div>
    );
};
export default FileUploadButton;

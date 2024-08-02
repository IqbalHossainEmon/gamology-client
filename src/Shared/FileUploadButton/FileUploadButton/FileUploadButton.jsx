import { useCallback, useEffect, useRef, useState } from 'react';
import useIsTouchAble from '../../../Hooks/useIsTouchable';
import useScreenWidth from '../../../Hooks/useScreenWidth';
import ButtonWaterEffect from '../../ButtonWaterEffect/ButtonWaterEffect';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import ImagePreviewContainer from '../ImagePreviewContainer/ImagePreviewContainer';
import styles from './FileUploadButton.module.css';

const FileUploadButton = ({
    placeholder,
    accept,
    className,
    setState,
    name,
    disabled,
    errorMessage,
    errorChange,
    htmlFor = '',
    defaultValue,
}) => {
    const [selected, setSelected] = useState({
        selected: !!defaultValue,
        name: defaultValue
            ? defaultValue instanceof File
                ? defaultValue.name
                : defaultValue.substr(defaultValue.lastIndexOf('/') + 1)
            : 'name',
        file: defaultValue || null,
    });

    const [active, setActive] = useState(false);
    const [{ imagePreviewContainer, previewShow }, setImagePreview] = useState({
        previewShow: false,
        imagePreviewContainer: false,
    });
    const [errorShow, setErrorShow] = useState(!!errorMessage);

    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const btnRef = useRef(null);
    const previewBtnRef = useRef(null);

    const eventRef = useRef({
        handleCheckClick: () => {},
        removeDefault: () => {},
        handleActive: () => {},
    });

    const isTouchAble = useIsTouchAble();
    const screenWidth = useScreenWidth();

    useEffect(() => {
        setTimeout(() => {
            setImagePreview({ imagePreviewContainer: isTouchAble(), previewShow: false });
        }, 0);
    }, [isTouchAble, screenWidth]);

    useEffect(() => {
        if (errorChange && errorMessage) setErrorShow(true);
        else setErrorShow(false);
    }, [errorChange, errorMessage]);

    eventRef.current.handleActive = useCallback(() => {
        setActive(false);
    }, []);

    eventRef.current.removeDefault = useCallback(() => {
        setSelected({ selected: false, name: 'name', file: null });
        inputRef.current.removeEventListener('click', eventRef.current.removeDefault);
        eventRef.current.removeDefault = null;
    }, []);

    useEffect(() => {
        const input = inputRef.current;
        const { handleActive } = eventRef.current;

        input.addEventListener('cancel', handleActive);

        return () => {
            input.removeEventListener('cancel', handleActive);
        };
    }, [defaultValue]);

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

    eventRef.current.handleCheckClick = useCallback(e => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setImagePreview(prev => ({ ...prev, previewShow: false }));
            document.removeEventListener('click', eventRef.current.handleCheckClick);
        }
    }, []);

    return (
        <div
            className={`${className ? `${className} ` : ''}${disabled ? `${styles.containerDisabled} ` : ''}${styles.fileUploadContainer}`}
            ref={containerRef}
        >
            <div className={styles.fileUploadWithPreview}>
                <div className={styles.fileUpload}>
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
                            if (previewShow) {
                                setImagePreview(prev => ({ ...prev, previewShow: false }));
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

                        <p className={`${selected.selected ? `${styles.selected} ` : ''}${styles.fileName}`}>
                            {selected.name}
                        </p>
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
                                        <path
                                            d="M31.999 13V40"
                                            stroke="#426AB2"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
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
                                            <rect
                                                width="51.999"
                                                height="42.999"
                                                fill="white"
                                                transform="translate(6 11)"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        )}
                        <ButtonWaterEffect btnRef={btnRef} long />
                    </button>
                    <ErrorMessage enable={errorShow} errorMessage={errorMessage} />
                </div>
                {imagePreviewContainer && selected.file && (
                    <button
                        ref={previewBtnRef}
                        className={styles.previewBtn}
                        type="button"
                        onClick={() => {
                            setImagePreview(prev => ({ ...prev, previewShow: !prev.previewShow }));
                            if (!previewShow) {
                                document.addEventListener('click', eventRef.current.handleCheckClick);
                            } else {
                                document.removeEventListener('click', eventRef.current.handleCheckClick);
                            }
                        }}
                    >
                        Preview
                        <ButtonWaterEffect btnRef={previewBtnRef} long />
                    </button>
                )}
            </div>
            <ImagePreviewContainer
                containerRef={containerRef}
                file={selected.file}
                btnRef={btnRef}
                parentPreview={previewShow && imagePreviewContainer}
            />
        </div>
    );
};
export default FileUploadButton;

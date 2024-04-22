import { useCallback, useEffect, useRef, useState } from 'react';
import useIsTouchAble from '../../../../../../../../../../Hooks/useIsTouchable';
import useScreenWidth from '../../../../../../../../../../Hooks/useScreenWidth';
import ButtonWaterEffect from '../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import ErrorMessage from '../../../../../../../../../../Shared/ErrorMessage/ErrorMessage';
import CoverImageContainer from '../CoverImageContainer/CoverImageContainer';
import styles from './CoverImageVideoContainer.module.css';

const CoverImageVideoContainer = ({ type, handleSetValues, errorMessage, errorChange, name, number }) => {
    const [errorShow, setErrorShow] = useState(!!errorMessage);
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');
    const [selected, setSelected] = useState({ selected: false, name: 'name', file: null });
    const [active, setActive] = useState(false);

    const inputRef = useRef(null);

    const containerRef = useRef(null);

    const [{ imagePreviewContainer, previewShow }, setImagePreview] = useState({
        previewShow: false,
        imagePreviewContainer: false,
    });

    const previewBtnRef = useRef(null);

    const isTouchAble = useIsTouchAble();
    const screenWidth = useScreenWidth();

    useEffect(() => {
        setTimeout(() => {
            setImagePreview({ imagePreviewContainer: isTouchAble(), previewShow: false });
        }, 0);
    }, [isTouchAble, screenWidth]);

    const typeRef = useRef(null);
    typeRef.current = type;
    const eventRef = useRef(null);

    eventRef.cancel = useCallback(() => {
        setActive(false);
    }, []);

    useEffect(() => {
        let input;
        if (type.type === 'Image') {
            input = inputRef.current;
            inputRef.current.addEventListener('cancel', eventRef.cancel);
        }
        return () => {
            input?.removeEventListener('cancel', eventRef.cancel);
        };
    }, [type.type]);

    useEffect(() => {
        if (errorChange && errorMessage) setErrorShow(true);
        else setErrorShow(false);
    }, [errorChange, errorMessage]);

    return (
        <div className={styles.marginBot}>
            <div className={styles.containerWithPreview}>
                <div
                    className={`${errorShow ? `${styles.error} ` : focused ? `${styles.focusBorder} ` : ''}${styles.container}${type.type ? '' : ` ${styles.padding} `}${active ? ` ${styles.activeBorder}` : ''}${type.type ? '' : ` ${styles.disabled}`}`}
                    ref={containerRef}
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
                            <CoverImageContainer
                                containerRef={containerRef}
                                setSelected={setSelected}
                                setActive={setActive}
                                handleSetValues={handleSetValues}
                                name={name}
                                setErrorShow={setErrorShow}
                                inputRef={inputRef}
                                errorShow={errorShow}
                                type={type.type}
                                selected={selected}
                                number={number}
                                previewShow={previewShow}
                                imagePreviewContainer={imagePreviewContainer}
                                setImagePreview={setImagePreview}
                            />
                        )
                    ) : (
                        <p className={`${errorShow ? `${styles.errorColor} ` : ''}${styles.defaultText}`}>Select Content Type First</p>
                    )}
                </div>
                {imagePreviewContainer && selected.file && (
                    <button
                        ref={previewBtnRef}
                        className={styles.previewBtn}
                        type="button"
                        onClick={() => setImagePreview(prev => ({ ...prev, previewShow: !prev.previewShow }))}
                    >
                        Preview
                        <ButtonWaterEffect btnRef={previewBtnRef} long />
                    </button>
                )}
            </div>
            <ErrorMessage enable={errorShow} errorMessage={errorMessage} />
        </div>
    );
};
export default CoverImageVideoContainer;

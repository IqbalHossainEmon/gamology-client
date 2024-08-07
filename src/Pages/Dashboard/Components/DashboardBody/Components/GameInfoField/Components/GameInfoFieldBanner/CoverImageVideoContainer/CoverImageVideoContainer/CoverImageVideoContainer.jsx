import { useCallback, useEffect, useRef, useState } from 'react';
import useIsTouchAble from '../../../../../../../../../../Hooks/useIsTouchable';
import useScreenWidth from '../../../../../../../../../../Hooks/useScreenWidth';
import ButtonWaterEffect from '../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import ErrorMessage from '../../../../../../../../../../Shared/ErrorMessage/ErrorMessage';
import ImagePreviewContainer from '../../../../../../../../../../Shared/FileUploadButton/ImagePreviewContainer/ImagePreviewContainer';
import CoverImageContainer from '../Components/CoverImageContainer/CoverImageContainer';
import CoverVideoContainer from '../Components/CoverVideoContainer/CoverVideoContainer';
import styles from './CoverImageVideoContainer.module.css';

const CoverImageVideoContainer = ({
    type,
    handleSetValues,
    errorMessage,
    errorChange,
    name,
    number,
    hasDefault,
    defaultData,
}) => {
    const [errorShow, setErrorShow] = useState(!!errorMessage);
    const [focused, setFocused] = useState(false);

    const mainValueRef = useRef({
        image:
            type === 'image'
                ? {
                      selected: hasDefault,
                      name: defaultData
                          ? defaultData instanceof File
                              ? defaultData.name
                              : defaultData.substr(defaultData.lastIndexOf('/') + 1)
                          : '',
                      file: defaultData,
                  }
                : { selected: false, name: 'name', file: null },
        video: type === 'video' ? defaultData : '',
    });

    const inputRef = useRef(null);
    const containerRef = useRef(null);

    const previewBtnRef = useRef(null);
    const btnRef = useRef(null);

    const isTouchAble = useIsTouchAble();

    const touchAble = isTouchAble();
    const screenWidth = useScreenWidth();

    const eventRefs = useRef({
        cancel: () => {},
        handleCheckClick: () => {},
    });

    eventRefs.current.cancel = useCallback(() => {
        setFocused(false);
    }, []);

    useEffect(() => {
        if (errorChange && errorMessage) setErrorShow(true);
        else setErrorShow(false);
    }, [errorChange, errorMessage]);

    return (
        <div className={`${styles.outerContainer}${type ? '' : ` ${styles.disabled}`}`} ref={containerRef}>
            <div className={styles.containerWithPreview}>
                <div
                    className={`${errorShow ? `${styles.error} ` : focused ? `${styles.focusBorder} ` : ''}${styles.container}${type ? '' : ` ${styles.padding} `}`}
                >
                    {type && (
                        <label
                            className={`${errorShow ? `${styles.errorColor} ` : focused ? `${styles.focused} ` : (type === 'image' && mainValueRef.current.image.selected) || (type === 'video' && mainValueRef.current.video) ? `${styles.textFilled} ` : ''}${styles.label}`}
                            htmlFor={`addGameBannerCover_${number}`}
                        >
                            {`Choose Game's Banner's ${type}`}
                        </label>
                    )}
                    {type ? (
                        type === 'video' ? (
                            <CoverVideoContainer
                                mainValueRef={mainValueRef}
                                inputRef={inputRef}
                                number={number}
                                onFocus={() => {
                                    setFocused(true);
                                    if (errorShow) setErrorShow(false);
                                }}
                                name={name}
                                errorShow={errorShow}
                                setErrorShow={setErrorShow}
                                onBlur={e => {
                                    handleSetValues(e.target.value, e.target.name);
                                    setFocused(false);
                                    mainValueRef.current.video = e.target.value;
                                }}
                                mainValue={mainValueRef.current.video}
                            />
                        ) : (
                            <CoverImageContainer
                                containerRef={containerRef}
                                handleSetValues={handleSetValues}
                                name={name}
                                setErrorShow={setErrorShow}
                                inputRef={inputRef}
                                errorShow={errorShow}
                                type={type}
                                number={number}
                                btnRef={btnRef}
                                eventRef={eventRefs}
                                mainValue={mainValueRef.current.image}
                                setFocused={setFocused}
                            />
                        )
                    ) : (
                        <p className={`${errorShow ? `${styles.errorColor} ` : ''}${styles.defaultText}`}>
                            Select Content Type First
                        </p>
                    )}
                </div>
                {mainValueRef.current?.image.file && touchAble && (
                    <button ref={previewBtnRef} className={styles.previewBtn} type="button">
                        Preview
                        <ButtonWaterEffect btnRef={previewBtnRef} long />
                    </button>
                )}
            </div>
            {type === 'image' && mainValueRef.current?.image.file && (
                <ImagePreviewContainer
                    containerRef={containerRef}
                    file={mainValueRef.current?.image.file}
                    btnRef={btnRef}
                    screenWidth={screenWidth}
                    previewBtnRef={previewBtnRef}
                />
            )}
            <ErrorMessage enable={errorShow} errorMessage={errorMessage} />
        </div>
    );
};
export default CoverImageVideoContainer;

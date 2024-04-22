import ButtonWaterEffect from '../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import styles from './CoverImageContainer.module.css';

const CoverImageContainer = ({
    setSelected,
    selected,
    setActive,
    handleSetValues,
    name,
    setErrorShow,
    errorShow,
    type,
    number,
    inputRef,
    btnRef,
    previewShow,
    setImagePreview,
}) => {
    const handleSelect = e => {
        setActive(false);
        if (e.target.files) {
            if (e.target.files[0]) {
                const { name: fileName } = e.target.files[0] || {};
                setSelected({ selected: true, name: fileName, file: e.target.files[0] });
            } else {
                setSelected({ selected: false, name: 'name', file: null });
            }

            const object = {
                type: 'FormData',
                file: e.target.files[0],
            };

            handleSetValues(object, name);
        }
    };

    return (
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
                    if (previewShow) {
                        setImagePreview(prev => ({ ...prev, previewShow: false }));
                    }
                }}
                type="button"
                className={styles.fileUploadButton}
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
                <ButtonWaterEffect btnRef={btnRef} long />
            </button>
        </>
    );
};
export default CoverImageContainer;

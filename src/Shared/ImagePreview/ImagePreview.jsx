import { useEffect, useRef } from 'react';
import styles from './ImagePreview.module.css';

const ImagePreview = ({ file, show }) => {
    const imageRef = useRef(null);
    const srcRef = useRef(null);

    useEffect(() => {
        if ((file && !srcRef.current) || srcRef.file !== file) {
            if (file instanceof File) {
                srcRef.current = URL.createObjectURL(file);
            } else {
                srcRef.current = file;
            }
            srcRef.file = file;
        }

        return () => {
            if (srcRef.current) {
                URL.revokeObjectURL(srcRef.current);
                srcRef.current = null;
            }
        };
    }, [file]);

    return (
        <div className={styles.imagePreviewContainer}>
            <div className={`${styles.imagePreview}${show ? ` ${styles.show}` : ''}`}>
                <img ref={imageRef} className={styles.img} src={srcRef.current} alt="preview" />
            </div>
        </div>
    );
};

export default ImagePreview;

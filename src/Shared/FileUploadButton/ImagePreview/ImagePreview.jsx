import { useEffect, useRef } from 'react';
import styles from './ImagePreview.module.css';

const ImagePreview = ({ containerRef, file }) => {
    const imgRef = useRef(null);

    useEffect(() => {
        imgRef.current.src = URL.createObjectURL(file);
    }, [file]);

    useEffect(() => {
        containerRef.current.addEventListener('hover', handleHover);
    }, []);

    return (
        <div className={styles.imagePreview}>
            <img className={styles.img} ref={imgRef} alt="preview" />
        </div>
    );
};
export default ImagePreview;

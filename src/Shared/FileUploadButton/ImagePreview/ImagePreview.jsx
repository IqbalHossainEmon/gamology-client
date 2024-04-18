import { useEffect, useRef } from 'react';
import styles from './ImagePreview.module.css';

const ImagePreview = ({ containerRef, file }) => {
    const imgRef = useRef(null);

    useEffect(() => {
        imgRef.current.src = URL.createObjectURL(file);
    }, [file]);

    const handleHover = () => {
        imgRef.current.style.transform = 'scale(1.1)';
    };

    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('hover', handleHover);

        return () => {
            container.removeEventListener('hover', handleHover);
        };
    }, [containerRef]);

    return (
        <div className={styles.imagePreview}>
            <img className={styles.img} ref={imgRef} alt="preview" />
        </div>
    );
};
export default ImagePreview;

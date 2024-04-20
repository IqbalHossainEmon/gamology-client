import { useEffect, useRef, useState } from 'react';
import styles from './ImagePreview.module.css';

const ImagePreview = ({ containerRef, file, btnRef }) => {
    const [show, setShow] = useState(false);
    const [hideAnimation, setHideAnimation] = useState(false);

    const heightRef = useRef(null);
    const imagePreviewRef = useRef(null);
    const timeId = useRef(null);
    const imageRef = useRef(null);
    const srcRef = useRef(null);

    useEffect(() => {
        if (!file) return;
        srcRef.current = URL.createObjectURL(file);
        if (!imageRef.current) {
            imageRef.current = new Image();
        }
        imageRef.current.src = URL.createObjectURL(file);
        imageRef.current.onload = () => {
            // if container height more than imageRef than set height to imageRef height
            let height;
            if (imageRef.current.width + 32 > containerRef.current.clientWidth) {
                height = `${containerRef.current.clientWidth / (imageRef.current.width / imageRef.current.height)}px`;
            } else {
                height = `${imageRef.current.height + 32}px`;
            }
            if (imagePreviewRef.current) {
                imagePreviewRef.current.style.setProperty('--height', height);
                heightRef.current = height;
            } else {
                heightRef.current = height;
            }
        };
    }, [containerRef, file]);

    const handleHover = () => {
        if (timeId.current) return;
        setShow(true);
        setHideAnimation(false);
    };

    const handleLeave = () => {
        if (timeId.current) {
            clearTimeout(timeId.current);
            timeId.current = null;
        }
        setHideAnimation(true);
        timeId.current = setTimeout(() => {
            setShow(false);
            timeId.current = null;
        }, 200);
    };

    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('mouseover', handleHover);
        container.addEventListener('mouseleave', handleLeave);
        const btn = btnRef.current;
        btn.addEventListener('click', handleLeave);
        return () => {
            container.removeEventListener('mouseover', handleHover);
            container.removeEventListener('mouseleave', handleLeave);
            btn.removeEventListener('click', handleLeave);
        };
    }, [btnRef, containerRef]);

    return show ? (
        <div
            ref={imagePreviewRef}
            style={{
                '--height': heightRef.current || '100%',
            }}
            className={`${styles.imagePreview}${hideAnimation ? ` ${styles.hide}` : ''}`}
        >
            <div className={styles.imgContainer}>
                <img ref={imageRef} className={styles.img} src={srcRef.current} alt="preview" />
            </div>
        </div>
    ) : null;
};
export default ImagePreview;

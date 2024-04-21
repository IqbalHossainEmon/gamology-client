import { useEffect, useRef, useState } from 'react';
import useScreenWidth from '../../../Hooks/useScreenWidth';
import styles from './ImagePreview.module.css';

const ImagePreview = ({ containerRef, file, btnRef, parentPreview }) => {
    const [show, setShow] = useState(false);
    const [hideAnimation, setHideAnimation] = useState(false);

    const heightRef = useRef(null);
    const imagePreviewRef = useRef(null);
    const timeId = useRef(null);
    const imageRef = useRef(null);
    const srcRef = useRef(null);
    const showRef = useRef(show);
    showRef.current = show;

    const screenWidth = useScreenWidth();

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
    }, [containerRef, file, screenWidth]);

    const handleToggle = parentPrev => {
        if (parentPrev) {
            setShow(true);
            setHideAnimation(false);
        } else {
            setHideAnimation(true);
            timeId.current = setTimeout(() => {
                setShow(false);
                timeId.current = null;
            }, 200);
        }
    };

    useEffect(() => {
        if (parentPreview !== showRef.current) {
            handleToggle(parentPreview);
        }
    }, [parentPreview]);

    const handleHover = () => {
        if (timeId.current) return;
        if (timeId.showId) {
            clearTimeout(timeId.showId);
            timeId.showId = null;
        }
        timeId.showId = setTimeout(() => {
            setShow(true);
            setHideAnimation(false);
            timeId.showId = null;
        }, 200);
    };

    const handleLeave = () => {
        if (timeId.showId) {
            clearTimeout(timeId.showId);
            timeId.showId = null;
        }
        if (timeId.current) {
            clearTimeout(timeId.current);
            timeId.current = null;
        }
        if (showRef.current) {
            setHideAnimation(true);
            timeId.current = setTimeout(() => {
                setShow(false);
                timeId.current = null;
            }, 200);
        }
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
            <img ref={imageRef} className={styles.img} src={srcRef.current} alt="preview" />
        </div>
    ) : null;
};
export default ImagePreview;

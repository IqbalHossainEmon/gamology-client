import { useCallback, useEffect, useRef, useState } from 'react';
import useIsTouchAble from '../../Hooks/useIsTouchable';
import styles from './ImagePreview.module.css';

const ImagePreview = ({ containerRef, file, btnRef, parentPreview }) => {
    const [show, setShow] = useState(false);
    const [hideAnimation, setHideAnimation] = useState(false);

    const [widthHeight, setWidthHeight] = useState({ width: window.innerWidth, height: window.innerHeight });

    const eventRef = useRef(null);
    const isTouchAble = useIsTouchAble();

    eventRef.resize = () => {
        setWidthHeight({ width: window.innerWidth, height: window.innerHeight });
    };

    useEffect(() => {
        window.addEventListener('resize', eventRef.resize);
        return () => {
            window.removeEventListener('resize', eventRef.resize);
        };
    }, []);

    const heightRef = useRef(null);
    const imagePreviewRef = useRef(null);
    const timeId = useRef(null);
    const imageRef = useRef(null);
    const srcRef = useRef(null);
    const showRef = useRef(show);
    showRef.current = show;

    const calculateHeight = useCallback((currentFile, screenHeight, containerWidth) => {
        const imageTemp = new Image();
        imageTemp.src = srcRef.current;
        imageTemp.onload = () => {
            let height;
            if (imageTemp.width > containerWidth) {
                height = containerWidth / (imageTemp.width / imageTemp.height);
                if (height > screenHeight - 256 && screenHeight > 450) {
                    height = `${screenHeight - 256}px`;
                } else if (screenHeight < 450) height = `${screenHeight - 78}px`;
                else height = `${containerWidth / (imageTemp.width / imageTemp.height)}px`;
            } else {
                height = `${imageTemp.height}px`;
            }
            if (imagePreviewRef.current) {
                imagePreviewRef.current.style.setProperty('--height', height);
                heightRef.current = height;
            } else {
                heightRef.current = height;
            }
            if (currentFile instanceof File) {
                srcRef.loaded = true;
            }
        };
    }, []);

    useEffect(() => {
        if ((file && !srcRef.current) || srcRef.file !== file) {
            if (file instanceof File) {
                srcRef.current = URL.createObjectURL(file);
            } else {
                srcRef.current = file;
            }
            srcRef.file = file;
            calculateHeight(file, widthHeight.height, containerRef.current.clientWidth);
        } else if (srcRef.current) {
            calculateHeight(file, widthHeight.height, containerRef.current.clientWidth);
        }

        return () => {
            if (srcRef.current && srcRef.loaded) {
                URL.revokeObjectURL(srcRef.current);
                srcRef.current = null;
            }
        };
    }, [calculateHeight, containerRef, file, widthHeight]);

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

    const handleHover = useCallback(() => {
        if (!isTouchAble()) {
            if (timeId.current) return;
            if (timeId.showId) {
                clearTimeout(timeId.showId);
                timeId.showId = null;
            }
            timeId.showId = setTimeout(() => {
                setShow(true);
                setHideAnimation(false);
                timeId.showId = null;
            }, 600);
        }
    }, [isTouchAble]);

    const handleLeave = useCallback(() => {
        if (!isTouchAble()) {
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
        }
    }, [isTouchAble]);

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
    }, [btnRef, containerRef, handleHover, handleLeave]);

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

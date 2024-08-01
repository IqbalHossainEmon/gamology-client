import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './DiscoverBannerItemCardShadow.module.css';

const DiscoverBannerItemCardShadow = ({ isPause }) => {
    const [translate, setTranslate] = useState(0);

    const timerId = useRef(null);
    const startTime = useRef(null);
    const translateRef = useRef(translate);
    translateRef.current = translate;

    const prevTranslate = useRef(0);

    const cancelAnimation = useCallback(isPaused => {
        if (timerId.current) {
            if (isPaused) {
                prevTranslate.current = translateRef.current;
            }
            cancelAnimationFrame(timerId.current);
            startTime.current = null; // Reset start time
            timerId.current = null;
        }
    }, []);

    const animate = useCallback(
        timestamp => {
            if (!startTime.current) startTime.current = timestamp;
            const elapsed = timestamp - startTime.current;

            if (elapsed >= 7750) {
                cancelAnimation();
                return;
            }
            setTranslate(Math.min(prevTranslate.current + 0.0129032258 * elapsed, 100));
            timerId.current = requestAnimationFrame(animate);
        },
        [cancelAnimation]
    );

    const handleStartOrResume = useCallback(() => {
        if (timerId.current) {
            cancelAnimation();
        }
        timerId.current = requestAnimationFrame(animate);
    }, [animate, cancelAnimation]);

    useEffect(() => {
        if (isPause) {
            cancelAnimation(true);
        } else {
            handleStartOrResume();
        }

        return () => {
            if (timerId.current) cancelAnimationFrame(timerId.current);
        };
    }, [isPause, cancelAnimation, handleStartOrResume]);

    return (
        <div className={styles.shadowContainer}>
            <div
                style={{
                    transform: `translateY(${translate}%)`,
                }}
                className={styles.shadow}
            />
        </div>
    );
};

export default DiscoverBannerItemCardShadow;

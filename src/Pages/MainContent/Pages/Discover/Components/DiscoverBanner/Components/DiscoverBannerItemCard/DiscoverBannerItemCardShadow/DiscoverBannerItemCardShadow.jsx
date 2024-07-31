import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './DiscoverBannerItemCardShadow.module.css';

const DiscoverBannerItemCardShadow = ({ isPause }) => {
    const [translate, setTranslate] = useState(0);

    const timeId = useRef(null);
    const counter = useRef(0);
    const prevIsPause = useRef(isPause);

    const animate = useCallback(() => {
        if (counter.current >= 500) {
            cancelAnimationFrame(timeId.current);
            timeId.current = null;
            return;
        }
        counter.current += 1;
        setTranslate(prev => (prev + 0.2 < 100 ? prev + 0.2 : 100));
        timeId.current = requestAnimationFrame(animate);
    }, []);

    const handleStartOrResume = useCallback(() => {
        if (timeId.current) return;
        timeId.current = requestAnimationFrame(animate);
    }, [animate]);

    const handlePause = useCallback(() => {
        if (timeId.current) {
            cancelAnimationFrame(timeId.current);
            timeId.current = null;
        }
    }, []);

    useEffect(() => {
        if (isPause) {
            handlePause();
        } else if (prevIsPause.current !== isPause) {
            handleStartOrResume();
        } else {
            const timeoutId = setTimeout(handleStartOrResume, 900);
            return () => clearTimeout(timeoutId);
        }
        prevIsPause.current = isPause;

        return () => {
            if (timeId.current) cancelAnimationFrame(timeId.current);
        };
    }, [isPause, handlePause, handleStartOrResume]);

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

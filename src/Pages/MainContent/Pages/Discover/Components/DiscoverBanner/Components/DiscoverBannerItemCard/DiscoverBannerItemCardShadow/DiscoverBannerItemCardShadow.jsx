import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './DiscoverBannerItemCardShadow.module.css';

const DiscoverBannerItemCardShadow = ({ isPause }) => {
    const [translate, setTranslate] = useState(-100);

    const timeId = useRef(null);
    const counter = useRef(0);
    const prevIsPause = useRef(isPause);

    const handleStartOrResume = useCallback(() => {
        if (timeId.current) return;
        timeId.current = setInterval(() => {
            switch (counter.current) {
                case 500:
                    clearInterval(timeId.current);
                    break;
                default:
                    counter.current += 1;
                    setTranslate(prev => (prev + 0.2 < 0 ? prev + 0.2 : 0));
            }
        }, 16);
    }, []);

    const handlePause = useCallback(() => {
        clearInterval(timeId.current);
        timeId.current = null;
    }, []);

    useEffect(() => {
        switch (isPause) {
            case true:
                handlePause();
                break;
            default:
                switch (prevIsPause.current) {
                    case isPause:
                        setTimeout(() => {
                            handleStartOrResume();
                        }, 900);
                        break;
                    default:
                        handleStartOrResume();
                        break;
                }
                break;
        }
        prevIsPause.current = isPause;

        return () => {
            if (timeId.current) clearInterval(timeId.current);
        };
    }, [handlePause, handleStartOrResume, isPause]);

    return (
        <div className={styles.shadowContainer}>
            <div
                style={{
                    translate: `0 ${translate}%`,
                }}
                className={styles.shadow}
            />
        </div>
    );
};
export default DiscoverBannerItemCardShadow;

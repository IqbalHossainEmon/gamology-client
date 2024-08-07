import { useEffect, useRef, useState } from 'react';
import useAppearDisappear from '../../../../../../../../../../Hooks/useAppearDisappear';
import DiscoverBannerItemCardShadow from '../DiscoverBannerItemCardShadow/DiscoverBannerItemCardShadow';
import styles from './CardNameContainer.module.css';

const CardNameContainer = ({ state, name, isPause }) => {
    const { show, fadeIn } = useAppearDisappear(state, true);
    const timerId = useRef(null);

    const [showShadow, setShowShadow] = useState(false);

    useEffect(() => {
        if (show) {
            if (timerId.current) {
                clearTimeout(timerId.current);
            }
            timerId.current = setTimeout(() => {
                timerId.current = null;
                setShowShadow(true);
            }, 1300);
        } else {
            setShowShadow(false);
        }
    }, [show]);
    return (
        show && (
            <div className={styles.cardNameContainer}>
                <div className={`${styles.cardName}${fadeIn ? ` ${styles.fadeIn}` : ''}`}>
                    <p className={styles.cardNameText}>{name}</p>
                    {showShadow && <DiscoverBannerItemCardShadow isPause={isPause} />}
                </div>
            </div>
        )
    );
};
export default CardNameContainer;

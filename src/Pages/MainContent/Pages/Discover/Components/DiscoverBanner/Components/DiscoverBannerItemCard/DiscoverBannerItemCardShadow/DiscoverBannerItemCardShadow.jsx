import { useState } from 'react';
import styles from './DiscoverBannerItemCardShadow.module.css';

const DiscoverBannerItemCardShadow = ({ isPause }) => {
    const [translate, setTranslate] = useState(0);

    return (
        <div className={styles.shadowContainer}>
            <div id={isPause ? styles.pause : styles.play} className={styles.shadow} />
        </div>
    );
};
export default DiscoverBannerItemCardShadow;

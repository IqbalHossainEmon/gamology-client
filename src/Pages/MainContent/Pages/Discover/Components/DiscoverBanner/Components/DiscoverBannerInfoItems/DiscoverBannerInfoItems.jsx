import DiscoverBannerInfoItem from '../DiscoverBannerInfoItem/DiscoverBannerInfoItem';
import styles from './DiscoverBannerInfoItems.module.css';

export default function DiscoverBannerInfoItems({ data, bannerState, activeBanner }) {
    return (
        <div className={styles.infoItems}>
            {data.map(({ id, logoImg, name, price }, index) => (
                <DiscoverBannerInfoItem
                    activeBanner={activeBanner}
                    banner={{ id: index, logoImg, price, name }}
                    bannerState={bannerState}
                    key={id}
                />
            ))}
        </div>
    );
}

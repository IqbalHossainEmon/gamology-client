import DiscountPrice from '../../../../../../../../Shared/DiscountPrice/DiscountPrice';
import styles from './DiscoverBannerInfoItem.module.css';

export default function DiscoverBannerInfoItem({ banner, bannerState, activeBanner }) {
    const { logoImg, name, id, price } = banner;
    const idState = activeBanner(id, bannerState, styles);

    return (
        <div className={styles.itemInfo} id={idState}>
            <img className={styles.logoImg} src={logoImg} alt={`${name} Logo-${id + 1}`} />
            {price === 'Free' || price === 'free' ? (
                <p className={styles.priceContainer}>Free</p>
            ) : (
                <p className={styles.priceContainer}>
                    <span>Starts at </span>
                    <DiscountPrice className={styles.price} price={price} />
                </p>
            )}
        </div>
    );
}

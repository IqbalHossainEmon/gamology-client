import DiscountPrice from '../../Shared/DiscountPrice/DiscountPrice';
import useBannerState from '../useBannerState/useBannerState';
import styles from './InfoItem.module.css';

export default function ItemInfo({ banner, bannerState }) {
  const { logoImg, name, id, price } = banner;
  const { activeBanner } = useBannerState();
  const idState = activeBanner(id, bannerState, styles);
  return (
    <div className={styles.itemInfo} id={idState || ''}>
      <img className={styles.logoImg} src={logoImg} alt={`${name} Logo-${id + 1}`} />
      {price === 'Free' || price === 'free' ? (
        <div className={styles.price}>Free</div>
      ) : (
        <div className={styles.price}>
          <span className={styles.space}>Starts at </span>
          <DiscountPrice className={styles.price} price={price} />
        </div>
      )}
    </div>
  );
}

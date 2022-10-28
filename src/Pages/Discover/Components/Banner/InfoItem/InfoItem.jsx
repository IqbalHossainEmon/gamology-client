import useBannerState from '../useBannerState/useBannerState';
import styles from './InfoItem.module.css';

export default function ItemInfo({ banner, bannerState }) {
  const { logoImg, name, id } = banner;
  const { activeBanner } = useBannerState();
  const idState = activeBanner(id, bannerState, styles);

  return (
    <div className={styles.itemInfo} id={idState || ''}>
      <img className={styles.logoImg} src={logoImg} alt={`${name} Logo-${id + 1}`} />
    </div>
  );
}

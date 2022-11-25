import useBannerState from '../useBannerState/useBannerState';
import styles from './Item.module.css';

export default function Item({ banner, bannerState }) {
  const { coverImg, name, id } = banner;
  const { activeBanner } = useBannerState();
  const idState = activeBanner(id, bannerState, styles);

  return (
    <div className={`${styles.carouselItem} ${!idState ? styles.itemHide : ''}`} id={idState || ''}>
      <img src={coverImg} className={styles.carouselImg} alt={`${name} carousel cover-${id + 1}`} />
      <div className={styles.itemButton}>
        <button type="button">buy now</button>
      </div>
    </div>
  );
}

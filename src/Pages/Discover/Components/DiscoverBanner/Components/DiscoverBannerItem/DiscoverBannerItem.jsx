import useBannerLogics from '../../useBannerLogics/useBannerLogics';
import styles from './DiscoverBannerItem.module.css';

export default function DiscoverBannerItem({ banner, bannerState }) {
  const { coverImg, name, id } = banner;
  const { activeBanner } = useBannerLogics();
  const idState = activeBanner(id, bannerState, styles);

  return (
    <div
      {...(idState
        ? { className: styles.carouselItem, id: idState }
        : { className: styles.itemHide })}
    >
      <img
        src={coverImg}
        className={styles.carouselImg}
        alt={`${name} carousel cover-${id + 1}`}
      />
      <div className={styles.itemButton}>
        <button type="button">buy now</button>
      </div>
    </div>
  );
}

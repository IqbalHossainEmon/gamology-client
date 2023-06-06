import DiscoverBannerItem from '../DiscoverBannerItem/DiscoverBannerItem';
import DiscoverBannerItemMobile from '../DiscoverBannerItemMobile/DiscoverBannerItemMobile';
import styles from './DiscoverBannerItems.module.css';

export default function DiscoverBannerItems({
  data,
  bannerState,
  cardsPosition,
  screenWidth,
}) {
  return (
    <div className={styles.carouselItems}>
      {data.map(({ coverMobile, coverImg, id, name }) =>
        screenWidth > 768 ? (
          <DiscoverBannerItem
            key={id}
            banner={{ coverImg, id, name }}
            bannerState={bannerState}
          />
        ) : (
          <DiscoverBannerItemMobile
            key={id}
            banner={{ coverMobile, id, name }}
            cardsPosition={cardsPosition}
          />
        ),
      )}
    </div>
  );
}

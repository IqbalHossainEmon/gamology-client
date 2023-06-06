import DiscoverBannerInfoItem from '../DiscoverBannerInfoItem/DiscoverBannerInfoItem';
import styles from './DiscoverBannerInfoItems.module.css';

export default function DiscoverBannerInfoItems({
  data,
  bannerState,
  activeBanner,
}) {
  return (
    <div className={styles.infoItems}>
      {data.map(({ id, logoImg, name, price }) => (
        <DiscoverBannerInfoItem
          key={id}
          bannerState={bannerState}
          activeBanner={activeBanner}
          banner={{ id, logoImg, price, name }}
        />
      ))}
    </div>
  );
}

import ItemInfo from '../InfoItem/InfoItem';
import styles from './InfoItems.module.css';

export default function InfoItems({ data, bannerState, activeBanner }) {
  return (
    <div className={styles.infoItems}>
      {data.map(({ id, logoImg, name, price }) => (
        <ItemInfo
          key={id}
          bannerState={bannerState}
          activeBanner={activeBanner}
          banner={{ id, logoImg, price, name }}
        />
      ))}
    </div>
  );
}

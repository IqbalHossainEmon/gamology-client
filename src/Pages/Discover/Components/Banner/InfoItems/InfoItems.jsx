import ItemInfo from '../InfoItem/InfoItem';
import styles from './InfoItems.module.css';

export default function InfoItems({ data, bannerState }) {
  return (
    <div className={styles.infoItems}>
      {data.map(({ id, logoImg, name }) => (
        <ItemInfo key={id} bannerState={bannerState} banner={{ id, logoImg, name }} />
      ))}
    </div>
  );
}

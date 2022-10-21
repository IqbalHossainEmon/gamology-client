import Item from '../Item/Item';
import styles from './Items.module.css';

export default function Items({ data, bannerState }) {
  return (
    <div className={styles.carouselItems}>
      {data.map((banner) => (
        <Item
          key={banner.id}
          banner={{ coverImg: banner.coverImg, id: banner.id }}
          bannerState={bannerState}
        />
      ))}
    </div>
  );
}

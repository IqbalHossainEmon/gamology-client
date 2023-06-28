import IndividualGameBannerItem from '../IndividualGameBannerItem/IndividualGameBannerItem';
import styles from './IndividualGameBannerItems.module.css';

export default function IndividualGameBannerItems({ items }) {
  return (
    <ul className={styles.individualGameBannerItems}>
      {/* {items.map((item) => (
        <IndividualGameBannerItem key={item.id} data={item} />
      ))} */}
      <IndividualGameBannerItem data={items[0]} />
    </ul>
  );
}

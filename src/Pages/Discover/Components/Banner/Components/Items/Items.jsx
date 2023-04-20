import Item from '../Item/Item';
import ItemMobile from '../ItemMobile/ItemMobile';
import styles from './Items.module.css';

export default function Items({ data, bannerState, cardsPosition, screenWidth }) {
  return (
    <div className={styles.carouselItems}>
      {data.map(({ coverMobile, coverImg, id, name }) =>
        screenWidth > 768 ? (
          <Item key={id} banner={{ coverImg, id, name }} bannerState={bannerState} />
        ) : (
          <ItemMobile key={id} banner={{ coverMobile, id, name }} cardsPosition={cardsPosition} />
        ),
      )}
    </div>
  );
}

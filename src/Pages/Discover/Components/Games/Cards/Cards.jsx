import Card from '../../../../../Shared/Card/Card';
import styles from './Cards.module.css';

export default function Cards({ data, translate }) {
  const style = {
    translate: `calc(${translate})`,
  };
  return (
    <div className={styles.Cards}>
      <div className={styles.CardSlider} style={style}>
        {data.map(({ id, name, carouselThumb, price, category }) => (
          <Card key={id} cardInfo={{ id, name, carouselThumb, price, category }} />
        ))}
      </div>
    </div>
  );
}

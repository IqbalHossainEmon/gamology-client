import { forwardRef } from 'react';
import Card from '../../../../../../../../Shared/Card/Card';
import styles from './DiscoverGamesCards.module.css';

function DiscoverGamesCards({ data, style, cardsWidth }, ref) {
  return (
    <div ref={ref} className={styles.Cards}>
      <ul
        className={`${style.transition ? `${styles.transition} ` : ''}${styles.CardSlider}`}
        style={{ translate: `${style.translate}px` }}
      >
        {data.map(({ id, name, carouselThumb, price, category }) => (
          <Card
            className={styles.card}
            style={{ width: `${cardsWidth}px`, marginRight: `${style.margin}px` }}
            key={id}
            cardInfo={{ id, name, carouselThumb, price, category }}
          />
        ))}
      </ul>
    </div>
  );
}

export default forwardRef(DiscoverGamesCards);

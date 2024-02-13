import { forwardRef } from 'react';
import Card from '../../../../../../../../Shared/Card/Card';
import styles from './DiscoverGamesCards.module.css';

function DiscoverGamesCards({ data, style, cardsWidth }, ref) {
  return (
    <div ref={ref} className={styles.Cards}>
      <ul className={styles.CardSlider} style={style}>
        {data.map(({ id, name, carouselThumb, price, category }) => (
          <Card cardsWidth={cardsWidth} key={id} cardInfo={{ id, name, carouselThumb, price, category }} slider />
        ))}
      </ul>
    </div>
  );
}

export default forwardRef(DiscoverGamesCards);

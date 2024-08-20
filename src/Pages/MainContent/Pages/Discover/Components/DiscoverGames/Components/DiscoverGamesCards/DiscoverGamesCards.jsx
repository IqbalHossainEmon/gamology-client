import { forwardRef } from 'react';
import Card from '../../../../../../../../Shared/Card/Card';
import styles from './DiscoverGamesCards.module.css';

function DiscoverGamesCards({ data, style, cardsWidth }, ref) {
    return (
        <div
            className={styles.Cards}
            ref={ref}
        >
            <ul
                className={`${style.transition ? `${styles.transition} ` : ''}${styles.CardSlider}`}
                style={{ translate: `${style.translate}px` }}
            >
                {data.map(({ id, name, carouselThumb, price, category }) => (
                    <Card
                        cardInfo={{ id, name, carouselThumb, price, category }}
                        className={styles.card}
                        key={id}
                        style={{ width: `${cardsWidth}px`, marginRight: `${style.margin}px` }}
                    />
                ))}
            </ul>
        </div>
    );
}

export default forwardRef(DiscoverGamesCards);

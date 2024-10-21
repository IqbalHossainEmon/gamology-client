import { forwardRef } from 'react';
import Card from '../../../Card/Card';
import styles from './HorizontalCards.module.css';

function HorizontalCards({ data, style, cardsWidth, extraCard, cardHovers }, ref) {
	return (
		<div className={styles.Cards} ref={ref}>
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
					>
						{cardHovers && cardHovers}
					</Card>
				))}
				{extraCard || null}
			</ul>
		</div>
	);
}

export default forwardRef(HorizontalCards);

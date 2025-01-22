import { forwardRef } from 'react';
import Card from '../../../Card/Card';
import styles from './HorizontalCards.module.css';

function HorizontalCards(
	{ data, cardsWidth, extraCard, cardHovers, cardActive, margin, transition },
	ref
) {
	return (
		<div className={styles.cardsContainer} ref={ref}>
			{!!cardsWidth && (
				<ul
					className={`${transition ? `${styles.transition} ` : ''} ${styles.cardSlider}`}
					style={{ translate: `${-(cardsWidth * cardActive + margin * cardActive)}px` }}
				>
					{data.map(({ id, name, carouselThumb, price, category }) => (
						<Card
							cardInfo={{ id, name, img: carouselThumb, price, category }}
							key={id}
							style={{ width: `${cardsWidth}px`, marginRight: `${margin}px` }}
						>
							{cardHovers || null}
						</Card>
					))}
					{extraCard ? extraCard(cardsWidth, margin) : null}
				</ul>
			)}
		</div>
	);
}

export default forwardRef(HorizontalCards);

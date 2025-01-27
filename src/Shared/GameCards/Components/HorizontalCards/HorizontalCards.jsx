import { forwardRef } from 'react';
import Card from '../../../Card/Card';
import styles from './HorizontalCards.module.css';

function HorizontalCards(
	{ data, cardsWidth, extraCard, cardHovers, cardActive, transition, link },
	ref
) {
	return (
		<div className={styles.cardsContainer} ref={ref}>
			{!!cardsWidth && (
				<ul
					className={`${transition ? `${styles.transition} ` : ''} ${styles.cardSlider}`}
					style={{ translate: `${-(cardsWidth * cardActive + 20 * cardActive)}px` }}
				>
					{data.map(({ id, name, carouselThumb, price, category }) => (
						<Card
							link={link}
							cardInfo={{ id, name, img: carouselThumb, price, category }}
							key={id}
							style={{ width: `${cardsWidth}px` }}
						>
							{cardHovers || null}
						</Card>
					))}
					{extraCard ? extraCard(cardsWidth) : null}
				</ul>
			)}
		</div>
	);
}

export default forwardRef(HorizontalCards);

import { forwardRef } from 'react';
import Card from '../../../Card/Card';
import styles from './HorizontalCards.module.css';

function HorizontalCards(
	{ data, cardsWidth, extraCard, dotMenu, cardActive, transition, link, cardOnDeck },
	ref
) {
	return (
		<div className={styles.cardsContainer} ref={ref}>
			{!!cardsWidth && (
				<ul
					className={`${transition ? `${styles.transition} ` : ''}${styles.cardSlider}`}
					style={{ translate: `${-(cardsWidth * cardActive + 20 * cardActive)}px` }}
				>
					{data.map(({ id, name, carouselThumb, price, category }, i) => (
						<Card
							link={link}
							cardInfo={{ id, name, img: carouselThumb, price, category }}
							key={id}
							isCurrentlyActive={i >= cardActive && i < cardActive + cardOnDeck}
							style={{ width: `${cardsWidth}px` }}
							dotMenu={dotMenu}
						/>
					))}
					{extraCard ? extraCard(cardsWidth) : null}
				</ul>
			)}
		</div>
	);
}

export default forwardRef(HorizontalCards);

import { useEffect, useRef } from 'react';
import ArrowButton from '../../../../../../../../../../Shared/ArrowButton/ArrowButton';
import useScreenWidth from '../../../../../../../../../../Utils/Hooks/useScreenWidth';
import IndiGameBannerCard from '../IndiGameBannerCard/IndiGameBannerCard';
import styles from './IndiGameBannerCards.module.css';

export default function IndiGameBannerCards({
	active,
	items,
	dispatch,
	timerFunction,
	cardsOnDeck,
	cardActive,
	thumbTransition,
}) {
	const { widthInRem } = useScreenWidth();
	const cardsOnDeckRef = useRef(cardsOnDeck);
	cardsOnDeckRef.current = cardsOnDeck;

	useEffect(() => {
		let cards = 8;

		if (widthInRem <= 133.375 && widthInRem >= 106.25) {
			cards = 7;
		} else if (widthInRem <= 106.1875 && widthInRem >= 91.5) {
			cards = 6;
		} else if (
			(widthInRem <= 91.4375 && widthInRem >= 78.75) ||
			(widthInRem <= 63.9375 && widthInRem >= 53.75) ||
			(widthInRem <= 48 && widthInRem >= 38.25)
		) {
			cards = 5;
		} else if (
			(widthInRem <= 78.6875 && widthInRem >= 64) ||
			(widthInRem <= 53.6875 && widthInRem >= 48.0625) ||
			(widthInRem <= 38.1875 && widthInRem >= 33.125)
		) {
			cards = 4;
		} else if (widthInRem <= 33.0625 && widthInRem >= 25.25) {
			cards = 3;
		} else if (widthInRem <= 25.1875 && widthInRem >= 19.5) {
			cards = 2;
		} else if (widthInRem <= 19.4375 && widthInRem >= 0) {
			cards = 1;
		}

		if (cardsOnDeckRef.current !== cards) {
			dispatch({ type: 'screenSizeChange', cardsOnDeck: cards });
		}
	}, [dispatch, widthInRem]);

	return (
		<div className={styles.cardsContainer}>
			<ArrowButton
				className={[styles.btn, styles.prevBtn].join(' ')}
				handleClick={() => {
					dispatch({ type: 'prevCards' });
					timerFunction(false, dispatch, 250);
				}}
				name='Previous Button'
			/>
			<div className={styles.cardsWrapper}>
				<ul
					className={styles.individualGameBannerCards}
					style={
						thumbTransition
							? {
									width: `${Math.ceil(items.length / cardsOnDeck) * 100}%`,
									translate: `calc(-${
										Math.ceil(items.length / cardsOnDeck)
											? (100 / Math.ceil(items.length / cardsOnDeck)) *
												cardActive
											: 0
									}% - ${cardsOnDeck > 1 ? cardActive * 15 : 0}px)`,
									transition: 'translate 250ms',
								}
							: {
									width: `${Math.ceil(items.length / cardsOnDeck) * 100}%`,
									translate: `calc(-${
										Math.ceil(items.length / cardsOnDeck)
											? (100 / Math.ceil(items.length / cardsOnDeck)) *
												cardActive
											: 0
									}% - ${cardsOnDeck > 1 ? cardActive * 15 : 0}px)`,
								}
					}
				>
					{items.map((item, index) => (
						<IndiGameBannerCard
							active={active}
							data={item}
							dispatch={dispatch}
							index={index}
							key={item.id}
							timerFunction={timerFunction}
						/>
					))}
				</ul>
			</div>
			<ArrowButton
				className={[styles.btn, styles.nextBtn].join(' ')}
				handleClick={() => {
					dispatch({ type: 'nextCards' });
					timerFunction(false, dispatch, 250);
				}}
				name='next Button'
			/>
		</div>
	);
}

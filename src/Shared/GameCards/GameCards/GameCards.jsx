import { useEffect, useReducer, useRef } from 'react';
import GamesButton from '../Components/GameCardsButtons/GameCardsButtons';
import CardsHeader from '../Components/GameCardsHeader/GameCardsHeader';
import HorizontalCards from '../Components/HorizontalCards/HorizontalCards';
import gameCardsReducerInitialValue from '../useGamesLogics/gameCardsReducerInitialValue';
import useGameCardsLogics from '../useGamesLogics/useGameCardsLogics';
import styles from './GameCards.module.css';

export default function GameCards({ headerTitle, items, extraCard, cardHovers }) {
	const cardsContainer = useRef();
	const { reducer, initialState } = gameCardsReducerInitialValue();
	const [{ data, cardActive, cardsWidth, cardOnDeck, margin, transition }, dispatch] = useReducer(
		reducer,
		initialState
	);
	const { handleClick, setReference, setCardsOnScreenWidthChange } = useGameCardsLogics();

	useEffect(() => {
		// call using link to fetch data

		dispatch({ type: 'fetch', data: items, dataLength: items.length + (extraCard ? 1 : 0) });
		setReference(dispatch);
	}, [extraCard, items, setReference]);

	useEffect(() => {
		const observerFunction = () => {
			setCardsOnScreenWidthChange(cardsContainer.current);
		};

		const observer = new ResizeObserver(observerFunction);

		observer.observe(cardsContainer.current);

		return () => {
			observer.disconnect();
		};
	}, [setCardsOnScreenWidthChange]);

	return (
		<div className={styles.games}>
			<div className={styles.headerButtonContainer}>
				<CardsHeader headerTitle={headerTitle} />
				<GamesButton
					cardActive={cardActive}
					handleClick={event => handleClick(event)}
					length={data.length - cardOnDeck}
				/>
			</div>
			<HorizontalCards
				cardsWidth={cardsWidth}
				data={data}
				ref={cardsContainer}
				cardActive={cardActive}
				margin={margin}
				transition={transition}
				cardHovers={cardHovers}
				extraCard={extraCard}
			/>
		</div>
	);
}

import { useEffect, useReducer, useRef } from 'react';
import GamesButton from '../Components/GameCardsButtons/GameCardsButtons';
import CardsHeader from '../Components/GameCardsHeader/GameCardsHeader';
import HorizontalCards from '../Components/HorizontalCards/HorizontalCards';
import gameCardsReducerInitialValue from '../utils/gameCardsReducerInitialValue';
import useGameCardsLogics from '../utils/useGameCardsLogics';
import styles from './GameCards.module.css';

export default function GameCards({
	headerTitle,
	items,
	extraCard,
	dotMenu,
	customHeader,
	scrollToLast,
	link,
}) {
	const cardsContainer = useRef(null);
	const { reducer, initialState } = gameCardsReducerInitialValue();
	const [{ data, dataLength, cardActive, cardsWidth, cardOnDeck, transition }, dispatch] =
		useReducer(reducer, initialState);
	const { handleClick, setReference, setCardsOnScreenWidthChange } = useGameCardsLogics();

	const isFirstTimeRef = useRef(true);

	useEffect(() => {
		dispatch({
			type: 'dataChange',
			data: items,
			dataLength: items.length + (extraCard ? 1 : 0),
			scrollToLast,
		});
		setReference(dispatch);
	}, [extraCard, items, scrollToLast, setReference]);

	useEffect(() => {
		const observerFunction = () => {
			setCardsOnScreenWidthChange(
				cardsContainer.current,
				isFirstTimeRef.current && scrollToLast
			);
			isFirstTimeRef.current = false;
		};

		const observer = new ResizeObserver(observerFunction);

		observer.observe(cardsContainer.current);

		return () => {
			observer.disconnect();
		};
	}, [scrollToLast, setCardsOnScreenWidthChange]);

	return (
		<div className={styles.games}>
			<div className={styles.headerButtonContainer}>
				{customHeader || <CardsHeader headerTitle={headerTitle} />}
				<GamesButton
					cardActive={cardsWidth ? cardActive : 0}
					handleClick={event => handleClick(event)}
					length={dataLength - cardOnDeck}
				/>
			</div>
			<HorizontalCards
				cardsWidth={cardsWidth}
				data={data}
				ref={cardsContainer}
				cardActive={cardActive}
				transition={transition}
				dotMenu={dotMenu}
				extraCard={extraCard}
				link={link}
			/>
		</div>
	);
}

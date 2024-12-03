import { useRef } from 'react';

export default function useGameCardsLogics() {
	const referenceRef = useRef(null);
	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			// This function get calls after every change of cards and turns off the transition of translate of the cards.
			timerFunction: () => {
				referenceRef.timerId = setTimeout(() => {
					referenceRef.dispatch({ type: 'transitionStop' });
					referenceRef.timerId = null;
				}, 400);
			},

			// This function give the reference of dispatch and stores it in a ref.
			setReference: dispatch => {
				referenceRef.dispatch = dispatch;
			},

			// This function handles clicks in the cards change.
			handleClick: (click, cardActive, cardOnDeck) => {
				if (click === 'next') {
					referenceRef.dispatch({
						type: 'next',
						nextActiveCard: cardActive - cardOnDeck,
					});
				} else if (click === 'prev') {
					referenceRef.dispatch({
						type: 'prev',
						nextActiveCard: cardActive + cardOnDeck,
					});
				}

				if (referenceRef.timerId) {
					clearTimeout(referenceRef.timerId);
					referenceRef.timerId = null;
					eventRefs.current.timerFunction();
				} else {
					eventRefs.current.timerFunction();
				}
			},

			// This function checks screen widths and set cards on deck and send it through dispatch.
			setCardsOnScreenWidthChange: (screenWidth, cardsContainer) => {
				let cardOnOneDeck, margin;
				if (screenWidth >= 1600) {
					cardOnOneDeck = 6;
					margin = 32;
				} else if (screenWidth >= 1024 && screenWidth <= 1599) {
					cardOnOneDeck = 5;
					if (screenWidth >= 1440 && screenWidth <= 1599) {
						margin = 20;
					} else {
						margin = 16;
					}
				} else if (screenWidth >= 769 && screenWidth <= 1023) {
					cardOnOneDeck = 4;
					margin = 15;
				} else if (screenWidth >= 592 && screenWidth <= 768) {
					cardOnOneDeck = 3;
					margin = 10;
				} else if (screenWidth >= 326 && screenWidth <= 591) {
					cardOnOneDeck = 2;
					margin = 10;
				} else if (screenWidth <= 325) {
					cardOnOneDeck = 1;
					margin = 10;
				}

				referenceRef.dispatch({
					type: 'screenWidthChange',
					width:
						(cardsContainer.offsetWidth - 16) / cardOnOneDeck -
						(margin * (cardOnOneDeck - 1)) / cardOnOneDeck,
					margin,
					cardOnDeck: cardOnOneDeck,
				});
			},
		};
	}
	return {
		handleClick: eventRefs.current.handleClick,
		setReference: eventRefs.current.setReference,
		setCardsOnScreenWidthChange: eventRefs.current.setCardsOnScreenWidthChange,
	};
}

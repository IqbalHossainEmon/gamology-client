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
			handleClick: click => {
				switch (click) {
					case 'next':
						referenceRef.dispatch({
							type: 'next',
						});
						break;
					case 'prev':
						referenceRef.dispatch({
							type: 'prev',
						});
						break;
					default:
				}

				if (referenceRef.timerId) {
					clearTimeout(referenceRef.timerId);
					referenceRef.timerId = null;
				}
				eventRefs.current.timerFunction();
			},

			// This function checks screen widths and set cards on deck and send it through dispatch.
			setCardsOnScreenWidthChange: (cardsContainer, scrollToLast) => {
				let cardOnOneDeck;

				const screenWidth = window.innerWidth;

				if (screenWidth >= 1600) {
					cardOnOneDeck = 6;
				} else if (screenWidth >= 1024 && screenWidth <= 1599) {
					cardOnOneDeck = 5;
				} else if (screenWidth >= 769 && screenWidth <= 1023) {
					cardOnOneDeck = 4;
				} else if (screenWidth >= 592 && screenWidth <= 768) {
					cardOnOneDeck = 3;
				} else if (screenWidth >= 326 && screenWidth <= 591) {
					cardOnOneDeck = 2;
				} else if (screenWidth <= 325) {
					cardOnOneDeck = 1;
				}

				referenceRef.dispatch({
					type: 'screenWidthChange',
					width:
						(cardsContainer.offsetWidth ? cardsContainer.offsetWidth - 16 : 0) /
							cardOnOneDeck -
						(20 * (cardOnOneDeck - 1)) / cardOnOneDeck,
					cardOnDeck: cardOnOneDeck,
					scrollToLast,
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

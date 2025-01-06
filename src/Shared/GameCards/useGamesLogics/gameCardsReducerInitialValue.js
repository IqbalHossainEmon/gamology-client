const initialState = {
	data: [],
	dataLength: 0,
	cardsWidth: 0,
	cardActive: 0,
	cardOnDeck: 0,
	margin: 0,
	transition: false,
};

const reducer = (state, action) => {
	const { dataLength, cardActive, cardOnDeck } = state;

	switch (action.type) {
		case 'dataChange':
			return {
				...state,
				data: action.data,
				dataLength: action.dataLength,
				cardActive:
					action.dataLength - 1 - cardOnDeck === cardActive
						? cardActive % cardOnDeck
							? cardActive + 1
							: action.dataLength - 1
						: cardActive > action.dataLength
							? action.dataLength - 1
							: cardActive,
			};
		case 'screenWidthChange':
			const newCardActive = action.scrollToLast
				? dataLength - action.cardOnDeck < 0
					? 0
					: dataLength - action.cardOnDeck
				: cardOnDeck !== action.cardOnDeck
					? cardActive + cardOnDeck === dataLength
						? dataLength - action.cardOnDeck
						: cardActive % action.cardOnDeck
							? dataLength - action.cardOnDeck
								? cardActive - (cardActive % action.cardOnDeck)
								: cardActive
							: cardActive
					: cardActive;

			return {
				...state,
				cardsWidth: action.width,
				cardOnDeck: action.cardOnDeck,
				cardActive: newCardActive,
				margin: action.margin,
			};
		case 'next':
			const nextProbableActive = cardActive + cardOnDeck;
			return {
				...state,
				cardActive:
					nextProbableActive + cardOnDeck >= dataLength
						? dataLength - cardOnDeck
						: nextProbableActive,
				transition: true,
			};
		case 'prev':
			const prevProbableActive = cardActive - cardOnDeck;
			return {
				...state,
				cardActive:
					cardActive % cardOnDeck
						? cardActive - (cardActive % cardOnDeck)
						: prevProbableActive < 0
							? 0
							: prevProbableActive,
				transition: true,
			};
		case 'transitionStop':
			return {
				...state,
				transition: false,
			};

		default:
			return state;
	}
};

export default function gameCardsReducerInitialValue() {
	return { initialState, reducer };
}

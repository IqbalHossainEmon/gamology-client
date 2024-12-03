const initialState = {
	data: [],
	dataLength: 0,
	cardsWidth: 0,
	cardActive: 0,
	cardOnDeck: 0,
	translate: 0,
	margin: 0,
	transition: false,
	oneDeckLength: 0,
	extraCard: 0,
};

const calculateTranslate = (width, cardActive, cardOnDeck, margin) =>
	width * cardActive - margin * -cardActive;

const reducer = (state, action) => {
	switch (action.type) {
		case 'fetch':
			return { ...state, data: action.data, dataLength: action.dataLength };
		case 'screenWidthChange':
			console.log(state.cardActive % action.cardOnDeck !== 0);

			const newCardActive =
				action.cardOnDeck !== state.cardOnDeck &&
				state.cardOnDeck &&
				state.cardActive % action.cardOnDeck !== 0
					? state.cardActive - (state.cardActive % action.cardOnDeck)
					: state.cardActive;
			return {
				...state,
				cardsWidth: action.width,
				cardOnDeck: action.cardOnDeck,
				cardActive: newCardActive,
				translate: calculateTranslate(
					action.width,
					newCardActive,
					action.cardOnDeck,
					action.margin
				),
				transition: false,
				margin: action.margin,
			};
		case 'next':
			const nextCardActive =
				state.dataLength - (state.dataLength % state.cardOnDeck) ===
				action.nextActiveCard * -1
					? state.cardActive - (state.dataLength % state.cardOnDeck)
					: action.nextActiveCard;
			return {
				...state,
				cardActive: nextCardActive,
				translate: calculateTranslate(
					state.cardsWidth,
					nextCardActive,
					state.cardOnDeck,
					state.margin
				),
				transition: true,
				extraCard:
					state.dataLength - (state.dataLength % state.cardOnDeck) ===
					action.nextActiveCard * -1
						? state.dataLength % state.cardOnDeck
						: 0,
			};
		case 'prev':
			const prevCardActive = state.extraCard
				? state.cardActive + state.extraCard
				: action.nextActiveCard;
			return {
				...state,
				cardActive: prevCardActive,
				translate: calculateTranslate(
					state.cardsWidth,
					prevCardActive,
					state.cardOnDeck,
					state.margin,
					state.dataLength
				),
				transition: true,
				extraCard: 0,
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

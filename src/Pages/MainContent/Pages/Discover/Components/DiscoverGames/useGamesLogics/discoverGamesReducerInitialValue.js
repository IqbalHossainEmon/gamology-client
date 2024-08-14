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
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'fetch':
			return { ...state, data: action.data, dataLength: action.dataLength };
		case 'screenWidthChange':
			return {
				...state,
				cardsWidth: action.width,
				cardOnDeck: action.cardOnDeck,
				cardActive:
					action.cardOnDeck !== state.cardOnDeck &&
					state.cardOnDeck &&
					state.cardActive % action.cardOnDeck !== 0
						? state.cardActive - (state.cardActive % action.cardOnDeck)
						: state.cardActive,
				translate:
					action.cardOnDeck !== state.cardOnDeck &&
					state.cardOnDeck &&
					state.cardActive % action.cardOnDeck !== 0
						? action.width *
								(state.cardActive - (state.cardActive % action.cardOnDeck)) -
						  state.margin * -(state.cardActive - (state.dataLength % state.cardOnDeck))
						: action.width * state.cardActive - state.margin * -state.cardActive,
				transition: false,
				extraCard: 0,
				margin: action.margin,
			};
		case 'next':
			return {
				...state,
				cardActive:
					state.dataLength - (state.dataLength % state.cardOnDeck) ===
					action.nextActiveCard * -1
						? state.cardActive - (state.dataLength % state.cardOnDeck)
						: action.nextActiveCard,
				translate:
					state.dataLength - (state.dataLength % state.cardOnDeck) ===
					action.nextActiveCard * -1
						? state.cardsWidth *
								(state.cardActive - (state.dataLength % state.cardOnDeck)) -
						  state.margin * -(state.cardActive - (state.dataLength % state.cardOnDeck))
						: state.cardsWidth * action.nextActiveCard -
						  state.margin * -action.nextActiveCard,
				transition: true,
				extraCard:
					state.dataLength - (state.dataLength % state.cardOnDeck) ===
					action.nextActiveCard * -1
						? state.dataLength % state.cardOnDeck
						: 0,
			};
		case 'prev':
			return {
				...state,
				cardActive: state.extraCard
					? state.cardActive + state.extraCard
					: action.nextActiveCard,
				translate: state.extraCard
					? state.cardsWidth * (state.cardActive + state.extraCard) -
					  state.margin * -(state.cardActive + state.extraCard)
					: state.cardsWidth * action.nextActiveCard -
					  state.margin * -action.nextActiveCard,
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

export default function discoverGamesReducerInitialValue() {
	return { initialState, reducer };
}

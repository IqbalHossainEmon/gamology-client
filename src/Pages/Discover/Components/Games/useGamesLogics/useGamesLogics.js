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
        translateStyle: {
          translate:
            action.cardOnDeck !== state.cardOnDeck &&
            state.cardOnDeck &&
            state.cardActive % action.cardOnDeck !== 0
              ? `${action.width * (state.cardActive - (state.cardActive % action.cardOnDeck))}px`
              : `${action.width * state.cardActive}px`,
          transitionDuration: '0ms',
        },
        extraCard: 0,
      };
    case 'next':
      return {
        ...state,
        cardActive:
          state.dataLength - (state.dataLength % state.cardOnDeck) === action.nextActiveCard * -1
            ? state.cardActive - (state.dataLength % state.cardOnDeck)
            : action.nextActiveCard,
        translateStyle:
          state.dataLength - (state.dataLength % state.cardOnDeck) === action.nextActiveCard * -1
            ? {
                translate: `${
                  state.cardsWidth * (state.cardActive - (state.dataLength % state.cardOnDeck))
                }px`,
                transitionDuration: '300ms',
              }
            : {
                translate: `${state.cardsWidth * action.nextActiveCard}px`,
                transitionDuration: '300ms',
              },
        extraCard: state.dataLength % state.cardOnDeck,
      };
    case 'prev':
      return {
        ...state,
        cardActive: state.extraCard ? state.cardActive + state.extraCard : action.nextActiveCard,
        translateStyle: state.extraCard
          ? {
              translate: `${state.cardsWidth * (state.cardActive + state.extraCard)}px`,
              transitionDuration: '300ms',
            }
          : {
              translate: `${state.cardsWidth * action.nextActiveCard}px`,
              transitionDuration: '300ms',
            },

        extraCard: 0,
      };
    case 'transitionStop':
      return {
        ...state,
        translateStyle: { translate: state.translateStyle.translate, transitionDuration: '0ms' },
      };
    default:
      return state;
  }
};

const initialState = {
  data: [],
  dataLength: 0,
  cardsWidth: 0,
  cardActive: 0,
  cardOnDeck: 0,
  translateStyle: { translate: '0px', transitionDuration: '0ms' },
  extraCard: 0,
};

export default function useGamesLogics() {
  return { initialState, reducer };
}

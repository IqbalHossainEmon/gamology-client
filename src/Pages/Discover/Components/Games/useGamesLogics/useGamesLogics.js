const reducer = (state, action) => {
  switch (action.type) {
    case 'fetch':
      return { ...state, data: action.data, dataLength: action.dataLength };
    case 'screenWidthChange':
      // calculate cards depend on screen width
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
      // if cards number is not equal to cards showing on one time and there is a reminder, then the reminder will be added with previous number and they added as extra cards.
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
        extraCard:
          state.dataLength - (state.dataLength % state.cardOnDeck) === action.nextActiveCard * -1
            ? state.dataLength % state.cardOnDeck
            : 0,
      };
    case 'prev':
      // if previous cards is added as reminder and extra card, then prev button will be move just the extra cards.
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
      // set transition 0 because transition happens only when button clicked.
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

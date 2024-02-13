import { useCallback, useRef } from 'react';

const initialState = {
  data: [],
  active: 0,
  coverTransition: false,
  thumbTransition: false,
  cardActive: 0,
  cardsOnDeck: 4,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetch':
      return { ...state, data: action.data };

    case 'nextBanner':
      return state.active !== state.data.length - 1 &&
        state.cardActive * state.cardsOnDeck <= state.active + 1 &&
        state.cardActive * state.cardsOnDeck + state.cardsOnDeck - 1 >= state.active + 1
        ? {
            ...state,
            active: state.active === state.data.length - 1 ? 0 : state.active + 1,
            coverTransition: true,
          }
        : {
            ...state,
            active: state.active === state.data.length - 1 ? 0 : state.active + 1,
            coverTransition: true,
            cardActive: state.active === state.data.length - 1 ? 0 : Math.floor((state.active + 1) / state.cardsOnDeck),
            thumbTransition: true,
          };

    case 'prevBanner':
      return state.active - 1 !== -1 &&
        state.cardActive * state.cardsOnDeck <= state.active - 1 &&
        state.cardActive * state.cardsOnDeck + state.cardsOnDeck - 1 >= state.active - 1
        ? {
            ...state,
            active: state.active - 1 === -1 ? state.data.length - 1 : state.active - 1,
            coverTransition: true,
          }
        : {
            ...state,
            active: state.active - 1 === -1 ? state.data.length - 1 : state.active - 1,
            coverTransition: true,
            cardActive:
              state.active - 1 === -1
                ? Math.floor((state.data.length - 1) / state.cardsOnDeck)
                : Math.floor((state.active - 1) / state.cardsOnDeck),
            thumbTransition: true,
          };

    case 'setBanner':
      return { ...state, active: action.active, coverTransition: true };

    case 'transitionStop':
      switch (action.transitionType) {
        case 'cover':
          return { ...state, coverTransition: false };
        case 'thumb':
          return { ...state, thumbTransition: false };
        default:
          return { ...state, thumbTransition: false, coverTransition: false };
      }
    case 'nextCards':
      return {
        ...state,
        cardActive: (state.cardActive + 1) * 100 < Math.ceil(state.data.length / state.cardsOnDeck) * 100 ? state.cardActive + 1 : 0,
        thumbTransition: true,
      };

    case 'prevCards':
      return {
        ...state,
        cardActive: state.cardActive - 1 >= 0 ? state.cardActive - 1 : Math.ceil(state.data.length / state.cardsOnDeck) - 1,
        thumbTransition: true,
      };

    case 'screenSizeChange':
      return state.cardActive * action.cardsOnDeck <= state.active &&
        state.cardActive * action.cardsOnDeck + action.cardsOnDeck - 1 >= state.active
        ? {
            ...state,
            cardsOnDeck: action.cardsOnDeck,
          }
        : {
            ...state,
            cardActive: Math.floor(state.active / action.cardsOnDeck),
            cardsOnDeck: action.cardsOnDeck,
          };
    default:
      return state;
  }
};

export default function useIndividualGameBannerLogics() {
  const timeId = useRef(null);

  const timerFunction = useCallback((transitionType, dispatch, time = 500) => {
    if (timeId.current) {
      clearTimeout(timeId.current);
    }

    timeId.current = setTimeout(() => {
      dispatch({
        type: 'transitionStop',
        transitionType,
      });
      timeId.current = null;
    }, time);
  }, []);

  return { initialState, reducer, timerFunction };
}

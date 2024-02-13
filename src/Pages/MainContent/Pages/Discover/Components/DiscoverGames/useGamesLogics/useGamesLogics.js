import { useCallback, useRef } from 'react';

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
          action.cardOnDeck !== state.cardOnDeck && state.cardOnDeck && state.cardActive % action.cardOnDeck !== 0
            ? state.cardActive - (state.cardActive % action.cardOnDeck)
            : state.cardActive,
        translateStyle: {
          translate:
            action.cardOnDeck !== state.cardOnDeck && state.cardOnDeck && state.cardActive % action.cardOnDeck !== 0
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
                translate: `${state.cardsWidth * (state.cardActive - (state.dataLength % state.cardOnDeck))}px`,
                transitionDuration: '300ms',
              }
            : {
                translate: `${state.cardsWidth * action.nextActiveCard}px`,
                transitionDuration: '300ms',
              },
        extraCard:
          state.dataLength - (state.dataLength % state.cardOnDeck) === action.nextActiveCard * -1 ? state.dataLength % state.cardOnDeck : 0,
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
        translateStyle: {
          translate: state.translateStyle.translate,
          transitionDuration: '0ms',
        },
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
  const referenceRef = useRef();

  // this function get calls after every change of cards and turns off the transition of translate of the cards.
  const timerFunction = useCallback(() => {
    referenceRef.timerId = setTimeout(() => {
      referenceRef.dispatch({ type: 'transitionStop' });
      referenceRef.timerId = null;
    }, 400);
  }, []);

  // this function give the reference of dispatch and stores it in a ref.
  const setReference = useCallback(dispatch => {
    referenceRef.dispatch = dispatch;
  }, []);

  // this function handles clicks in the cards change.
  const handleClick = (click, cardActive, cardOnDeck) => {
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
      timerFunction();
    } else {
      timerFunction();
    }
  };

  // this function checks screen widths and set cards on deck and send it through dispatch.
  const setCardsOnScreenWidthChange = useCallback((screenWidth, cardsContainer) => {
    let cardOnOneDeck;
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
      width: cardsContainer.offsetWidth / cardOnOneDeck,
      cardOnDeck: cardOnOneDeck,
    });
  }, []);

  return {
    initialState,
    reducer,
    handleClick,
    setReference,
    setCardsOnScreenWidthChange,
  };
}

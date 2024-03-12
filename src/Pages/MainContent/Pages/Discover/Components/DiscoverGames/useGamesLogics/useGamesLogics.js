import { useCallback, useRef } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetch':
      // fetch data from server and set data and data length.
      return { ...state, data: action.data, dataLength: action.dataLength };
    case 'screenWidthChange':
      // calculate cards depend on screen width
      console.log(action.cardOnDeck !== state.cardOnDeck && state.cardOnDeck && state.cardActive % action.cardOnDeck !== 0);
      return {
        ...state,
        cardsWidth: action.width,
        cardOnDeck: action.cardOnDeck,
        cardActive:
          action.cardOnDeck !== state.cardOnDeck && state.cardOnDeck && state.cardActive % action.cardOnDeck !== 0
            ? state.cardActive - (state.cardActive % action.cardOnDeck)
            : state.cardActive,
        translate:
          action.cardOnDeck !== state.cardOnDeck && state.cardOnDeck && state.cardActive % action.cardOnDeck !== 0
            ? action.width * (state.cardActive - (state.cardActive % action.cardOnDeck)) -
              state.margin * -(state.cardActive - (state.dataLength % state.cardOnDeck))
            : action.width * state.cardActive - state.margin * -state.cardActive,
        transition: false,
        extraCard: 0,
        margin: action.margin,
      };
    case 'next':
      // if cards number is not equal to cards showing on one time and there is a reminder, then the reminder will be added with previous number and they added as extra cards.
      console.log(state.cardActive - (state.dataLength % state.cardOnDeck));
      return {
        ...state,
        cardActive:
          state.dataLength - (state.dataLength % state.cardOnDeck) === action.nextActiveCard * -1
            ? state.cardActive - (state.dataLength % state.cardOnDeck)
            : action.nextActiveCard,
        translate:
          state.dataLength - (state.dataLength % state.cardOnDeck) === action.nextActiveCard * -1
            ? state.cardsWidth * (state.cardActive - (state.dataLength % state.cardOnDeck)) -
              state.margin * -(state.cardActive - (state.dataLength % state.cardOnDeck))
            : state.cardsWidth * action.nextActiveCard - state.margin * -action.nextActiveCard,
        transition: true,
        extraCard:
          state.dataLength - (state.dataLength % state.cardOnDeck) === action.nextActiveCard * -1 ? state.dataLength % state.cardOnDeck : 0,
      };
    case 'prev':
      // if previous cards is added as reminder and extra card, then prev button will be move just the extra cards.
      return {
        ...state,
        cardActive: state.extraCard ? state.cardActive + state.extraCard : action.nextActiveCard,
        translate: state.extraCard
          ? state.cardsWidth * (state.cardActive + state.extraCard) - state.margin * -(state.cardActive + state.extraCard)
          : state.cardsWidth * action.nextActiveCard - state.margin * -action.nextActiveCard,
        transition: true,
        extraCard: 0,
      };
    case 'transitionStop':
      // set transition 0 because transition happens only when button clicked.
      return {
        ...state,
        transition: false,
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
  translate: 0,
  margin: 0,
  transition: false,
  oneDeckLength: 0,
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
    let margin;
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
      width: cardsContainer.offsetWidth / cardOnOneDeck - (margin * (cardOnOneDeck - 1)) / cardOnOneDeck,
      margin,
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

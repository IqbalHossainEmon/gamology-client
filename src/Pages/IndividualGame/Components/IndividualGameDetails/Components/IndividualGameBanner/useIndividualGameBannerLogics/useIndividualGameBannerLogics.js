import { useCallback, useRef } from 'react';

const initialState = {
  data: [],
  active: 0,
  coverTransition: false,
  thumbTransition: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetch':
      return { ...state, data: action.data };
    case 'nextBanner':
      return state.active === state.data.length - 1
        ? { ...state, active: 0, coverTransition: true }
        : { ...state, active: state.active + 1, coverTransition: true };
    case 'prevBanner':
      return state.active - 1 === -1
        ? { ...state, active: state.data.length - 1, coverTransition: true }
        : { ...state, active: state.active - 1, coverTransition: true };
    case 'setBanner':
      return { ...state, active: action.active, coverTransition: true };
    case 'transitionStop':
      return { ...state, [action.transitionType]: false };
    default:
      return state;
  }
};

export default function useIndividualGameBannerLogics() {
  const timeId = useRef(null);

  const timerFunction = useCallback((cover, dispatch) => {
    if (timeId.current) {
      clearTimeout(timeId.current);
      timeId.current = null;
    }
    timeId.current = setTimeout(() => {
      dispatch({
        type: 'transitionStop',
        transitionType: cover ? 'coverTransition' : 'thumbTransition',
      });
      clearTimeout(timeId.current);
      timeId.current = null;
    }, 500);
  }, []);

  return { initialState, reducer, timerFunction };
}

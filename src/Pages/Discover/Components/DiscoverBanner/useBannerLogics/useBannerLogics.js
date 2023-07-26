import { useCallback, useRef, useState } from 'react';

// this two function calculates the next state of the active item, the item will fade out and the item will fade in.
const increaseByOne = (state, fadeIn) => ({
  fadeIn: (fadeIn + 1) % 5,
  fadeOut: fadeIn,
  cardsPosition: state.cardsPosition.map((cardPosition) =>
    cardPosition > 0 ? cardPosition - 1 : 5 - 1,
  ),
});
const decreaseByOne = (state, fadeIn) => ({
  fadeIn: (fadeIn + (5 - 1)) % 5,
  fadeOut: fadeIn,
  cardsPosition: state.cardsPosition.map((cardPosition) =>
    cardPosition < 5 - 1 ? cardPosition + 1 : 0,
  ),
});

// reducer function take's the state and active to return the new state of the items.
function reducer(state, action) {
  const { fadeIn } = state;

  switch (action.type) {
    case 'next':
      return increaseByOne(state, fadeIn);
    case 'prev':
      return decreaseByOne(state, fadeIn);
    default:
      return state;
  }
}

// Banner styles changer
function activeBanner(bannerId, bannerState, styles) {
  const { fadeIn, fadeOut, active } = bannerState;

  if (bannerId === active) {
    return styles.initialBanner;
  }
  if (fadeIn === bannerId) {
    return styles.bannerFadeIn;
  }
  if (fadeOut === bannerId) {
    return styles.bannerFadeOut;
  }

  return '';
}

// initial state of banner, The active state is for initial state.
const initialState = {
  active: 0,
  fadeIn: 0,
  fadeOut: null,
  cardsPosition: [...Array(5).keys()],
};

// this function just returns every functions.
export default function useBannerLogics() {
  const timerRef = useRef(undefined);
  const timerState = useRef(false);
  const [isPause, setIsPause] = useState(false);

  // this function runs the dispatch function and take the start time.
  const run = useCallback(() => {
    timerState.timeStartAt = new Date().getTime();
    timerRef.dispatch({ type: 'next' });
  }, []);

  // this function stops the timer;
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  // this function starts the timer
  const startTimer = useCallback(() => {
    if (!timerRef.current) {
      timerState.timeStartAt = new Date().getTime();
      timerState.currentTotalTime = 8900;
      timerRef.current = setInterval(() => {
        run();
      }, timerState.currentTotalTime);
    }
  }, [run]);

  // this function is called when user leaves the tab(blur) but don't close this function stops the timer
  const pause = useCallback(() => {
    if (!timerState.current) {
      setIsPause(true);
      if (timerRef.current) {
        stopTimer();
      } else if (timerRef.pauseTimer) {
        clearTimeout(timerRef.pauseTimer);
        timerRef.pauseTimer = undefined;
      }
      timerState.current = true;
      timerState.remain =
        timerState.currentTotalTime -
        (new Date().getTime() - timerState.timeStartAt);
    }
  }, [stopTimer]);

  // this function is called when user comeback to the tab(focus) after blur the tab
  const resume = useCallback(() => {
    if (timerState.current) {
      setIsPause(false);
      timerState.current = false;
      timerState.timeStartAt = new Date().getTime();
      timerState.currentTotalTime = timerState.remain - 100;
      timerRef.pauseTimer = setTimeout(() => {
        clearTimeout(timerRef.pauseTimer);
        timerRef.pauseTimer = undefined;
        run();
        startTimer();
      }, timerState.remain);
    }
  }, [run, startTimer]);

  // this function start the timer and set all the listeners and functions
  const start = useCallback(
    (dispatch) => {
      if (!timerRef.dispatch) {
        timerRef.dispatch = dispatch;
      }
      startTimer();
      window.addEventListener('blur', pause);
      window.addEventListener('focus', resume);
    },
    [pause, resume, startTimer],
  );

  // this function stops the timer and removes the listeners
  const stop = useCallback(() => {
    stopTimer();
    if (timerRef.pauseTimer) {
      clearTimeout(timerRef.pauseTimer);
      timerRef.pauseTimer = undefined;
    }

    window.removeEventListener('blur', pause);
    window.removeEventListener('focus', resume);
  }, [pause, resume, stopTimer]);

  // this function resets the timer
  const reset = useCallback(() => {
    stopTimer();
    startTimer();
    if (timerRef.pauseTimer) {
      clearTimeout(timerRef.pauseTimer);
      timerRef.pauseTimer = undefined;
    }
  }, [startTimer, stopTimer]);

  return { initialState, reducer, activeBanner, reset, start, stop, isPause };
}

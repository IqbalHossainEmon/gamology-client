import { useCallback, useRef } from 'react';

// this two function calculates the next state of the active item, the item will fade out and the item will fade in.
const increaseByOne = (state, fadeIn) => ({
    ...state,
    active: null,
    fadeIn: (fadeIn + 1) % 5,
    fadeOut: fadeIn,
    cardsPosition: state.cardsPosition.map(cardPosition => (cardPosition > 0 ? cardPosition - 1 : 5 - 1)),
});
const decreaseByOne = (state, fadeIn) => ({
    ...state,
    active: null,
    fadeIn: (fadeIn + (5 - 1)) % 5,
    fadeOut: fadeIn,
    cardsPosition: state.cardsPosition.map(cardPosition => (cardPosition < 5 - 1 ? cardPosition + 1 : 0)),
});

// reducer function take's the state and active to return the new state of the items.
function reducer(state, action) {
    const { fadeIn } = state;

    switch (action.type) {
        case 'fetch':
            return { ...state, data: action.data };
        case 'next':
            return increaseByOne(state, fadeIn);
        case 'prev':
            return decreaseByOne(state, fadeIn);
        case 'pauseState':
            return { ...state, isPause: action.state };
        default:
            return state;
    }
}

// Banner styles changer
function activeBanner(bannerId, bannerState, styles) {
    const { fadeIn, fadeOut, active } = bannerState;

    switch (bannerId) {
        case active:
            return styles.initialBanner;
        case fadeIn:
            return styles.bannerFadeIn;
        case fadeOut:
            return styles.bannerFadeOut;
        default:
            return '';
    }
}

// initial state of banner, The active state is for initial state.
const initialState = {
    data: [],
    active: 0,
    fadeIn: 0,
    fadeOut: null,
    cardsPosition: [...Array(5).keys()],
    isPause: false,
};

// this function just returns every functions.
export default function useDiscoverBannerLogics() {
    const timerRef = useRef(null);
    const dispatchRef = useRef(null);
    const timerState = useRef(false);

    // this function runs the dispatch function and take the start time.
    const run = useCallback(() => {
        timerState.timeStartAt = new Date().getTime();
        dispatchRef.current({ type: 'next' });
    }, []);

    // this function stops the timer;
    const stopTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
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
            dispatchRef.current({ type: 'pauseState', state: true });
            if (timerRef.current) {
                stopTimer();
            } else if (timerRef.pauseTimer) {
                clearTimeout(timerRef.pauseTimer);
                timerRef.pauseTimer = null;
            }
            timerState.current = true;
            timerState.remain = timerState.currentTotalTime - (new Date().getTime() - timerState.timeStartAt);
        }
    }, [stopTimer]);

    // this function is called when user comeback to the tab(focus) after blur the tab
    const resume = useCallback(() => {
        if (timerState.current) {
            dispatchRef.current({ type: 'pauseState', state: false });
            timerState.current = false;
            timerState.timeStartAt = new Date().getTime();
            timerState.currentTotalTime = timerState.remain - 100;
            timerRef.pauseTimer = setTimeout(() => {
                timerRef.pauseTimer = null;
                run();
                startTimer();
            }, timerState.remain);
        }
    }, [run, startTimer]);

    // this function start the timer and set all the listeners and functions
    const start = useCallback(
        dispatch => {
            if (!dispatchRef.current) {
                dispatchRef.current = dispatch;
            }
            startTimer();
            window.addEventListener('blur', pause);
            window.addEventListener('focus', resume);
        },
        [pause, resume, startTimer]
    );

    // this function stops the timer and removes the listeners
    const stop = useCallback(() => {
        stopTimer();
        if (timerRef.pauseTimer) {
            clearTimeout(timerRef.pauseTimer);
            timerRef.pauseTimer = null;
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
            timerRef.pauseTimer = null;
        }
    }, [startTimer, stopTimer]);

    return { initialState, reducer, activeBanner, reset, start, stop };
}

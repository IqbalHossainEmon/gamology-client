import { useCallback, useEffect, useRef } from 'react';
import useScreenWidth from '../../../../../../../Hooks/useScreenWidth';

const BANNER_COUNT = 5;
const TIMER_INTERVAL = 9000;

// Calculate the next state of the active item
const increaseByOne = (state, fadeIn) => ({
    ...state,
    active: null,
    fadeIn: (fadeIn + 1) % BANNER_COUNT,
    fadeOut: fadeIn,
    cardsPosition: state.cardsPosition.map(cardPosition => (cardPosition > 0 ? cardPosition - 1 : BANNER_COUNT - 1)),
});

const decreaseByOne = (state, fadeIn) => ({
    ...state,
    active: null,
    fadeIn: (fadeIn + (BANNER_COUNT - 1)) % BANNER_COUNT,
    fadeOut: fadeIn,
    cardsPosition: state.cardsPosition.map(cardPosition => (cardPosition < BANNER_COUNT - 1 ? cardPosition + 1 : 0)),
});

// Initial state of the banner
const initialState = {
    data: [],
    active: 0,
    fadeIn: 0,
    fadeOut: null,
    cardsPosition: [...Array(BANNER_COUNT).keys()],
    isPause: false,
};

// Custom hook to manage timer
function useTimer(callback) {
    const timerRef = useRef(null);
    const startTimeRef = useRef(null);
    const remainingTimeRef = useRef(TIMER_INTERVAL);

    const start = useCallback(() => {
        if (!timerRef.current) {
            startTimeRef.current = Date.now();
            timerRef.current = setTimeout(() => {
                callback();
                timerRef.current = null;
                remainingTimeRef.current = TIMER_INTERVAL;
                start();
            }, remainingTimeRef.current);
        }
    }, [callback]);

    const stop = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
            const elapsedTime = Date.now() - startTimeRef.current;
            remainingTimeRef.current -= elapsedTime;
        }
    }, []);

    const reset = useCallback(() => {
        stop();
        remainingTimeRef.current = TIMER_INTERVAL;
        start();
    }, [start, stop]);

    useEffect(
        () => () => stop(), // Cleanup on unmount
        [stop]
    );

    return { start, stop, reset };
}

// Reducer function to manage state transitions
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

// Determine the banner styles
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

// Hook to manage banner logic
export default function useDiscoverBannerLogics() {
    const dispatchRef = useRef(() => {});
    const screenWidth = useScreenWidth();
    const screenWidthRef = useRef(screenWidth);
    const eventRefs = useRef({
        pause: () => {},
        resume: () => {},
    });

    const run = useCallback(() => {
        dispatchRef.current({ type: 'next' });
    }, []);

    const { start, stop, reset } = useTimer(run);

    eventRefs.current.pause = useCallback(() => {
        dispatchRef.current({ type: 'pauseState', state: true });
        stop();
    }, [stop]);

    eventRefs.current.resume = useCallback(() => {
        dispatchRef.current({ type: 'pauseState', state: false });
        start();
    }, [start]);

    useEffect(() => {
        const { pause, resume } = eventRefs.current;
        window.addEventListener('blur', pause);
        window.addEventListener('focus', resume);

        return () => {
            window.removeEventListener('blur', pause);
            window.removeEventListener('focus', resume);
        };
    }, []);

    const setDispatch = useCallback(dispatch => {
        dispatchRef.current = dispatch;
    }, []);

    useEffect(() => {
        if (
            (screenWidthRef.current < 769 && screenWidth > 768) ||
            (screenWidthRef.current > 768 && screenWidth < 769)
        ) {
            reset();
        }
    }, [reset, screenWidth]);

    return { initialState, reducer, activeBanner, reset, start, stop, setDispatch };
}

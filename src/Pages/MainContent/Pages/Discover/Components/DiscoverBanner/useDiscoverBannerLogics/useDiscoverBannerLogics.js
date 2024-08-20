import { useEffect, useRef } from 'react';
import useScreenWidth from '../../../../../../../Hooks/useScreenWidth';

const BANNER_COUNT = 5,
 TIMER_INTERVAL = 9000,

// Calculate the next state of the active item
 increaseByOne = (state, fadeIn) => ({
	...state,
	active: null,
	fadeIn: (fadeIn + 1) % BANNER_COUNT,
	fadeOut: fadeIn,
	cardsPosition: state.cardsPosition.map(cardPosition =>
		cardPosition > 0 ? cardPosition - 1 : BANNER_COUNT - 1
	),
}),

 decreaseByOne = (state, fadeIn) => ({
	...state,
	active: null,
	fadeIn: (fadeIn + (BANNER_COUNT - 1)) % BANNER_COUNT,
	fadeOut: fadeIn,
	cardsPosition: state.cardsPosition.map(cardPosition =>
		cardPosition < BANNER_COUNT - 1 ? cardPosition + 1 : 0
	),
}),

// Initial state of the banner
 initialState = {
	data: [],
	active: 0,
	fadeIn: 0,
	fadeOut: null,
	cardsPosition: [...Array(BANNER_COUNT).keys()],
	isPause: false,
};

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

// Custom hook to manage timer
function useTimer(callbackRef) {
	const timerRef = useRef(null),
	 startTimeRef = useRef(null),
	 screenWidth = useScreenWidth(),
	 screenWidthRef = useRef(screenWidth),
	 remainingTimeRef = useRef(TIMER_INTERVAL),

	 eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			start: () => {
				if (!timerRef.current) {
					startTimeRef.current = Date.now();
					timerRef.current = setTimeout(() => {
						callbackRef.current.run();
						timerRef.current = null;
						remainingTimeRef.current = TIMER_INTERVAL;
						eventRefs.current.start();
					}, remainingTimeRef.current);
				}
			},
			stop: () => {
				if (timerRef.current) {
					clearTimeout(timerRef.current);
					timerRef.current = null;
					const elapsedTime = Date.now() - startTimeRef.current;
					remainingTimeRef.current -= elapsedTime;
				}
			},
			reset: () => {
				eventRefs.current.stop();
				remainingTimeRef.current = TIMER_INTERVAL;
				eventRefs.current.start();
			},
		};
	}
	useEffect(
		() => {
			eventRefs.current.start();
			return () => eventRefs.current.stop();
		}, // Cleanup on unmount
		[]
	);
	useEffect(() => {
		if (
			(screenWidthRef.current < 769 && screenWidth > 768) ||
			(screenWidthRef.current > 768 && screenWidth < 769)
		) {
			eventRefs.current.reset();
			screenWidthRef.current = screenWidth;
		}
	}, [screenWidth]);

	return {
		start: eventRefs.current.start,
		stop: eventRefs.current.stop,
		reset: eventRefs.current.reset,
	};
}

// Hook to manage banner logic
export default function useDiscoverBannerLogics() {
	const dispatchRef = useRef(() => {}),
	 eventRefs = useRef(null),
	 { start, stop, reset } = useTimer(eventRefs);

	if (!eventRefs.current) {
		eventRefs.current = {
			run: () => {
				dispatchRef.current({ type: 'next' });
			},
			pause: () => {
				dispatchRef.current({ type: 'pauseState', state: true });
				stop();
			},
			resume: () => {
				dispatchRef.current({ type: 'pauseState', state: false });
				start();
			},
			setDispatch: dispatch => {
				dispatchRef.current = dispatch;
			},
		};
	}
	useEffect(() => {
		const { pause, resume } = eventRefs.current;
		window.addEventListener('blur', pause);
		window.addEventListener('focus', resume);

		return () => {
			window.removeEventListener('blur', pause);
			window.removeEventListener('focus', resume);
		};
	}, []);

	return {
		initialState,
		reducer,
		activeBanner,
		reset,
		start,
		stop,
		setDispatch: eventRefs.current.setDispatch,
	};
}

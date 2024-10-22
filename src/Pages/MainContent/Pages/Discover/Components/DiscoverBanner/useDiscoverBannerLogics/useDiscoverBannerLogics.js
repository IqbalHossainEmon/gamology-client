import { useEffect, useRef } from 'react';

const BANNER_COUNT = 5;

// Calculate the next state of the active item
const increaseByOne = (state, fadeIn) => ({
	...state,
	active: null,
	fadeIn: (fadeIn + 1) % BANNER_COUNT,
	fadeOut: fadeIn,
	cardsPosition: state.cardsPosition.map(cardPosition =>
		cardPosition > 0 ? cardPosition - 1 : BANNER_COUNT - 1
	),
});

const decreaseByOne = (state, fadeIn) => ({
	...state,
	active: null,
	fadeIn: (fadeIn + (BANNER_COUNT - 1)) % BANNER_COUNT,
	fadeOut: fadeIn,
	cardsPosition: state.cardsPosition.map(cardPosition =>
		cardPosition < BANNER_COUNT - 1 ? cardPosition + 1 : 0
	),
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

// Hook to manage banner logic
export default function useDiscoverBannerLogics() {
	const dispatchRef = useRef(() => {});
	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			run: () => {
				dispatchRef.current({ type: 'next' });
			},
			pause: () => {
				dispatchRef.current({ type: 'pauseState', state: true });
			},
			resume: () => {
				dispatchRef.current({ type: 'pauseState', state: false });
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
		setDispatch: eventRefs.current.setDispatch,
	};
}

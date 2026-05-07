import { useEffect, useRef, type ActionDispatch } from 'react';

const BANNER_COUNT = 5;

export type DiscoverBannerData = {
  id: number;
  name: string;
  coverImg: string;
  logoImg: string;
  carouselThumb: string;
  coverMobile: string;
  price: {
    regular: number;
    discount: number;
  } | number
};

export type DiscoverBannerIndex = 0 | 1 | 2 | 3 | 4;

type State = {
  data: DiscoverBannerData[];
  active: DiscoverBannerIndex | null;
  fadeIn: DiscoverBannerIndex;
  fadeOut: DiscoverBannerIndex | null;
  cardsPosition: DiscoverBannerIndex[];
  isPause: boolean;
}

// Initial state of the banner
const initialState: State = {
  data: [],
  active: 0,
  fadeIn: 0,
  fadeOut: null,
  cardsPosition: [...Array(BANNER_COUNT).keys()] as DiscoverBannerIndex[],
  isPause: false,
};

// Calculate the next state of the active item
const increaseByOne = (state: State, fadeIn: number): State => ({
  ...state,
  active: null,
  fadeIn: (fadeIn + 1) % BANNER_COUNT as DiscoverBannerIndex,
  fadeOut: fadeIn as DiscoverBannerIndex,
  cardsPosition: state.cardsPosition.map(cardPosition =>
    cardPosition > 0 ? cardPosition - 1 : BANNER_COUNT - 1
  ) as DiscoverBannerIndex[],
});

const decreaseByOne = (state: State, fadeIn: number): State => ({
  ...state,
  active: null,
  fadeIn: (fadeIn + (BANNER_COUNT - 1)) % BANNER_COUNT as DiscoverBannerIndex,
  fadeOut: fadeIn as DiscoverBannerIndex,
  cardsPosition: state.cardsPosition.map(cardPosition =>
    cardPosition < BANNER_COUNT - 1 ? cardPosition + 1 : 0
  ) as DiscoverBannerIndex[],
});

// Determine the banner styles
function activeBanner(bannerId: DiscoverBannerIndex, bannerState: State, styles: CSSModuleClasses) {
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

export type ActionTypes = "fetch" | "next" | "prev" | "pauseState";

type Action = { type: ActionTypes; data?: DiscoverBannerData[]; state?: boolean };

// Reducer function to manage state transitions
function reducer(state: State, action: Action): State {
  const { fadeIn } = state;

  switch (action.type) {
    case 'fetch':
      if (!action.data) return state;
      return { ...state, data: action.data };

    case 'next':
      return increaseByOne(state, fadeIn);

    case 'prev':
      return decreaseByOne(state, fadeIn);

    case 'pauseState':
      if (action.state === undefined) return state;
      return { ...state, isPause: action.state };

    default:
      return state;
  }
}

// Hook to manage banner logic
export default function useDiscoverBannerLogcs() {
  const dispatchRef = useRef<ActionDispatch<[action: Action]>>(() => { });

  const next = () => {
    dispatchRef.current({ type: 'next' });
  }
  const pause = () => {
    dispatchRef.current({ type: 'pauseState', state: true });
  }
  const resume = () => {
    dispatchRef.current({ type: 'pauseState', state: false });
  }
  const setDispatch = (dispatch: ActionDispatch<[action: Action]>) => {
    dispatchRef.current = dispatch;
  }

  useEffect(() => {
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
    setDispatch,
    next
  };
}

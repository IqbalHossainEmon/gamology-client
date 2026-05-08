import { useEffect, useRef, type ActionDispatch } from "react";

const BANNER_COUNT = 5;

export type DiscoverBannerData = {
  id: number;
  name: string;
  coverImg: string;
  logoImg: string;
  carouselThumb: string;
  coverMobile: string;
  price:
    | {
        regular: number;
        discount: number;
      }
    | number;
};

export type DiscoverBannerIndex = 0 | 1 | 2 | 3 | 4;

export type DiscoverBannerState = {
  data: DiscoverBannerData[];
  active: DiscoverBannerIndex | null;
  fadeIn: DiscoverBannerIndex;
  fadeOut: DiscoverBannerIndex | null;
  cardsPosition: DiscoverBannerIndex[];
  isPause: boolean;
};

// Initial state of the banner
const initialState: DiscoverBannerState = {
  data: [],
  active: 0,
  fadeIn: 0,
  fadeOut: null,
  cardsPosition: [...Array(BANNER_COUNT).keys()] as DiscoverBannerIndex[],
  isPause: false,
};

// Calculate the next state of the active item
const increaseByOne = (
  state: DiscoverBannerState,
  fadeIn: number,
): DiscoverBannerState => ({
  ...state,
  active: null,
  fadeIn: ((fadeIn + 1) % BANNER_COUNT) as DiscoverBannerIndex,
  fadeOut: fadeIn as DiscoverBannerIndex,
  cardsPosition: state.cardsPosition.map((cardPosition) =>
    cardPosition > 0 ? cardPosition - 1 : BANNER_COUNT - 1,
  ) as DiscoverBannerIndex[],
});

const decreaseByOne = (
  state: DiscoverBannerState,
  fadeIn: number,
): DiscoverBannerState => ({
  ...state,
  active: null,
  fadeIn: ((fadeIn + (BANNER_COUNT - 1)) % BANNER_COUNT) as DiscoverBannerIndex,
  fadeOut: fadeIn as DiscoverBannerIndex,
  cardsPosition: state.cardsPosition.map((cardPosition) =>
    cardPosition < BANNER_COUNT - 1 ? cardPosition + 1 : 0,
  ) as DiscoverBannerIndex[],
});

export type DiscoverBannerActiveBannerFunc = (
  bannerId: DiscoverBannerIndex,
  bannerState: Pick<DiscoverBannerState, "active" | "fadeIn" | "fadeOut">,
  styles: CSSModuleClasses,
) => string | undefined;

// Determine the banner styles
const activeBanner: DiscoverBannerActiveBannerFunc = (
  bannerId,
  bannerState,
  styles,
) => {
  const { fadeIn, fadeOut, active } = bannerState;

  switch (bannerId) {
    case active:
      return styles.initialBanner;
    case fadeIn:
      return styles.bannerFadeIn;
    case fadeOut:
      return styles.bannerFadeOut;
    default:
      return "";
  }
};

export type DiscoverBannerActionTypes =
  "fetch" | "next" | "prev" | "pauseState";

type DiscoverBannerAction = {
  type: DiscoverBannerActionTypes;
  data?: DiscoverBannerData[];
  state?: boolean;
};
export type DiscoverBannerDispatch = ActionDispatch<
  [action: DiscoverBannerAction]
>;

// Reducer function to manage state transitions
function reducer(
  state: DiscoverBannerState,
  action: DiscoverBannerAction,
): DiscoverBannerState {
  const { fadeIn } = state;

  switch (action.type) {
    case "fetch":
      if (!action.data) return state;
      return { ...state, data: action.data };

    case "next":
      return increaseByOne(state, fadeIn);

    case "prev":
      return decreaseByOne(state, fadeIn);

    case "pauseState":
      if (action.state === undefined) return state;
      return { ...state, isPause: action.state };

    default:
      return state;
  }
}

// Hook to manage banner logic
export default function useDiscoverBannerLogcs() {
  const dispatchRef = useRef<DiscoverBannerDispatch>(() => {});

  const next = () => {
    dispatchRef.current({ type: "next" });
  };
  const pause = () => {
    dispatchRef.current({ type: "pauseState", state: true });
  };
  const resume = () => {
    dispatchRef.current({ type: "pauseState", state: false });
  };
  const setDispatch = (dispatch: DiscoverBannerDispatch) => {
    dispatchRef.current = dispatch;
  };

  useEffect(() => {
    window.addEventListener("blur", pause);
    window.addEventListener("focus", resume);

    return () => {
      window.removeEventListener("blur", pause);
      window.removeEventListener("focus", resume);
    };
  }, []);

  return {
    initialState,
    reducer,
    activeBanner,
    setDispatch,
    next,
  };
}

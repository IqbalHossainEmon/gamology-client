// this two function calculates the next state of the active item, the item will fade out and the item will fade in.
const increaseByOne = (state, fadeIn) => ({
  fadeIn: (fadeIn + 1) % 5,
  fadeOut: fadeIn,
  cardsPosition: state.cardsPosition.map((cardPosition) =>
    cardPosition > 0 ? cardPosition - 1 : 5 - 1
  ),
});
const decreaseByOne = (state, fadeIn) => ({
  fadeIn: (fadeIn + (5 - 1)) % 5,
  fadeOut: fadeIn,
  cardsPosition: state.cardsPosition.map((cardPosition) =>
    cardPosition < 5 - 1 ? cardPosition + 1 : 0
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
  return { initialState, reducer, activeBanner };
}

// this function take the items length and returns the initial state, reducer and activeBanner function .

export default function useBannerState(dataLength) {
  const initialState = {
    active: 0,
    fadeIn: null,
    fadeOut: null,
    cardsPosition: [...Array(dataLength).keys()],
  };

  // this two function sets the next state of the active item, the item will fade out and the item will fade in. the active state is for initial state.
  const increaseByOne = (state, active) => ({
    active: (active + 1) % dataLength,
    fadeIn: (active + 1) % dataLength,
    fadeOut: active,
    cardsPosition: state.cardsPosition.map((cardPosition) =>
      cardPosition > 0 ? cardPosition - 1 : dataLength - 1
    ),
  });
  const decreaseByOne = (state, active) => ({
    active: (active + (dataLength - 1)) % dataLength,
    fadeIn: (active + (dataLength - 1)) % dataLength,
    fadeOut: active,
    cardsPosition: state.cardsPosition.map((cardPosition) =>
      cardPosition < dataLength - 1 ? cardPosition + 1 : 0
    ),
  });

  // reducer function take's the state and active to return the new state of the items.
  function reducer(state, action) {
    const { active } = state;

    switch (action.type) {
      case 'next':
        return increaseByOne(state, active);
      case 'prev':
        return decreaseByOne(state, active);
      default:
        return state;
    }
  }

  // Banner styles changer
  function activeBanner(bannerId, bannerState, styles) {
    const { fadeIn, fadeOut, active } = bannerState;

    if (fadeIn === bannerId) {
      return styles.bannerFadeIn;
    }
    if (fadeOut === bannerId) {
      return styles.bannerFadeOut;
    }
    if (bannerId === active) {
      return styles.initialBanner;
    }
    return '';
  }
  return { initialState, reducer, activeBanner };
}

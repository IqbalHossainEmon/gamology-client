// this function take the items lenth and returns the inital state, reducer and activeBnner function .

export default function useBannerState(dataLength) {
  const initalState = {
    active: 0,
    fadeIn: null,
    fadeOut: null,
    cardsPosition: [...Array(dataLength).keys()],
  };

  // reducer function take's the state and active to rentern the new state of the items.

  function reducer(state, action) {
    const { active } = state;

    // this two function sets the next state of the active item, the item will fade out and the item will fade in. the active state is for inital state.

    const increaseByOne = () => ({
      active: (active + 1) % dataLength,
      fadeIn: (active + 1) % dataLength,
      fadeOut: active,
      cardsPosition: state.cardsPosition.map((cardPosition) =>
        cardPosition > 0 ? cardPosition - 1 : dataLength - 1
      ),
    });

    const decreaseByOne = () => ({
      active: (active + (dataLength - 1)) % dataLength,
      fadeIn: (active + (dataLength - 1)) % dataLength,
      fadeOut: active,
      cardsPosition: state.cardsPosition.map((cardPosition) =>
        cardPosition < dataLength - 1 ? cardPosition + 1 : 0
      ),
    });

    switch (action.type) {
      case 'next':
        return increaseByOne();
      case 'prev':
        return decreaseByOne();
      default:
        return state;
    }
  }
  function activeBanner(bannerId, bannerState, styles) {
    const { fadeIn, fadeOut, active } = bannerState;

    if (fadeIn === bannerId) {
      return styles.bannerFadeIn;
    }
    if (fadeOut === bannerId) {
      return styles.bannerFadeOut;
    }
    if (bannerId === active) {
      return styles.intialBanner;
    }
    return '';
  }
  return { initalState, reducer, activeBanner };
}

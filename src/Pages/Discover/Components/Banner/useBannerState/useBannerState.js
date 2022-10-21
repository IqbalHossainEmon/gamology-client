export default function useBannerState(dataLength) {
  const initalState = {
    active: 0,
    fadeOut: dataLength - 1,
    cardsPosition: [...Array(dataLength).keys()],
  };
  function reducer(state, action) {
    switch (action.type) {
      case 'next':
        return {
          active: (state.active + 1) % dataLength,
          fadeOut: state.active,
          cardsPosition: state.cardsPosition.map((cardPosition) =>
            cardPosition < dataLength - 1 ? cardPosition + 1 : 0
          ),
        };
      case 'prev':
        return {
          active: (state.active + (dataLength - 1)) % dataLength,
          fadeOut: state.active,
          cardsPosition: state.cardsPosition.map((cardPosition) =>
            cardPosition > 0 ? cardPosition - 1 : dataLength - 1
          ),
        };

      default:
        return state;
    }
  }
  return [initalState, reducer];
}

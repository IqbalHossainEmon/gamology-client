const initialState = { data: [], active: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetch':
      return { ...state, data: action.data };
    case 'nextBanner':
      return state.active === state.data.length - 1
        ? { ...state, active: 0 }
        : { ...state, active: state.active + 1 };
    case 'prevBanner':
      return state.active - 1 === -1
        ? { ...state, active: state.data.length - 1 }
        : { ...state, active: state.active - 1 };
    case 'setBanner':
      return { ...state, active: action.active };
    default:
      return state;
  }
};

export default function useIndividualGameBannerLogics() {
  return { initialState, reducer };
}

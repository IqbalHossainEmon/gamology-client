const initialState = {
  NumberOfGames: 'Pc Games / All',
  sortBy: 'New Release',
  filterState: {
    showOnlyDiscounted: false,
    HideDLCsAndExtras: false,
    hideAllOwnedProducts: false,
    priceRange: [0, 5000],
    ShowOnlyFreeGames: false,
    action: false,
    adventure: false,
    racing: false,
    shooter: false,
    rolePlaying: false,
    sports: false,
    strategy: false,
    simulation: false,
    windows: false,
    macOS: false,
    linux: false,
    singlePlayer: false,
    multiPlayer: false,
    coOp: false,
    achievements: false,
    leaderBoards: false,
    controllerSupport: false,
    cloudSaves: false,
    overlay: false,
    releaseDate: [0, 5000],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'sort':
      return { ...state, sortBy: action.value };
    case 'filterChange':
      return { ...state, filterState: action.filter };

    default:
      return state;
  }
};
export default function useBrowseLogics() {
  return { initialState, reducer };
}

const initialState = {
  items: [],
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
  activePage: 1,
  pageCount: 69,
  rangeLimits: {
    price: { lower: 0, higher: 148 },
    releaseDate: { lower: 2023, higher: new Date().getFullYear() },
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetch':
      return { ...state, items: action.data };
    case 'sortChange':
      return { ...state, sortBy: action.value };
    case 'filterChange':
      return { ...state, filterState: action.filter };
    case 'pageChange':
      return { ...state, activePage: action.activePage };
    default:
      return state;
  }
};

export default function useBrowseLogics() {
  return { initialState, reducer };
}

const initialState = {
  NumberOfGames: 'Pc Games / All',
  sortBy: 'New Release',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'sort':
      return { ...state, sortBy: action.value };

    default:
      return state;
  }
};
export default function useBrowseLogics() {
  return { initialState, reducer };
}

export default function useBrowseState() {
  const initialState = {
    NumberOfGames: 'Pc Games / All',
    sortBy: 'New Release',
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case '1':
        return 1;

      default:
        return state;
    }
  };

  return { initialState, reducer };
}

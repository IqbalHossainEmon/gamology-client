const initialState = {
	items: [],
	numberOfGames: 'Pc Games / All',
	sortBy: 'New Release',
	filterState: {
		'Show only discounted': false,
		'Hide all owned products': false,
		price: { lower: 0, higher: 148.18 },
		'Show only free games': false,
		Action: false,
		Adventure: false,
		Racing: false,
		Shooter: false,
		'Role-playing': false,
		Sports: false,
		Strategy: false,
		Simulation: false,
		Windows: false,
		macOS: false,
		Linux: false,
		'Single-player': false,
		'Multi-player': false,
		'Co-op': false,
		Achievements: false,
		'Leader Boards': false,
		'Controller support': false,
		'Cloud saves': false,
		Overlay: false,
		releaseDate: { lower: 1980, higher: new Date().getFullYear() },
	},
	activePage: 1,
	pageCount: 69,
	rangeLimits: {
		price: { lower: 0, higher: 148.18 },
		releaseDate: { lower: 1980, higher: new Date().getFullYear() },
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

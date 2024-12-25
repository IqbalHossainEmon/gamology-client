const initialState = {
	items: [],
	numberOfGames: 'Pc Games / All',
	sortBy: 'New Release',
	filterState: {
		'Show only discounted': false,
		'Hide all owned products': false,
		price: { lower: 0, higher: 148.18 },
		'Show only free games': false,
		releaseDate: { lower: 0, higher: new Date().getFullYear() },
	},
	activePage: 1,
	pageCount: 69,
	rangeLimits: {
		price: { lower: 0, higher: 148.18 },
		releaseDate: { lower: 1980, higher: new Date().getFullYear() },
	},
	filterOptions: [
		{
			type: 'switch',
			tags: ['Show only discounted', 'Hide all owned products'],
		},
		{
			category: 'Price Range',
			type: 'range',
			details: {
				rangeName: 'price',
				stepCondition: [
					{ ifLess: 10, step: 1 },
					{ ifLess: 50, step: 5 },
					{ ifLess: 100, step: 10 },
				],
				float: 2,
				switch: { tag: 'Show only free games' },
			},
		},
		{
			type: 'range',
			category: 'Release Date',
			details: {
				rangeName: 'releaseDate',
				float: 0,
			},
		},
	],
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'gameFetch':
			return { ...state, items: action.data };
		case 'sortChange':
			return { ...state, sortBy: action.value };
		case 'filterChange':
			return { ...state, filterState: action.filter };
		case 'filterOptions':
			const newFilterOptions = [
				...state.filterOptions.slice(0, 2),
				...action.filterOptions.map(option => {
					option.type = 'switch';
					return option;
				}),
				state.filterOptions[state.filterOptions.length - 1],
			];

			const newFilterStates = { ...state.filterState };

			action.filterOptions.forEach(category => {
				category.tags.forEach(tag => {
					newFilterStates[tag] = false;
				});
			});

			return { ...state, filterOptions: newFilterOptions, filterState: newFilterStates };
		case 'pageChange':
			return { ...state, activePage: action.activePage };
		default:
			return state;
	}
};

export default function useBrowseLogics() {
	return { initialState, reducer };
}

import { createContext } from 'react';

export const BrowseSortContext = createContext(false);
export const BrowseFilterContext = createContext(false);
export const BrowseSetSortSetFilterContext = createContext({
	setFilter: () => {},
	setSort: () => {},
});

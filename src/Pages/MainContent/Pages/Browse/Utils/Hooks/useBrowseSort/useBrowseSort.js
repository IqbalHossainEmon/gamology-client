import { useContext } from 'react';

import { BrowseSetSortSetFilterContext, BrowseSortContext } from '../../Contexts/FilterSortContext';

const useBrowseSort = () => {
	const sort = useContext(BrowseSortContext);
	const { setSort } = useContext(BrowseSetSortSetFilterContext);

	return { sort, setSort };
};

export default useBrowseSort;

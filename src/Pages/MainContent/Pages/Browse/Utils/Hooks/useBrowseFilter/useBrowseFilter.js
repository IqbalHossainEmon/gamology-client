import { useContext } from 'react';
import {
	BrowseFilterContext,
	BrowseSetSortSetFilterContext,
} from '../../Contexts/FilterSortContext';

const useBrowseFilter = () => {
	const filter = useContext(BrowseFilterContext);
	const { setFilter } = useContext(BrowseSetSortSetFilterContext);

	return { filter, setFilter };
};

export default useBrowseFilter;

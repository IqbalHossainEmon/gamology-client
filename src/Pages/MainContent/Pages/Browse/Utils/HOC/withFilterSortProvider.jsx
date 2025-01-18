import { useRef, useState } from 'react';
import {
	BrowseFilterContext,
	BrowseSetSortSetFilterContext,
	BrowseSortContext,
} from '../Contexts/FilterSortContext';

const withFilterSortProvider = Component =>
	function InnerComponent() {
		const [filter, setFilter] = useState(false);
		const [sort, setSort] = useState(false);

		const filterRef = useRef(filter);
		filterRef.current = filter;

		const sortRef = useRef(sort);
		sortRef.current = sort;

		const eventRef = useRef(null);

		if (!eventRef.current) {
			eventRef.current = {
				setFilter,
				setSort,
			};
		}

		return (
			<BrowseSortContext.Provider value={sort}>
				<BrowseFilterContext.Provider value={filter}>
					<BrowseSetSortSetFilterContext.Provider value={eventRef.current}>
						<Component />
					</BrowseSetSortSetFilterContext.Provider>
				</BrowseFilterContext.Provider>
			</BrowseSortContext.Provider>
		);
	};

export default withFilterSortProvider;

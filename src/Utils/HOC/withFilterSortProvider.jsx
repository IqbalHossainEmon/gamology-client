import { useEffect, useRef, useState } from 'react';
import {
	FilterSortContext,
	FilterSortRefContext,
	SetFilterSortContext,
} from '../Contexts/FilterSortContext';
import useChangeBodyOverflow from '../Hooks/useChangeBodyOverflow';
import useDropDownHide from '../Hooks/useDropDownHide';
import useScreenWidth from '../Hooks/useScreenWidth';

const withFilterSortProvider = Component =>
	function InnerComponent() {
		const [filterSortState, setFilterSortState] = useState({
			filter: true,
			sort: true,
		});
		const filterSortElementRef = useRef();

		const filterSortStateRef = useRef(filterSortState);
		filterSortStateRef.current = filterSortState;

		const { screenWidth } = useScreenWidth();
		const { showBodyOverflow, hideBodyOverflow } = useChangeBodyOverflow();

		useEffect(() => {
			if (
				screenWidth < 769 &&
				(!filterSortStateRef.current.sort || !filterSortStateRef.current.filter)
			) {
				hideBodyOverflow();
			}
		}, [screenWidth, hideBodyOverflow]);

		const eventRefs = useRef({});

		if (!eventRefs.current.handleDropDown) {
			eventRefs.current.handleDropDown = () => {
				setFilterSortState({ sort: true, filter: true });
				showBodyOverflow();
			};
		}

		const { showMenu, setElement } = useDropDownHide(eventRefs.current.handleDropDown);

		if (!eventRefs.current.setFilterSort) {
			eventRefs.current.setFilterSort = prop => {
				switch (prop) {
					case 'filter':
						setFilterSortState(prev => {
							if (prev.filter && screenWidth < 769) {
								hideBodyOverflow();
							} else {
								showBodyOverflow();
							}
							return {
								filter: !prev.filter,
								sort: true,
							};
						});
						break;
					case 'sort':
						setElement(filterSortElementRef.sort);
						showMenu();
						setFilterSortState(prev => {
							if (prev.sort && screenWidth < 769) {
								hideBodyOverflow();
							} else {
								showBodyOverflow();
							}
							return { sort: !prev.sort, filter: true };
						});
						break;
					default:
						setFilterSortState({ sort: true, filter: true });
				}
			};
		}
		return (
			<FilterSortContext.Provider value={filterSortState}>
				<SetFilterSortContext.Provider value={eventRefs.current.setFilterSort}>
					<FilterSortRefContext.Provider value={filterSortElementRef}>
						<Component />
					</FilterSortRefContext.Provider>
				</SetFilterSortContext.Provider>
			</FilterSortContext.Provider>
		);
	};

export default withFilterSortProvider;

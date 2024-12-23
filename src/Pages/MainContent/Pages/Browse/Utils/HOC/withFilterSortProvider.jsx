import { useEffect, useRef, useState } from 'react';
import useChangeBodyOverflow from '../../../../../../Utils/Hooks/useChangeBodyOverflow';
import useDropDownHide from '../../../../../../Utils/Hooks/useDropDownHide';
import useScreenWidth from '../../../../../../Utils/Hooks/useScreenWidth';
import {
	FilterSortContext,
	FilterSortRefContext,
	SetFilterSortContext,
} from '../Contexts/FilterSortContext';

const withFilterSortProvider = Component =>
	function InnerComponent() {
		const [filterSortState, setFilterSortState] = useState({
			filter: true,
			sort: true,
		});
		const filterSortElementRef = useRef({});

		const filterSortStateRef = useRef(filterSortState);
		filterSortStateRef.current = filterSortState;

		const screenWidth = useScreenWidth();
		const { showBodyOverflow, hideBodyOverflow } = useChangeBodyOverflow();

		useEffect(() => {
			if (
				screenWidth < 769 &&
				(!filterSortStateRef.current.sort || !filterSortStateRef.current.filter) &&
				filterSortElementRef.current.hidden
			) {
				hideBodyOverflow();
			} else if (!filterSortElementRef.current.hidden) {
				showBodyOverflow();
			}
		}, [screenWidth, hideBodyOverflow, showBodyOverflow]);

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
							if (
								prev.filter &&
								screenWidth < 769 &&
								!filterSortStateRef.current.hidden
							) {
								hideBodyOverflow();
								filterSortStateRef.current.hidden = true;
							} else if (filterSortStateRef.current.hidden) {
								showBodyOverflow();
								filterSortStateRef.current.hidden = false;
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
							if (
								prev.sort &&
								screenWidth < 769 &&
								!filterSortElementRef.current.hidden
							) {
								hideBodyOverflow();
								filterSortElementRef.current.hidden = true;
							} else if (filterSortElementRef.current.hidden) {
								showBodyOverflow();
								filterSortElementRef.current.hidden = false;
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

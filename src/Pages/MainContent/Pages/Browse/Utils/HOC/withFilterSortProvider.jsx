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

		const hiddenRef = useRef(false);

		const screenWidth = useScreenWidth();
		const screenWidthRef = useRef(screenWidth);
		screenWidthRef.current = screenWidth;

		const { showBodyOverflow, hideBodyOverflow } = useChangeBodyOverflow();

		useEffect(() => {
			if (
				screenWidth < 769 &&
				(!filterSortStateRef.current.sort || !filterSortStateRef.current.filter) &&
				hiddenRef.current
			) {
				hideBodyOverflow();
			} else if (hiddenRef.current) {
				showBodyOverflow();
			}
		}, [screenWidth, hideBodyOverflow, showBodyOverflow]);

		const eventRefs = useRef({});

		if (!eventRefs.current.handleDropDown) {
			eventRefs.current.handleDropDown = () => {
				setFilterSortState({ sort: true, filter: true });
				hiddenRef.current = false;
				showBodyOverflow();
			};
		}

		const { showMenu, setElement } = useDropDownHide(eventRefs.current.handleDropDown);

		if (!eventRefs.current.setFilterSort) {
			eventRefs.current.setFilterSort = prop => {
				switch (prop) {
					case 'filter':
						setFilterSortState(prev => ({
							filter: !prev.filter,
							sort: true,
						}));
						break;
					case 'sort':
						setElement(filterSortElementRef.sort);
						showMenu();
						setFilterSortState(prev => ({ sort: !prev.sort, filter: true }));
						break;
					default:
						setFilterSortState({ sort: true, filter: true });
				}
				if (screenWidthRef.current < 769)
					if (!hiddenRef.current) {
						hideBodyOverflow();
						hiddenRef.current = true;
					} else {
						showBodyOverflow();
						hiddenRef.current = false;
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

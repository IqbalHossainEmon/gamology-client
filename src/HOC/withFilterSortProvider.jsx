import { useCallback, useEffect, useRef, useState } from 'react';
import { FilterSortContext, FilterSortRefContext, SetFilterSortContext } from '../Contexts/FilterSortContext';
import useChangeBodyOverflow from '../Hooks/useChangeBodyOverflow';
import useDropDownHide from '../Hooks/useDropDownHide';
import useScreenWidth from '../Hooks/useScreenWidth';

const withFilterSortProvider = Component =>
    function InnerComponent() {
        const [filterSortState, setFilterSortState] = useState({
            filter: true,
            sort: true,
        });

        const filterSortRef = useRef();
        const filterSortStateRef = useRef(filterSortRef);
        filterSortStateRef.current = filterSortState;

        const screenWidth = useScreenWidth();
        const { showBodyOverflow, hideBodyOverflow } = useChangeBodyOverflow();

        const handleDropDown = useCallback(() => {
            setFilterSortState({ sort: true, filter: true });
            showBodyOverflow();
        }, [showBodyOverflow]);

        const { showMenu, setElement } = useDropDownHide(handleDropDown);

        useEffect(() => {
            if (screenWidth < 769 && (!filterSortStateRef.current.sort || !filterSortStateRef.current.filter)) {
                hideBodyOverflow();
            }
        }, [screenWidth, hideBodyOverflow]);

        const setFilterSort = useCallback(
            prop => {
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
                        setElement(filterSortRef.sort);
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
            },
            [hideBodyOverflow, screenWidth, setElement, showBodyOverflow, showMenu]
        );

        return (
            <FilterSortContext.Provider value={filterSortState}>
                <SetFilterSortContext.Provider value={setFilterSort}>
                    <FilterSortRefContext.Provider value={filterSortRef}>
                        <Component />
                    </FilterSortRefContext.Provider>
                </SetFilterSortContext.Provider>
            </FilterSortContext.Provider>
        );
    };

export default withFilterSortProvider;

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FilterSortContext,
  FilterSortRefContext,
  SetFilterSortContext,
} from '../Contexts/FilterSortContext';
import useChangeBodyOverflow from '../Hooks/useChangeBodyOverflow';
import useDropDownHide from '../Hooks/useDropDownHide';
import useScreenWidth from '../Hooks/useScreenWidth';

const withFilterSortProvider = (Component) =>
  function FilterSortProvider() {
    const [filterSortState, setFilterSortState] = useState({
      filter: true,
      sort: true,
    });

    const filterSortRef = useRef();

    const screenWidth = useScreenWidth();
    const { showBodyOverflow, hideBodyOverflow } = useChangeBodyOverflow();

    const { showMenu, setElement } = useDropDownHide(() => {
      setFilterSortState({ sort: true, filter: true });
      showBodyOverflow();
    });

    useEffect(() => {
      if (
        screenWidth < 769 &&
        (!filterSortState.sort || !filterSortState.filter)
      ) {
        hideBodyOverflow();
      }
    }, [filterSortState, screenWidth, hideBodyOverflow]);

    const setFilterSort = useCallback(
      (prop) => {
        if (prop === 'filter') {
          setFilterSortState((prev) => {
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
        } else if (prop === 'sort') {
          setElement(filterSortRef.sort);
          showMenu();
          setFilterSortState((prev) => {
            if (prev.sort && screenWidth < 769) {
              hideBodyOverflow();
            } else {
              showBodyOverflow();
            }
            return { sort: !prev.sort, filter: true };
          });
        } else {
          setFilterSortState({ sort: true, filter: true });
        }
      },
      [hideBodyOverflow, screenWidth, setElement, showBodyOverflow, showMenu],
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

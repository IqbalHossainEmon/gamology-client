import { useCallback, useRef, useState } from 'react';
import {
  FilterSortContext,
  FilterSortRefContext,
  SetFilterSortContext
} from '../Contexts/FilterSortContext';
import useBodyOverflowYHidden from '../Hooks/useBodyOverflowYHidden';
import useDropDownHide from '../Hooks/useDropDownHide';

const withFilterSortProvider = (Component) =>
  function ScreenInfoProvider() {
    const [filterSortState, setFilterSortState] = useState({
      filter: true,
      sort: true
    });

    const filterSortRef = useRef();

    const { showMenu, setElement } = useDropDownHide(() =>
      setFilterSortState({ sort: true, filter: true })
    );

    const { bodyOverflowYHidden } = useBodyOverflowYHidden();

    const setFilterSort = useCallback(
      (prop) => {
        if (prop === 'filter') {
          setFilterSortState((prev) => {
            bodyOverflowYHidden(!prev.filter);
            return {
              filter: !prev.filter,
              sort: true
            };
          });
        } else if (prop === 'sort') {
          setElement(filterSortRef.sort);
          showMenu();
          setFilterSortState((prev) => {
            bodyOverflowYHidden(!prev.sort);
            return { sort: !prev.sort, filter: true };
          });
        } else {
          setFilterSortState({ sort: true, filter: true });
        }
      },
      [bodyOverflowYHidden, setElement, showMenu]
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

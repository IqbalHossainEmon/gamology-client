import { useContext } from 'react';
import {
  FilterSortContext,
  FilterSortRefContext,
  SetFilterSortContext
} from '../Contexts/FilterSortContext';

const useFilterSortState = () => {
  const filterSortState = useContext(FilterSortContext);
  const setFilterSort = useContext(SetFilterSortContext);
  const filterSortRef = useContext(FilterSortRefContext);

  return { filterSortState, setFilterSort, filterSortRef };
};

export default useFilterSortState;

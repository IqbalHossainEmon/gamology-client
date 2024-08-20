import { useContext } from 'react';
import {
    FilterSortContext,
    FilterSortRefContext,
    SetFilterSortContext,
} from '../../../../../../../../Contexts/FilterSortContext';

const useFilterSortState = () => {
    const filterSortState = useContext(FilterSortContext),
     setFilterSort = useContext(SetFilterSortContext),
     filterSortRef = useContext(FilterSortRefContext);

    return { filterSortState, setFilterSort, filterSortRef };
};

export default useFilterSortState;

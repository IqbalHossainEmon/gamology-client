import { createContext } from 'react';

export const FilterSortContext = createContext({ filter: false, sort: false });
export const SetFilterSortContext = createContext(() => {});
export const FilterSortRefContext = createContext({});

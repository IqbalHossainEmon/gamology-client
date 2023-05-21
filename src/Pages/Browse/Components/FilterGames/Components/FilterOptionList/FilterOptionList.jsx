import { memo } from 'react';
import FilterOptions from '../FilterOptions/FilterOptions/FilterOptions';
import FilterRangeOption from '../FilterRangeOption/FilterRangeOption/FilterRangeOption';

function FilterOptionList({ options, state, setState, limits }) {
  return (
    <div>
      {options.map((option) => {
        if (option.type === 'slider') {
          return (
            <FilterRangeOption
              key={option.id}
              limit={limits[option.rangeName]}
              setState={setState}
              option={option}
            />
          );
        }
        return (
          <FilterOptions
            key={option.id}
            option={option}
            setState={setState}
            state={state}
          />
        );
      })}
    </div>
  );
}
export default memo(FilterOptionList);

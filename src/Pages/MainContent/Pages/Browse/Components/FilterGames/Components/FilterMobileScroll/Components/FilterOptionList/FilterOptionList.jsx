import { memo } from 'react';
import FilterOptions from '../FilterOptions/FilterOptions/FilterOptions';

function FilterOptionList({ options, state, setState, limits }) {
    return (
        <div>
            {options.map(option => (
                <FilterOptions key={option.id} option={option} setState={setState} state={state} limits={limits} />
            ))}
        </div>
    );
}
export default memo(FilterOptionList);

import FilterOption from '../../../../../../../../../../../../../../Shared/FilterOption/FilterOption';
import FilterRangeOption from '../FilterRangeOption/FilterRangeOption/FilterRangeOption';

function FilterOptionEachPartBody({ type, tags, details, state, setState, limits, show }) {
	switch (type) {
		case 'switch':
			return tags.map((op, i) => (
				<FilterOption
					key={op}
					border={i !== tags.length - 1}
					name={op}
					setState={setState}
					state={state[op]}
					text={op}
					disabled={!show}
				/>
			));

		case 'range':
			return (
				<>
					<FilterRangeOption
						limit={limits[details?.rangeName]}
						option={details}
						setState={setState}
						{...((state[details?.switch?.tag] || !show) && { disabled: true })}
					/>
					{details?.switch && (
						<FilterOption
							name={details.switch.tag}
							setState={setState}
							state={state[details.switch.tag]}
							text={details.switch.tag}
							disabled={!show}
						/>
					)}
				</>
			);

		default:
	}
}
export default FilterOptionEachPartBody;

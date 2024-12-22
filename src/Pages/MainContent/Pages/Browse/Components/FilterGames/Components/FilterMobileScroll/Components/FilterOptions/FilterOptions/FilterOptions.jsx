import FilterOption from '../../../../../../../../../../../Shared/FilterOption/FilterOption';
import Menu from '../../../../../../../../../../../Shared/Menu/Menu';
import MenuTitle from '../../../../../../../../../../../Shared/MenuTitle/MenuTitle';
import FilterRangeOption from '../Components/FilterRangeOption/FilterRangeOption/FilterRangeOption';
import styles from './FilterOptions.module.css';

export default function FilterOptions({ option, state, setState, limits = {} }) {
	const { category, type, tags } = option;

	const body = tags.map((op, i) => {
		switch (type) {
			case 'switch':
				return (
					<FilterOption
						border={i !== tags.length - 1}
						key={op.id}
						name={op.filter}
						setState={setState}
						state={state[op.filter]}
						text={op.text}
					/>
				);
			default:
				return (
					<FilterRangeOption
						key={op.id}
						limit={limits[op.rangeName]}
						option={op}
						setState={setState}
						{...(state.ShowOnlyFreeGames &&
							op.rangeName === 'price' && { disabled: true })}
					/>
				);
		}
	});

	return (
		<div className={styles.filterOptions}>
			{category ? (
				<Menu Title={MenuTitle} defaultOpen titleParams={{ name: category, noHover: true }}>
					{body}
				</Menu>
			) : (
				body
			)}
		</div>
	);
}

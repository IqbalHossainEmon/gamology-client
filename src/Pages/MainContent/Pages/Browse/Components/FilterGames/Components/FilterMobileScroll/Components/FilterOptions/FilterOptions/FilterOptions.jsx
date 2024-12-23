import FilterOption from '../../../../../../../../../../../Shared/FilterOption/FilterOption';
import Menu from '../../../../../../../../../../../Shared/Menu/Menu';
import MenuTitle from '../../../../../../../../../../../Shared/MenuTitle/MenuTitle';
import FilterRangeOption from '../Components/FilterRangeOption/FilterRangeOption/FilterRangeOption';
import styles from './FilterOptions.module.css';

export default function FilterOptions({ option, state, setState, limits = {} }) {
	const { category, type, tags, details } = option;

	let body;
	switch (type) {
		case 'switch':
			body = tags.map((op, i) => (
				<FilterOption
					key={op}
					border={i !== tags.length - 1}
					name={op}
					setState={setState}
					state={state[op]}
					text={op}
				/>
			));
			break;
		default:
			body = (
				<>
					<FilterRangeOption
						limit={limits[details.rangeName]}
						option={details}
						setState={setState}
						{...(state[details.switch?.tag] && { disabled: true })}
					/>
					{details.switch && (
						<FilterOption
							name={details.switch.tag}
							setState={setState}
							state={state[details.switch.tag]}
							text={details.switch.tag}
						/>
					)}
				</>
			);
	}

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

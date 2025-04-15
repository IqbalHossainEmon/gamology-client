import Menu from '../../../../../../../../../../../../../Shared/Menu/Menu/Menu';
import FilterOptionEachPartBody from '../Components/FilterOptionEachPartBody/FilterOptionEachPartBody';

import styles from './FilterOptionEachPart.module.css';

export default function FilterOptionEachPart({ option, state, setState, limits = {} }) {
	const { category, type, tags, details } = option;

	return (
		<div className={styles.filterOptions}>
			{category ? (
				<Menu defaultOpen name={category} noHover>
					{show => (
						<FilterOptionEachPartBody
							type={type}
							tags={tags}
							details={details}
							state={state}
							setState={setState}
							limits={limits}
							show={show}
						/>
					)}
				</Menu>
			) : (
				<FilterOptionEachPartBody
					type={type}
					tags={tags}
					details={details}
					state={state}
					setState={setState}
					limits={limits}
					show
				/>
			)}
		</div>
	);
}

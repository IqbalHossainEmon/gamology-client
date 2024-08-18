import { useRef, useState } from 'react';
import RangeField from '../Components/RangeField/RangeField/RangeField';
import RangeInput from '../Components/RangeInput/RangeInput/RangeInput';
import styles from './FilterRangeOption.module.css';

export default function FilterRangeOption({ option, limit, setState: setValue, disabled }) {
	const [state, setState] = useState({
		knob1: 0,
		knob2: 100,
		transition: false,
	});

	const { knob1, knob2 } = state;
	const { float, rangeName } = option;

	const leftInputRef = useRef(null);
	const rightInputRef = useRef(null);
	const singleStepRef = useRef(0);

	const disableState = typeof limit !== 'object' || limit.higher <= limit.lower || disabled;

	const bigger = parseFloat(
		((knob1 > knob2 ? knob1 : knob2) / singleStepRef.current + limit.lower).toFixed(float)
	);
	const smaller = parseFloat(
		(((knob1 < knob2 ? knob1 : knob2) / singleStepRef.current || 0) + limit.lower).toFixed(
			float
		)
	);

	const stateRef = useRef({ bigger, smaller });
	stateRef.current.bigger = bigger;
	stateRef.current.smaller = smaller;

	const eventRef = useRef(null);

	if (!eventRef.current) {
		eventRef.current = {
			handleSetValue: () => {
				setTimeout(() => {
					setValue(prev => {
						if (prev[rangeName].higher !== stateRef.current.bigger) {
							return {
								...prev,
								[rangeName]: {
									...prev[rangeName],
									higher: stateRef.current.bigger,
								},
							};
						}
						if (prev[rangeName].lower !== stateRef.current.smaller) {
							return {
								...prev,
								[rangeName]: {
									...prev[rangeName],
									lower: stateRef.current.smaller,
								},
							};
						}
						return prev;
					});
				}, 0);
			},
		};
	}
	return (
		<div className={styles.filterRange} {...(disableState && { disabled: true })}>
			<RangeField
				leftInputRef={leftInputRef}
				rightInputRef={rightInputRef}
				disabled={disableState}
				conditionStep={option.stepCondition}
				limit={limit}
				setState={setState}
				state={state}
				singleStepRef={singleStepRef}
				handleSetValue={eventRef.current.handleSetValue}
			/>
			<RangeInput
				disabled={disableState}
				leftInputRef={leftInputRef}
				rightInputRef={rightInputRef}
				limit={limit}
				float={float}
				state={{ bigger, smaller }}
				setState={setState}
				singleStepRef={singleStepRef}
				handleSetValue={eventRef.current.handleSetValue}
			/>
		</div>
	);
}

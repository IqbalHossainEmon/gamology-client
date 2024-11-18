import { useRef, useState } from 'react';
import useObjectUtilities from '../../../../../../../../../../../../../../../Utils/Hooks/useObjectUtilities';
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
	const singleStepRef = useRef(100 / (limit.higher - limit.lower));
	const disableState = typeof limit !== 'object' || limit.higher <= limit.lower || disabled;
	const bigger = parseFloat(
		(Math.max(knob1, knob2) / singleStepRef.current + limit.lower).toFixed(float)
	);

	const smaller = parseFloat(
		((Math.min(knob1, knob2) / singleStepRef.current || 0) + limit.lower).toFixed(float)
	);
	const stateRef = useRef({ bigger, smaller });
	stateRef.current.bigger = bigger;
	stateRef.current.smaller = smaller;

	const eventRef = useRef(null);

	const { cloneObject } = useObjectUtilities();

	if (!eventRef.current) {
		eventRef.current = {
			handleSetValue: (higher, lower) => {
				let actualHigher, actualLower;

				if (typeof higher === 'number')
					actualHigher = parseFloat(
						(higher / singleStepRef.current + limit.lower).toFixed(float)
					);
				else actualHigher = stateRef.current.bigger;

				if (typeof lower === 'number')
					actualLower = parseFloat(
						((lower / singleStepRef.current || 0) + limit.lower).toFixed(float)
					);
				else actualLower = stateRef.current.smaller;

				setValue(prev => {
					const newPrev = cloneObject(prev);

					if (
						newPrev[rangeName].higher !== actualHigher &&
						newPrev[rangeName].lower !== actualLower
					) {
						return {
							...newPrev,
							[rangeName]: {
								higher: actualHigher,
								lower: actualLower,
							},
						};
					}
					if (newPrev[rangeName].higher !== actualHigher) {
						return {
							...newPrev,
							[rangeName]: {
								...newPrev[rangeName],
								higher: actualHigher,
							},
						};
					}
					if (newPrev[rangeName].lower !== actualLower) {
						return {
							...newPrev,
							[rangeName]: {
								...newPrev[rangeName],
								lower: actualLower,
							},
						};
					}
					return newPrev;
				});
			},
		};
	}

	return (
		<div className={styles.filterRange} {...(disableState && { disabled: true })}>
			<RangeField
				conditionStep={option.stepCondition}
				disabled={disableState}
				limit={limit}
				setState={setState}
				singleStepRef={singleStepRef}
				state={state}
				handleSetValue={eventRef.current.handleSetValue}
			/>
			<RangeInput
				disabled={disableState}
				float={float}
				leftInputRef={leftInputRef}
				rightInputRef={rightInputRef}
				limit={limit}
				setState={setState}
				singleStepRef={singleStepRef}
				state={{ bigger, smaller }}
				handleSetValue={eventRef.current.handleSetValue}
			/>
		</div>
	);
}

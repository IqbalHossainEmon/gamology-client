import RangeInputField from '../RangeInputField/RangeInputField';
import styles from './RangeInput.module.css';

export default function RangeInput({
	state,
	leftInputRef,
	rightInputRef,
	disabled,
	limit,
	float,
	setState,
	singleStepRef,
	handleSetValue,
}) {
	const handleEnter = e => {
		if (e.key === 'Enter') {
			const { value, name } = e.target;

			let val = (value - limit.lower) * singleStepRef.current;

			if (val > 100 || val < 0) {
				if (val > 100) {
					val = 100;
				} else {
					val = 0;
				}
			}

			setState(prev => {
				const { knob1, knob2 } = prev;
				switch (name) {
					case 'smaller':
						if (knob1 < knob2) {
							if (knob1 !== val) {
								return { ...prev, knob1: val };
							}
							e.target.value = limit.lower;
							return prev;
						}
						if (knob2 !== val) {
							return { ...prev, knob2: val };
						}
						e.target.value = limit.lower;
						return prev;
					case 'bigger':
						if (knob2 > knob1) {
							if (knob2 !== val) {
								return { ...prev, knob2: val };
							}
							e.target.value = limit.higher;
							return prev;
						}
						if (knob1 !== val) {
							return { ...prev, knob1: val };
						}
						e.target.value = limit.higher;
						return prev;
					default:
						return prev;
				}
			});
			handleSetValue();
		}
	};

	return (
		<div className={styles.rangeInput}>
			<RangeInputField
				disabled={disabled}
				float={float}
				handleEnter={handleEnter}
				inputRef={leftInputRef}
				name="smaller"
				state={state.smaller}
				val={limit.lower.toFixed(float)}
			/>
			<span className={styles.minus} />
			<RangeInputField
				disabled={disabled}
				float={float}
				handleEnter={handleEnter}
				inputRef={rightInputRef}
				name="bigger"
				state={state.bigger}
				val={limit.higher.toFixed(float)}
			/>
		</div>
	);
}

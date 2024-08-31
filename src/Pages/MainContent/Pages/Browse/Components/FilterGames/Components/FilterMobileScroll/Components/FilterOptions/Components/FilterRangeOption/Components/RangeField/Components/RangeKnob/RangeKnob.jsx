import { useRef } from 'react';
import useDragStartStop from '../../../../../../../../../../../../../../../../Hooks/useDragStartStop';
import styles from './RangeKnob.module.css';

function RangeKnob({
	state,
	setState,
	transition,
	name,
	getLeftRightStep,
	disabled,
	handleSetValue,
}) {
	const stateRef = useRef(state);
	stateRef.current = state;

	// Calculate move value
	const handleMove = useRef(e => {
		const { pointerLeftStep, pointerRightStep, leftDiff, rightDiff } = getLeftRightStep(e);

		let value = stateRef.current;

		// If cursors position is inside the slider range;

		// Check and set value depend on step
		if (leftDiff < rightDiff) {
			value = pointerLeftStep;
		} else if (leftDiff > rightDiff) {
			value = pointerRightStep;
		} else if (pointerLeftStep === pointerRightStep) {
			value = pointerLeftStep;
		}

		if (value !== stateRef.current) {
			setState(prev => ({ ...prev, [name]: value }));
		}
	});
	const onStart = useDragStartStop(handleMove.current, handleSetValue, undefined, true);

	return (
		<div
			className={`${transition ? `${styles.knobTransition} ` : ''}${styles.knobContainer}`}
			style={{ translate: `${state}%` }}
		>
			<div
				className={styles.knop}
				data-knob={name}
				onMouseDown={onStart}
				onTouchStart={onStart}
				role='slider'
				aria-label='range knob'
				aria-valuenow={state}
				tabIndex={disabled ? -1 : 0}
			/>
		</div>
	);
}

export default RangeKnob;

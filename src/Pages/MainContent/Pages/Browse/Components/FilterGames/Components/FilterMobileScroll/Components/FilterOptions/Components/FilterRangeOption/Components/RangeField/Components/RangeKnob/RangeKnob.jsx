import { useRef } from 'react';
import useDragStartStop from '../../../../../../../../../../../../../../../../Hooks/useDragStartStop';
import styles from './RangeKnob.module.css';

function RangeKnob({ state, setState, transition, name, getLeftRightStep, disabled, handleSetValue }) {
    const stateRef = useRef(state);
    stateRef.current = state;

    // Calculate move value
    const handleMove = useRef(
        e => {
            const { pointerLeftStep, pointerRightStep, leftDiff, rightDiff } = getLeftRightStep(e);

            let value = stateRef.current;

            // if cursors position is inside the slider range;

            // check and set value depend on step
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
                role="button"
                data-knob={name}
                onTouchStart={onStart}
                onMouseDown={onStart}
                tabIndex={disabled ? -1 : 0}
                className={styles.knop}
            />
        </div>
    );
}

export default RangeKnob;

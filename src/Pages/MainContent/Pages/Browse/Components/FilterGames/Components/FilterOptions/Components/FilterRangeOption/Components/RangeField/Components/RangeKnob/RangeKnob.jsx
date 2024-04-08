import { useCallback, useRef } from 'react';
import useDragStartStop from '../../../../../../../../../../../../../../Hooks/useDragStartStop';
import styles from './RangeKnob.module.css';

function RangeKnob({ state, setState, transition, name, getLeftRightStep, disabled, handleSetValue }) {
    const stateRef = useRef(state);
    stateRef.current = state;

    // Calculate move value
    const handleMove = useCallback(
        e => {
            const { cursorInPercent, pointerLeftStep, pointerRightStep, leftDiff, rightDiff } = getLeftRightStep(e);

            let value = stateRef.current;

            // if cursors position is inside the slider range;
            if (cursorInPercent >= 0 && cursorInPercent <= 100) {
                // check and set value depend on step
                if (leftDiff < rightDiff) {
                    value = pointerLeftStep;
                } else if (leftDiff > rightDiff) {
                    value = pointerRightStep;
                }
                if (value < 0) {
                    value = 0;
                }
                if (value > 100) {
                    value = 100;
                }
            }

            if (value !== stateRef.current) {
                setState(prev => ({ ...prev, [name]: value }));
            }
        },
        [getLeftRightStep, name, setState]
    );

    const onStart = useDragStartStop(handleMove, handleSetValue, undefined, true);

    return (
        <div className={`${transition ? `${styles.knobTransition} ` : ''}${styles.knobContainer}`} style={{ translate: `${state}%` }}>
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

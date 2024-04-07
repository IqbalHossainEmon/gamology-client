import { useCallback, useRef } from 'react';
import useDragStartStop from '../../../../../../../../../../../../../../Hooks/useDragStartStop';
import styles from './RangeKnob.module.css';

function RangeKnob({ state, setState, transition, name, getLeftRightStep, disabled, everyStep }) {
    const stateRef = useRef(state);
    stateRef.current = state;
    const everyStepRef = useRef(everyStep);
    everyStepRef.current = everyStep;

    const handleSetEveryStep = useCallback(value => {
        console.log(value);
        if (value > 50) {
            return 10;
        }
        if (value > 0) {
            return 1;
        }
        return everyStepRef.current;
    }, []);

    // Calculate move value
    const handleMove = useCallback(
        e => {
            const { cursorInPercent, pointerLeftStep, pointerRightStep, leftDiff, rightDiff } = getLeftRightStep(e, everyStepRef.current);

            let value = stateRef.curren;
            // if cursors position is inside the slider range;
            if (cursorInPercent > 0 && cursorInPercent < 100) {
                // check and set value depend on step
                if (leftDiff < rightDiff && stateRef.current !== pointerLeftStep) {
                    value = pointerLeftStep;
                } else if (leftDiff > rightDiff && stateRef.current !== pointerRightStep) {
                    value = pointerRightStep;
                }
            } else if (cursorInPercent <= 0 && stateRef.current !== 0) {
                value = 0;
            } else if (cursorInPercent >= 100 && stateRef.current !== 100) {
                value = 100;
            }

            everyStepRef.current = handleSetEveryStep(value);

            setState(prev => ({ ...prev, [name]: value, everyStep: { ...prev.everyStep, [name]: everyStepRef.current } }));
        },
        [getLeftRightStep, handleSetEveryStep, name, setState]
    );

    const onStart = useDragStartStop(handleMove, undefined, undefined, true);

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

import { useCallback, useRef } from 'react';
import useDragStartStop from '../../../../../../../../../../../../../../Hooks/useDragStartStop';
import styles from './RangeKnob.module.css';

function RangeKnob({ state, setState, transition, name, getLeftRightStep, disabled, everyStep, conditionStep }) {
    const stateRef = useRef(state);
    stateRef.current = state;
    const everyStepRef = useRef(everyStep);
    everyStepRef.current = everyStep;

    const handleSetEveryStep = useCallback(
        value => {
            const st = conditionStep.find(({ ifLess }) => value <= ifLess);

            if (st) {
                return st.step;
            }
            return conditionStep[conditionStep.length - 1].step;
        },
        [conditionStep]
    );

    // Calculate move value
    const handleMove = useCallback(
        e => {
            const { cursorInPercent, pointerLeftStep, pointerRightStep, leftDiff, rightDiff } = getLeftRightStep(e, everyStepRef.current);

            let value = stateRef.current;
            // if cursors position is inside the slider range;
            if (cursorInPercent > 0 && cursorInPercent < 100) {
                // check and set value depend on step
                if (leftDiff < rightDiff) {
                    value = pointerLeftStep;
                } else if (leftDiff > rightDiff) {
                    value = pointerRightStep;
                }
            } else if (cursorInPercent <= 0) {
                value = 0;
            } else if (cursorInPercent >= 100) {
                value = 100;
            }

            if (value !== stateRef.current) {
                if (conditionStep && conditionStep.length > 0) {
                    everyStepRef.current = handleSetEveryStep(value);
                }

                setState(prev => ({ ...prev, [name]: value, everyStep: { ...prev.everyStep, [name]: everyStepRef.current } }));
            }
        },
        [conditionStep, getLeftRightStep, handleSetEveryStep, name, setState]
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

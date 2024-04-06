import { useCallback, useRef } from 'react';
import useDragStartStop from '../../../../../../../../../../../../../../Hooks/useDragStartStop';
import styles from './RangeKnob.module.css';

function RangeKnob({ state, setState, name, getLeftRightStep, disabled }) {
    const stateRef = useRef(state);
    stateRef.current = state;

    // Calculate move value
    const handleMove = useCallback(
        e => {
            const { cursorInPercent, pointerLeftStep, pointerRightStep, leftDiff, rightDiff } = getLeftRightStep(e);

            // if cursors position is inside the slider range;
            if (cursorInPercent > 0 && cursorInPercent < 100) {
                // check and set value depend on step
                if (leftDiff < rightDiff && stateRef.current[name] !== pointerLeftStep) {
                    setState(prev => ({ ...prev, [name]: pointerLeftStep }));
                    return;
                }
                if (leftDiff > rightDiff && stateRef.current[name] !== pointerRightStep) {
                    setState(prev => ({ ...prev, [name]: pointerRightStep }));
                    return;
                }
            }
            if (cursorInPercent <= 0 && stateRef.current[name] !== 0) {
                setState(prev => ({ ...prev, [name]: 0 }));
                return;
            }
            if (cursorInPercent >= 100 && stateRef.current[name] !== 100) {
                setState(prev => ({ ...prev, [name]: 100 }));
            }
        },
        [getLeftRightStep, name, setState]
    );

    const onStart = useDragStartStop(handleMove, undefined, undefined, true);

    return (
        <div
            className={styles.knobContainer}
            style={
                state.transition
                    ? {
                          translate: `${state}%`,
                          transition: 'translate linear 200ms',
                      }
                    : { translate: `${state}%` }
            }
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

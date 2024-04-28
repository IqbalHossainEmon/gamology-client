import { useCallback, useEffect, useRef, useState } from 'react';
import useDragStartStop from '../../../Hooks/useDragStartStop';
import useHandleTimerTransition from '../../../Hooks/useHandleTimerTransition';
import usePointersEveryStep from '../../../Hooks/usePointersEveryStep';
import styles from './FilterSwitch.module.css';

function FilterSwitch({ state, setState, name, event }) {
    const rangePathRef = useRef(null);
    const [circlePosition, setCirclePosition] = useState({
        translate: 0,
        transition: false,
    });

    const stateRef = useRef(circlePosition);
    stateRef.current = circlePosition.translate;

    const handleMove = useRef(event);

    const { getCursorInPercent } = usePointersEveryStep(rangePathRef);
    const handleTimerTransition = useHandleTimerTransition(setCirclePosition, 100);

    useEffect(() => {
        if (state) {
            setCirclePosition({ translate: 100, transition: true });
            handleTimerTransition();
        } else {
            setCirclePosition({ translate: 0, transition: true });
            handleTimerTransition();
        }
    }, [handleTimerTransition, state]);

    handleMove.current = useCallback(
        e => {
            document.removeEventListener('mouseup', event);

            setCirclePosition(prev => ({ ...prev, translate: getCursorInPercent(e) }));
        },
        [event, getCursorInPercent]
    );

    const handleSetValue = useCallback(() => {
        // if switch is below 50
        if (stateRef.current < 50) {
            if (stateRef.current) {
                setState(prev => ({ ...prev, [name]: false }), name);
            } else if (stateRef.current !== 0) {
                setCirclePosition({ translate: 0, transition: true });
                handleTimerTransition();
            }
        } else if (stateRef.current >= 50) {
            if (!stateRef.current) {
                setState(prev => ({ ...prev, [name]: true }), name);
            } else if (stateRef.current !== 100) {
                setCirclePosition({ translate: 100, transition: true });
                handleTimerTransition();
            }
        }
    }, [handleTimerTransition, name, setState]);

    const onStart = useDragStartStop(handleMove, handleSetValue);

    return (
        <div className={styles.toggleButtonContainer}>
            <div ref={rangePathRef} className={styles.toggleButton}>
                <div className={styles.activePathContainer}>
                    <div
                        className={styles.activePath}
                        style={
                            circlePosition.transition
                                ? {
                                      scale: `${circlePosition.translate / 100} 1`,
                                      transition: 'scale linear 100ms',
                                  }
                                : { scale: `${circlePosition.translate / 100} 1` }
                        }
                    />
                </div>
                <div
                    className={styles.roundContainer}
                    style={
                        circlePosition.transition
                            ? {
                                  translate: `${circlePosition.translate}%`,
                                  transition: 'translate linear 100ms',
                              }
                            : { translate: `${circlePosition.translate}%` }
                    }
                >
                    <div
                        tabIndex="-1"
                        role="button"
                        className={styles.round}
                        style={
                            circlePosition.transition
                                ? {
                                      backgroundColor: `rgb(${(circlePosition.translate / 100) * 255}, ${circlePosition.translate}, 0)`,
                                      transition: 'translate linear 100ms',
                                  }
                                : {
                                      backgroundColor: `rgb(${(circlePosition.translate / 100) * 255}, ${circlePosition.translate}, 0)`,
                                  }
                        }
                        onTouchStart={onStart}
                        onMouseDown={onStart}
                    />
                </div>
            </div>
        </div>
    );
}

export default FilterSwitch;

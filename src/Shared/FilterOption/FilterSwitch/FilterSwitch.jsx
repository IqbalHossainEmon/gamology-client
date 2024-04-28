import { useCallback, useEffect, useRef, useState } from 'react';
import useDragStartStop from '../../../Hooks/useDragStartStop';
import useHandleTimerTransition from '../../../Hooks/useHandleTimerTransition';
import useScreenWidth from '../../../Hooks/useScreenWidth';
import styles from './FilterSwitch.module.css';

function FilterSwitch({ state, setState, name, event }) {
    const [circlePosition, setCirclePosition] = useState({
        translate: 0,
        transition: false,
    });

    const stateRef = useRef(circlePosition);
    stateRef.current = circlePosition.translate;

    const handleMove = useRef(null);

    const screenWidth = useScreenWidth();

    const rangePathRef = useRef(null);
    const roundRef = useRef(null);
    const positionsRef = useRef(0);

    const handleTimerTransition = useHandleTimerTransition(setCirclePosition, 100);

    useEffect(() => {
        if (state) {
            setCirclePosition({ translate: rangePathRef.width, transition: true });
            handleTimerTransition();
        } else {
            setCirclePosition({ translate: 0, transition: true });
            handleTimerTransition();
        }
    }, [handleTimerTransition, state]);

    useEffect(() => {
        rangePathRef.width = rangePathRef.current.offsetWidth;
    }, [rangePathRef, screenWidth]);

    handleMove.current = useCallback(
        e => {
            document.removeEventListener('mouseup', event.current);

            const move = e.clientX - positionsRef.current;

            const newPosition = positionsRef.start + move;

            if (move > 0) {
                if (newPosition > rangePathRef.width) {
                    setCirclePosition(prev => ({ ...prev, translate: rangePathRef.width }));
                } else {
                    setCirclePosition(prev => ({ ...prev, translate: newPosition }));
                }
            } else if (newPosition < 0) {
                setCirclePosition(prev => ({ ...prev, translate: 0 }));
            } else {
                setCirclePosition(prev => ({ ...prev, translate: newPosition }));
            }
        },
        [event]
    );

    const handleStart = e => {
        positionsRef.current = e.touches ? e.touches[0].clientX : e.clientX;
        positionsRef.start = stateRef.current;
    };

    const handleSetValue = useCallback(() => {
        // if switch is below 50
        if (stateRef.current < rangePathRef.width / 2) {
            if (stateRef.current !== 0) {
                setCirclePosition({ translate: 0, transition: true });
                handleTimerTransition();
            }
            setState(prev => ({ ...prev, [name]: false }), name);
        } else if (stateRef.current >= rangePathRef.width / 2) {
            if (stateRef.current !== rangePathRef.width) {
                setCirclePosition({ translate: rangePathRef.width, transition: true });
                handleTimerTransition();
            }
            setState(prev => ({ ...prev, [name]: true }), name);
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
                                      scale: `${circlePosition.translate / rangePathRef.width} 1`,
                                      transition: 'scale linear 100ms',
                                  }
                                : { scale: `${circlePosition.translate / rangePathRef.width} 1` }
                        }
                    />
                </div>
                <div
                    className={styles.roundContainer}
                    ref={roundRef}
                    style={
                        circlePosition.transition
                            ? {
                                  translate: `${circlePosition.translate}px`,
                                  transition: 'translate linear 100ms',
                              }
                            : { translate: `${circlePosition.translate}px` }
                    }
                >
                    <div
                        tabIndex="-1"
                        role="button"
                        className={styles.round}
                        {...(circlePosition.transition && {
                            style: {
                                transition: 'translate linear 100ms',
                            },
                        })}
                        onTouchStart={e => {
                            onStart(e);
                            handleStart(e);
                        }}
                        onMouseDown={e => {
                            onStart(e);
                            handleStart(e);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default FilterSwitch;

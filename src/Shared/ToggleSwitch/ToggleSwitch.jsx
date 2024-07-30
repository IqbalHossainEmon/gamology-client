import { useCallback, useEffect, useRef, useState } from 'react';
import useDragStartStop from '../../Hooks/useDragStartStop';
import useHandleTimerTransition from '../../Hooks/useHandleTimerTransition';
import styles from './ToggleSwitch.module.css';

const rangePathWidth = 13;

function ToggleSwitch({ state, setState, name, event }) {
    const [circlePosition, setCirclePosition] = useState({
        translate: state ? rangePathWidth : 0,
        transition: false,
    });

    const prevState = useRef(state);

    const stateRef = useRef(circlePosition);
    stateRef.current = circlePosition.translate;

    const mainStateRef = useRef(state);
    mainStateRef.current = state;

    const eventRefs = useRef({
        handleMove: () => {},
        handleSetValue: () => {},
    });

    const roundRef = useRef(null);
    const positionsRef = useRef(0);

    const handleTimerTransition = useHandleTimerTransition(setCirclePosition, 1000);

    useEffect(() => {
        if (prevState.current !== state) {
            if (state) {
                setCirclePosition({ translate: rangePathWidth, transition: true });
                handleTimerTransition();
            } else {
                setCirclePosition({ translate: 0, transition: true });
                handleTimerTransition();
            }
            prevState.current = state;
        }
    }, [handleTimerTransition, state]);

    eventRefs.current.handleMove = useCallback(
        e => {
            document.removeEventListener('mouseup', event);

            const move = (e.touches ? e.touches[0].clientX : e.clientX) - positionsRef.current;

            const newPosition = positionsRef.start + move;

            if (move > 0) {
                if (newPosition > rangePathWidth) {
                    setCirclePosition(prev => ({ ...prev, translate: rangePathWidth }));
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

    eventRefs.current.handleSetValue = useCallback(() => {
        // if switch is below 50
        if (stateRef.current < rangePathWidth / 2) {
            if (stateRef.current !== 0) {
                setCirclePosition({ translate: 0, transition: true });
                handleTimerTransition();
            }
            if (mainStateRef.current) {
                setState(prev => ({ ...prev, [name]: false }), name);
            }
        } else if (stateRef.current >= rangePathWidth / 2) {
            if (stateRef.current !== rangePathWidth) {
                setCirclePosition({ translate: rangePathWidth, transition: true });
                handleTimerTransition();
            }
            if (!mainStateRef.current) {
                setState(prev => ({ ...prev, [name]: true }), name);
            }
        }
    }, [handleTimerTransition, name, setState]);

    const onStart = useDragStartStop(eventRefs.current.handleMove, eventRefs.current.handleSetValue);

    return (
        <div className={styles.toggleButtonContainer}>
            <div className={styles.toggleButton}>
                <div className={styles.activePathContainer}>
                    <div
                        className={`${styles.activePath}${circlePosition.transition ? ` ${styles.pathTransition}` : ''}`}
                        style={{ scale: `${circlePosition.translate / rangePathWidth || 0} 1` }}
                    />
                </div>
                <div
                    className={`${styles.roundContainer}${circlePosition.transition ? ` ${styles.roundTransition}` : ''}`}
                    ref={roundRef}
                    {...(circlePosition.translate && {
                        style: {
                            translate: `${circlePosition.translate}px`,
                        },
                    })}
                >
                    <div
                        tabIndex="-1"
                        role="button"
                        className={`${styles.round}${circlePosition.translate > rangePathWidth / 2 ? ` ${styles.active}` : ''}`}
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

export default ToggleSwitch;

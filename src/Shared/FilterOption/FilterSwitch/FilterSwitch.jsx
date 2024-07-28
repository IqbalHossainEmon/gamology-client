import { useCallback, useEffect, useRef, useState } from 'react';
import useDragStartStop from '../../../Hooks/useDragStartStop';
import useHandleTimerTransition from '../../../Hooks/useHandleTimerTransition';
import useScreenWidth from '../../../Hooks/useScreenWidth';
import styles from './FilterSwitch.module.css';

function FilterSwitch({ state, setState, name, event }) {
    const [circlePosition, setCirclePosition] = useState({
        translate: state ? 100 : 0,
        transition: false,
    });

    const prevState = useRef(state);

    const stateRef = useRef(circlePosition);
    stateRef.current = circlePosition.translate;

    const mainStateRef = useRef(state);
    mainStateRef.current = state;

    const eventRefs = useRef({
        handleMove: { current: () => {} },
        handleSetValue: () => {},
    });

    const screenWidth = useScreenWidth();

    const rangePathRef = useRef(null);
    const roundRef = useRef(null);
    const positionsRef = useRef(0);

    const handleTimerTransition = useHandleTimerTransition(setCirclePosition, 100);

    useEffect(() => {
        if (prevState.current !== state) {
            if (state) {
                setCirclePosition({ translate: rangePathRef.width, transition: true });
                handleTimerTransition();
            } else {
                setCirclePosition({ translate: 0, transition: true });
                handleTimerTransition();
            }
        }
        prevState.current = state;
    }, [handleTimerTransition, state]);

    useEffect(() => {
        rangePathRef.width = rangePathRef.current.offsetWidth;
    }, [rangePathRef, screenWidth]);

    eventRefs.current.handleMove.current = useCallback(
        e => {
            document.removeEventListener('mouseup', event.current);

            const move = (e.touches ? e.touches[0].clientX : e.clientX) - positionsRef.current;

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

    eventRefs.current.handleSetValue = useCallback(() => {
        // if switch is below 50
        if (stateRef.current < rangePathRef.width / 2) {
            if (stateRef.current !== 0) {
                setCirclePosition({ translate: 0, transition: true });
                handleTimerTransition();
            }
            if (mainStateRef.current) {
                setState(prev => ({ ...prev, [name]: false }), name);
            }
        } else if (stateRef.current >= rangePathRef.width / 2) {
            if (stateRef.current !== rangePathRef.width) {
                setCirclePosition({ translate: rangePathRef.width, transition: true });
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
            <div ref={rangePathRef} className={styles.toggleButton}>
                <div className={styles.activePathContainer}>
                    <div
                        className={`${styles.activePath}${circlePosition.transition ? ` ${styles.pathTransition}` : ''}`}
                        style={{ scale: `${circlePosition.translate / rangePathRef.width} 1` }}
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
                        className={`${styles.round}${circlePosition.translate < rangePathRef.width / 2 ? '' : ` ${styles.active}`}`}
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

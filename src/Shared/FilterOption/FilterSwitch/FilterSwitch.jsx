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

  const getLeftRightPointerStep = usePointersEveryStep(rangePathRef, 0, false);
  const handleTimerTransition = useHandleTimerTransition(
    setCirclePosition,
    100,
  );

  useEffect(() => {
    if (state) {
      setCirclePosition({ translate: 100, transition: true });
      handleTimerTransition();
    } else {
      setCirclePosition({ translate: 0, transition: true });
      handleTimerTransition();
    }
  }, [handleTimerTransition, state]);

  const handleMove = useCallback(
    (e) => {
      document.removeEventListener('mouseup', event);

      const { cursorInPercent } = getLeftRightPointerStep(e);
      // if cursors position is inside the slider range;

      if (cursorInPercent > 0 && cursorInPercent < 100) {
        // check and set value depend on step
        setCirclePosition((prev) => ({ ...prev, translate: cursorInPercent }));
      } else if (cursorInPercent <= 0 && stateRef.current !== 0) {
        setCirclePosition((prev) => ({ ...prev, translate: 0 }));
      } else if (cursorInPercent >= 100 && stateRef.current !== 100) {
        setCirclePosition((prev) => ({ ...prev, translate: 100 }));
      }
    },
    [event, getLeftRightPointerStep],
  );

  const handleSetValue = useCallback(() => {
    // if switch is below 50
    if (stateRef.current < 50) {
      if (state) {
        setState((prev) => ({ ...prev, [name]: false }));
      } else if (stateRef.current !== 0) {
        setCirclePosition({ translate: 0, transition: true });
        handleTimerTransition();
      }
    } else if (stateRef.current >= 50) {
      if (!state) {
        setState((prev) => ({ ...prev, [name]: true }));
      } else if (stateRef.current !== 100) {
        setCirclePosition({ translate: 100, transition: true });
        handleTimerTransition();
      }
    }
  }, [handleTimerTransition, name, setState, state]);

  const onStart = useDragStartStop(handleMove, handleSetValue);

  return (
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
          tabIndex="0"
          role="button"
          className={styles.round}
          style={
            circlePosition.transition
              ? {
                  backgroundColor: `rgb(${
                    (circlePosition.translate / 100) * 202
                  }, ${(circlePosition.translate / 100) * 150}, 0)`,
                  transition: 'translate linear 100ms',
                }
              : {
                  backgroundColor: `rgb(${
                    (circlePosition.translate / 100) * 202
                  }, ${(circlePosition.translate / 100) * 150}, 0)`,
                }
          }
          onTouchStart={onStart}
          onMouseDown={onStart}
        />
      </div>
    </div>
  );
}

export default FilterSwitch;

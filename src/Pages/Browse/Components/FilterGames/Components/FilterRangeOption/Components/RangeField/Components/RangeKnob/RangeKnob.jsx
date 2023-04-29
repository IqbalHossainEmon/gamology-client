import { useCallback, useRef } from 'react';
import useDragStartStop from '../../../../../../../../../../Hooks/useDragStartStop';
import styles from './RangeKnob.module.css';

function RangeKnob({ state, setState, pathEleRef, name, everyStep = 0, handleSetValue }) {
  const stateRef = useRef(state);
  stateRef.current = state;

  const handleMove = useCallback(
    (e) => {
      const cursorInEle = e?.touches
        ? e.touches[0].pageX - pathEleRef.offsetLeft
        : e.pageX - pathEleRef.offsetLeft;

      const cursorInPercent = (cursorInEle / pathEleRef.width) * 100;

      const pointerLeftStep = Math.round(cursorInPercent / everyStep.current) * everyStep.current;

      const pointerRightStep = pointerLeftStep + everyStep.current;

      if (cursorInEle >= 0 && cursorInEle <= pathEleRef.width) {
        if (
          cursorInPercent - pointerLeftStep < pointerRightStep - cursorInPercent &&
          stateRef.current[name] !== pointerLeftStep
        ) {
          setState((prev) => ({ ...prev, [name]: pointerLeftStep }));
          return;
        }
        if (
          cursorInPercent - pointerLeftStep > pointerRightStep - cursorInPercent &&
          stateRef.current[name] !== pointerRightStep
        ) {
          setState((prev) => ({ ...prev, [name]: pointerRightStep }));
        }
        return;
      }
      if (cursorInEle < 0 && stateRef.current[name] !== 0) {
        setState((prev) => ({ ...prev, [name]: 0 }));
      }
      if (cursorInEle > pathEleRef.width && stateRef.current[name] !== 100) {
        setState((prev) => ({ ...prev, [name]: 100 }));
      }
    },
    [everyStep, name, pathEleRef, setState],
  );

  const onStart = useDragStartStop(handleMove, handleSetValue);

  return (
    <div
      className={styles.knobContainer}
      style={
        state.transition
          ? { translate: `${state[name]}%`, transition: 'translate linear 200ms' }
          : { translate: `${state[name]}%` }
      }
    >
      <div
        role="button"
        onTouchStart={onStart}
        onMouseDown={onStart}
        tabIndex={0}
        className={styles.knop}
      />
    </div>
  );
}

export default RangeKnob;

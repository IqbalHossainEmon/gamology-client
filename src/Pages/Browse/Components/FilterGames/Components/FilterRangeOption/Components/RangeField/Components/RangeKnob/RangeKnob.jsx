import { useCallback, useRef } from 'react';
import useDragStartStop from '../../../../../../../../../../Hooks/useDragStartStop';
import styles from './RangeKnob.module.css';

function RangeKnob({ state, setState, pathEleRef, name, everyStep = 0 }) {
  const stateRef = useRef(state);
  stateRef.current = state;

  /*   const everyStep = useRef();

  useEffect(() => {
    if (Array.isArray(limit)) {
      everyStep.current = 1000 / Math.floor((limit[1] - limit[0]) / steps);
    }
  }, [ steps]); */

  const handleMove = useCallback(
    (e) => {
      e.preventDefault();

      const cursorInEle = e.pageX - pathEleRef.offsetLeft;

      const pointerLeftStep =
        Math.round(((cursorInEle / pathEleRef.width) * 1000) / everyStep.current) *
        everyStep.current;

      const pointerRightStep = pointerLeftStep + everyStep.current;

      if (cursorInEle >= 0 && cursorInEle <= pathEleRef.width) {
        if (
          (cursorInEle / pathEleRef.width) * 1000 - pointerLeftStep <
            pointerRightStep - (cursorInEle / pathEleRef.width) * 1000 &&
          stateRef.current[name] !== pointerLeftStep
        ) {
          setState((prev) => ({ ...prev, [name]: pointerLeftStep }));
          return;
        }
        if (
          (cursorInEle / pathEleRef.width) * 1000 - pointerLeftStep >
            pointerRightStep - (cursorInEle / pathEleRef.width) * 1000 &&
          stateRef.current[name] !== pointerRightStep
        ) {
          setState((prev) => ({ ...prev, [name]: pointerRightStep }));
        }
        return;
      }
      if (cursorInEle < 0 && stateRef.current[name] !== 0) {
        setState((prev) => ({ ...prev, [name]: 0 }));
      }
      if (cursorInEle > pathEleRef.width && stateRef.current[name] !== 1000) {
        setState((prev) => ({ ...prev, [name]: 1000 }));
      }
    },
    [everyStep, name, pathEleRef, setState],
  );

  const onStart = useDragStartStop(handleMove);

  return (
    <div className={styles.knobContainer} style={{ translate: `${state[name]}%` }}>
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

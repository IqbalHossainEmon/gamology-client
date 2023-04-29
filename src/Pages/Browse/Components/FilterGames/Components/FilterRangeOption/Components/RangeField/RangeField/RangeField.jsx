import { useEffect, useRef } from 'react';
import useScreenWidth from '../../../../../../../../../Hooks/useScreenWidth';
import RangeKnob from '../Components/RangeKnob/RangeKnob';
import styles from './RangeField.module.css';

export default function RangeField({ state, setState, everyStep = 0, handleSetValue }) {
  const rangePathRef = useRef();
  const activePathRef = useRef();
  const stateRef = useRef(state);
  stateRef.current = state;

  const screenWidth = useScreenWidth();

  useEffect(() => {
    rangePathRef.width = rangePathRef.current?.offsetWidth;
    rangePathRef.offsetLeft = rangePathRef.current?.offsetLeft;
  }, [rangePathRef, screenWidth]);

  const handlePathClick = (e) => {
    if (e.target === rangePathRef.current || e.target === activePathRef.current) {
      const cursorInEle = e?.touches
        ? e.touches[0].pageX - rangePathRef.offsetLeft
        : e.pageX - rangePathRef.offsetLeft;

      const cursorInPercent = (cursorInEle / rangePathRef.width) * 100;

      const pointerLeftStep = Math.round(cursorInPercent / everyStep.current) * everyStep.current;

      const pointerRightStep = pointerLeftStep + everyStep.current;

      if (cursorInPercent - pointerLeftStep < pointerRightStep - cursorInPercent) {
        setState((prev) => {
          if (Math.abs(pointerLeftStep - prev.knob1) <= Math.abs(pointerLeftStep - prev.knob2)) {
            return { ...prev, knob1: pointerLeftStep };
          }
          return { ...prev, knob2: pointerLeftStep };
        });
      } else if (cursorInPercent - pointerLeftStep > pointerRightStep - cursorInPercent) {
        setState((prev) => {
          if (Math.abs(pointerRightStep - prev.knob1) <= Math.abs(pointerRightStep - prev.knob2)) {
            return { ...prev, knob1: pointerRightStep };
          }
          return { ...prev, knob2: pointerRightStep };
        });
      }
    }
    handleSetValue();
  };

  const { knob1, knob2 } = state;

  return (
    <div className={styles.rangeFieldContainer}>
      <div
        tabIndex="0"
        role="button"
        ref={rangePathRef}
        onClick={handlePathClick}
        className={styles.rangeField}
      >
        <div
          className={styles.activePath}
          ref={activePathRef}
          style={
            state.transition
              ? {
                  translate: `${knob1 < knob2 ? knob1 : knob2}%`,
                  scale: `${(knob1 > knob2 ? knob1 - knob2 : knob2 - knob1) / 100} 1`,
                  transition: 'translate linear 200ms, scale linear 200ms',
                }
              : {
                  translate: `${knob1 < knob2 ? knob1 : knob2}%`,
                  scale: `${(knob1 > knob2 ? knob1 - knob2 : knob2 - knob1) / 100} 1.25`,
                }
          }
        />

        {['knob1', 'knob2'].map((rangeKnob) => (
          <RangeKnob
            key={rangeKnob}
            everyStep={everyStep}
            pathEleRef={rangePathRef}
            setState={setState}
            state={state}
            name={rangeKnob}
            handleSetValue={handleSetValue}
          />
        ))}
      </div>
    </div>
  );
}

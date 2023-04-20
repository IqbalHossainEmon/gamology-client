import { useEffect, useRef } from 'react';
import RangeKnob from '../Components/RangeKnob/RangeKnob';
import styles from './RangeField.module.css';

export default function RangeField({ state, setState, everyStep = 0 }) {
  const rangePathRef = useRef();

  useEffect(() => {
    rangePathRef.width = rangePathRef.current?.offsetWidth;
    rangePathRef.offsetLeft = rangePathRef.current?.offsetLeft;
  }, [rangePathRef]);

  const { knob1, knob2 } = state;

  return (
    <div className={styles.rangeFieldContainer}>
      <div ref={rangePathRef} className={styles.rangeField}>
        <div
          className={styles.activePath}
          style={{
            translate: `${(knob1 < knob2 ? knob1 : knob2) / 10}%`,
            scale: `${(knob1 > knob2 ? knob1 - knob2 : knob2 - knob1) / 1000} 1`,
          }}
        />

        {['knob1', 'knob2'].map((rangeKnob) => (
          <RangeKnob
            key={rangeKnob}
            everyStep={everyStep}
            pathEleRef={rangePathRef}
            setState={setState}
            state={state}
            name={rangeKnob}
          />
        ))}
      </div>
    </div>
  );
}

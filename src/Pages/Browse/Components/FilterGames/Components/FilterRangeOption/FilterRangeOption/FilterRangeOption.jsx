import { useEffect, useRef, useState } from 'react';
import RotateArrow from '../../../../../../../Shared/RotateArrow/RotateArrow';
import RangeField from '../Components/RangeField/RangeField/RangeField';
import RangeInput from '../Components/RangeInput/RangeInput/RangeInput';
import styles from './FilterRangeOption.module.css';

export default function FilterRangeOption({ option, limit }) {
  const [knobState, setKnobState] = useState({
    knob1: 0,
    knob2: 1000,
    disabled: false,
    show: true,
    height: NaN,
  });

  const optionRef = useRef();

  const { title } = option;

  const everyStep = useRef(0);

  useEffect(() => {
    if (typeof limit !== 'object' || limit.higher <= limit.lower) {
      setKnobState((prev) => ({ ...prev, disabled: true }));
    }
    if (typeof limit === 'object') {
      const step = 1000 / Math.floor((limit.higher - limit.lower) / option.steps);

      if (step === Infinity) {
        everyStep.current = 0;
      } else {
        everyStep.current = step;
      }
    }
  }, [limit, option]);

  useEffect(() => {
    setKnobState((prev) => ({ ...prev, height: optionRef.current.offsetHeight }));
  }, [optionRef]);

  return (
    <div className={styles.filterRange} {...(knobState.disabled && { disabled: 'disabled' })}>
      <div
        tabIndex={0}
        role="button"
        onClick={() => setKnobState((prev) => ({ ...prev, show: !prev.show }))}
        className={`${styles.rangeTitle} hover-shadow`}
      >
        <h3>{title}</h3>
        <div className={styles.downArrow}>
          <RotateArrow state={knobState.show} />
        </div>
      </div>
      <div
        className={styles.sliderInputs}
        ref={optionRef}
        {...(title && {
          style: knobState.show
            ? {
                height: `${knobState.height}px`,
              }
            : { height: '0px' },
        })}
      >
        <RangeField setState={setKnobState} everyStep={everyStep} state={knobState} />
        <RangeInput
          setValue={setKnobState}
          everyStep={everyStep}
          value={knobState}
          float={option.float}
          limit={limit}
        />
      </div>
    </div>
  );
}

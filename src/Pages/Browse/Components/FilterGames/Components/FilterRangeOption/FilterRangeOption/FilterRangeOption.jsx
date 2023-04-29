import { useCallback, useEffect, useRef, useState } from 'react';
import RotateArrow from '../../../../../../../Shared/RotateArrow/RotateArrow';
import RangeField from '../Components/RangeField/RangeField/RangeField';
import RangeInput from '../Components/RangeInput/RangeInput/RangeInput';
import styles from './FilterRangeOption.module.css';

export default function FilterRangeOption({ option, limit, setState }) {
  const [knobState, setKnobState] = useState({
    knob1: 0,
    knob2: 100,
    disabled: false,
    show: true,
    height: NaN,
    transition: false,
  });

  const optionRef = useRef();
  const everyStep = useRef(0);
  const stateRef = useRef(knobState);
  stateRef.current = knobState;

  const { title } = option;

  useEffect(() => {
    if (typeof limit !== 'object' || limit.higher <= limit.lower) {
      setKnobState((prev) => ({ ...prev, disabled: true }));
    }
    if (typeof limit === 'object') {
      const step = 100 / Math.ceil((limit.higher - limit.lower) / option.steps);

      if (step === Infinity) {
        everyStep.current = 0;
      } else {
        everyStep.current = step;
      }
      everyStep.stepForInput = option.steps / everyStep.current;
      everyStep.lowerForInput = Math.floor(limit.lower / option.steps) * option.steps;
    }
  }, [limit, option]);

  const handleSetValue = useCallback(() => {
    setTimeout(() => {
      const { knob1, knob2 } = stateRef.current;
      let higher;
      let lower;
      if (knob1 <= knob2) {
        higher = everyStep.stepForInput * knob2 + everyStep.lowerForInput;
        lower = everyStep.stepForInput * knob1 + everyStep.lowerForInput;
      } else {
        higher = everyStep.stepForInput * knob1 + everyStep.lowerForInput;
        lower = everyStep.stepForInput * knob2 + everyStep.lowerForInput;
      }
      if (lower < limit.lower) {
        lower = limit.lower;
      }
      if (higher > limit.higher) {
        higher = limit.higher;
      }

      setState((prev) => ({
        ...prev,
        [option.rangeName]: { lower, higher },
      }));
    }, 0);
  }, [limit, option, setState]);

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
        <RangeField
          setState={setKnobState}
          handleSetValue={handleSetValue}
          everyStep={everyStep}
          state={knobState}
        />
        <RangeInput
          setValue={setKnobState}
          handleSetValue={handleSetValue}
          everyStep={everyStep.stepForInput}
          lowerLim={everyStep.lowerForInput}
          value={knobState}
          step={option.steps}
          float={option.float}
          limit={limit}
        />
      </div>
    </div>
  );
}

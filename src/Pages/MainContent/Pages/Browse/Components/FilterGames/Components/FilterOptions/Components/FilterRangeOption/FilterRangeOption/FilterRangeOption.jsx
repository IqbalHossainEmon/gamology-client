import { useCallback, useEffect, useRef, useState } from 'react';
import RangeField from '../Components/RangeField/RangeField/RangeField';
import RangeInput from '../Components/RangeInput/RangeInput/RangeInput';
import styles from './FilterRangeOption.module.css';

export default function FilterRangeOption({
  option,
  limit,
  setState,
  disabled,
}) {
  const [knobState, setKnobState] = useState({
    knob1: 0,
    knob2: 100,
    disabled: false,
    show: true,
    height: NaN,
    transition: false,
  });

  const everyStep = useRef(0);
  const stateRef = useRef(knobState);
  stateRef.current = knobState;
  const inputRefLeft = useRef(null);
  const inputRefRight = useRef(null);

  useEffect(() => {
    if (typeof limit !== 'object' || limit.higher <= limit.lower || disabled) {
      setKnobState((prev) => ({ ...prev, disabled: true }));
    } else {
      setKnobState((prev) => {
        const prevState = { ...prev };
        delete prevState.disabled;
        return prevState;
      });
    }
  }, [disabled, limit]);

  useEffect(() => {
    if (typeof limit === 'object') {
      const step = 100 / Math.ceil((limit.higher - limit.lower) / option.steps);

      if (step === Infinity) {
        everyStep.current = 0;
      } else {
        everyStep.current = step;
      }
      everyStep.stepForInput = option.steps / everyStep.current;
      everyStep.lowerForInput =
        Math.floor(limit.lower / option.steps) * option.steps;
    }
  }, [limit, option]);

  // set value after re-render and value change
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

  return (
    <div
      className={styles.filterRange}
      {...(knobState.disabled && { disabled: 'disabled' })}
    >
      <RangeField
        inputRefLeft={inputRefLeft}
        inputRefRight={inputRefRight}
        className={styles.rangeField}
        setState={setKnobState}
        handleSetValue={handleSetValue}
        everyStep={everyStep}
        state={knobState}
      />
      <RangeInput
        inputRefLeft={inputRefLeft}
        inputRefRight={inputRefRight}
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
  );
}

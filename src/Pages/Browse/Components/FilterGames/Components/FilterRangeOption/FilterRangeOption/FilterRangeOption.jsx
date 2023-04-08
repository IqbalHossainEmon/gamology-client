import { useEffect, useRef, useState } from 'react';
import RotateArrow from '../../../../../../../Shared/RotateArrow/RotateArrow';
import RangeField from '../Components/RangeField/RangeField/RangeField';
import RangeInput from '../Components/RangeInput/RangeInput/RangeInput';
import styles from './FilterRangeOption.module.css';

export default function FilterRangeOption({ option, limit }) {
  const [knobState, setKnobState] = useState({ knob1: 0, knob2: 1000 });
  const [show, setShow] = useState(true);

  const optionRef = useRef(0);

  const { title } = option;

  useEffect(() => {
    optionRef.height = optionRef.current?.offsetHeight;
  }, [optionRef]);

  return (
    <div className={styles.filterRange}>
      <div
        tabIndex={0}
        role="button"
        onClick={() => setShow((prev) => !prev)}
        className={`${styles.rangeTitle} hover-shadow`}
      >
        <h3>{title}</h3>
        <div className={styles.downArrow}>
          <RotateArrow state={show} />
        </div>
      </div>
      <div
        className={styles.sliderInputs}
        ref={optionRef}
        {...(title && {
          style: show
            ? {
                height: `${optionRef.height}px`
              }
            : { height: '0px' }
        })}
      >
        <RangeField setState={setKnobState} steps={option.steps} state={knobState} limit={limit} />
        <RangeInput setValue={setKnobState} value={knobState} limit={limit} />
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import styles from './RangeInputField.module.css';

export default function RangeInputField({ state, limit, knob, handleSetValue, everyStep, float }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const { knob1, knob2 } = state;

    const { higher, lower } = limit;

    console.log(everyStep);

    let val;

    if (knob === 'knob2') {
      if (knob1 === 1000 || knob2 === 1000) {
        val = higher;
      } else if (knob1 <= knob2) {
        val = (knob2 / 1000) * higher;
      } else if (knob1 > knob2) {
        val = (knob1 / 1000) * higher;
      }
    } else if (knob === 'knob1') {
      if (knob1 === 0 || knob2 === 0) {
        val = lower;
      } else if (knob2 >= knob1) {
        val = (knob1 / 1000) * higher;
      } else if (knob2 < knob1) {
        val = (knob2 / 1000) * higher;
      }
    }
    setValue(float ? val.toFixed(2) : val);
  }, [everyStep, float, knob, limit, state]);

  const handleClick = (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      handleSetValue(value, knob);
    }
  };
  return (
    <input
      className={styles.input}
      value={value}
      type="text"
      onChange={(e) => {
        if (e.target.value === '' || /^\d{1,}(\.\d{0,2})?$/.test(e.target.value)) {
          setValue(e.target.value);
        }
      }}
      onKeyDown={handleClick}
    />
  );
}

import { useState } from 'react';
import styles from './RangeInputField.module.css';

export default function RangeInputField({ state, setState, limit, knob }) {
  const [value, setValue] = useState('0');

  /*  useEffect(() => {
    const { knob1, knob2, width } = state;

    if (knob === 'knob2') {
      if (knob1 < knob2 && knob2 !== 0) {
        setValue(((knob2 / width) * limit).toFixed(2));
      } else if (knob1 > knob2 && knob1 !== 0) {
        setValue(((knob1 / width) * limit).toFixed(2));
      } else if (knob1 === knob2) {
        setValue((((knob1 + knob2) / 2 / width) * limit).toFixed(2));
      } else {
        setValue('0.00');
      }
    } else if (knob === 'knob1') {
      if (knob1 > knob2 && knob2 !== 0) {
        setValue(((knob2 / width) * limit).toFixed(2));
      } else if (knob1 < knob2 && knob1 !== 0) {
        setValue(((knob1 / width) * limit).toFixed(2));
      } else if (knob1 === knob2) {
        setValue((((knob1 + knob2) / 2 / width) * limit).toFixed(2));
      } else {
        setValue('0.00');
      }
    }
  }, [knob, limit, state]); */

  const handleClick = (e) => {
    if (e.code === 'Enter') {
      const val = parseFloat(value);
      const { knob1, knob2, width } = state;
      if (val >= 0 && val <= limit) {
        if (knob === 'knob2') {
          if (knob2 > knob1) {
            setState((prev) => ({ ...prev, knob2: (val * width) / limit }));
          } else {
            setState((prev) => ({ ...prev, knob1: (val * width) / limit }));
          }
        } else if (knob === 'knob1') {
          if (knob1 < knob2) {
            setState((prev) => ({ ...prev, knob1: (val * width) / limit }));
          } else {
            setState((prev) => ({ ...prev, knob2: (val * width) / limit }));
          }
        }
        console.log(knob);
      } else if (val < 0) {
        setState((prev) => ({ ...prev, [knob]: 0 }));
      } else {
        setState((prev) => ({ ...prev, [knob]: state.width }));
      }
    }
  };

  return (
    <input
      className={styles.input}
      value={value}
      type="text"
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleClick}
    />
  );
}
